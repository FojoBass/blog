import React, {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { GenderInput, ImageInputField, LocationInput } from '../components';
import { useBlogSelector } from '../../app/store';
import { toast } from 'react-toastify';
import { FormDataInt, UpdateDataInt } from '../../types';
import { useGlobalContext } from '../../context';
import { BlogServices } from '../../services/firebase/blogServices';
import { getDownloadURL } from 'firebase/storage';
import { regex } from '../../data';
import { FormRefsInt } from '../components/InfoForm';
import { auth } from '../../services/firebase/config';

const ProfileSettings = () => {
  const { userInfo } = useBlogSelector((state) => state.user);

  const [fullName, setFullName] = useState(userInfo?.fullName ?? ''),
    [email, setEmail] = useState(userInfo?.email ?? ''),
    [dispEmail, setDispEmail] = useState(userInfo?.dispEmail ?? true),
    [userName, setUsername] = useState(userInfo?.userName ?? ''),
    [socials, setSocials] = useState(
      userInfo?.socials ?? {
        git: '',
        X: '',
        ins: '',
        be: '',
        fb: '',
        url: '',
      }
    ),
    [bio, setBio] = useState(userInfo?.bio ?? ''),
    [brandColor, setBrandColor] = useState(userInfo?.userColor ?? '#000000'),
    [brandColorChar, setBrandColorChar] = useState(brandColor),
    [hexPattern] = useState(/^(?!.*#.*#)[0-9A-Fa-f-#]+$/);
  const [isSavingInfo, setIsSavingInfo] = useState(false);
  const {
    country,
    state,
    gender,
    aviBigFile,
    aviSmallFile,
    setAviBigFile,
    setAviSmallFile,
    isDemo,
  } = useGlobalContext();

  const formRefs: FormRefsInt = {
    fullNameInputRef: useRef<HTMLInputElement>(null),
    userNameInputRef: useRef<HTMLInputElement>(null),
    emailInputRef: useRef<HTMLInputElement>(null),
    passwordInputRef: useRef<HTMLInputElement>(null),
    conPasswordInputRef: useRef<HTMLInputElement>(null),
  };

  const formRefsAction = (ref: keyof FormRefsInt, msg: string) => {
    toast.warn(msg);
    formRefs[ref].current?.focus();
  };

  const validateFullName = (): boolean => {
    if (regex.alpha.test(fullName)) return true;

    formRefsAction('fullNameInputRef', 'Invalid fullname');
    return false;
  };

  const validateUsername = (): boolean => {
    if (regex.alphaNumberic.test(userName)) return true;

    formRefsAction('userNameInputRef', 'Invalid username');
    return false;
  };

  const validateSocials = (): boolean => {
    let returnValue = true;
    [
      socials.git,
      socials.fb,
      socials.be,
      socials.ins,
      socials.X,
      socials.url,
    ].forEach((url) => {
      if (url.length && !regex.url.test(url)) {
        toast.warn('Enter valid social link');
        returnValue = false;
      }
    });

    return returnValue;
  };

  const validateEmail = (): boolean => {
    if (regex.email.test(email)) return true;
    formRefsAction('emailInputRef', 'Enter valid email');
    return false;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      toast.error('Profile update not available for demo account');
      return;
    }

    if (validateFullName() && validateUsername() && validateSocials()) {
      try {
        setIsSavingInfo(true);
        if (country && state && gender) {
          let bigAviUrl: string = '';
          let smallAviUrl: string = '';

          if (aviBigFile && aviSmallFile) {
            const uploadImg = (file: File, isBig: boolean): Promise<string> => {
              return new Promise<string>((resolve, reject) => {
                const uploadTask = new BlogServices().uplaodAviImg(
                  auth.currentUser?.uid ?? '',
                  isBig,
                  file
                );
                uploadTask.on(
                  'state_changed',
                  (snapshot) => {},
                  (error) => {},
                  () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                      (downloadURL) => {
                        if (downloadURL) resolve(downloadURL);
                        else reject('Avi upload failed');
                      }
                    );
                  }
                );
              });
            };

            bigAviUrl = await uploadImg(aviBigFile, true);
            smallAviUrl = await uploadImg(aviSmallFile, false);
          }
          const data: UpdateDataInt =
            bigAviUrl && smallAviUrl
              ? {
                  fullName,
                  userName,
                  country,
                  state,
                  bio,
                  gender,
                  socials,
                  aviUrls: {
                    bigAviUrl,
                    smallAviUrl,
                  },
                  userColor: brandColor,
                  dispEmail,
                }
              : {
                  fullName,
                  userName,
                  country,
                  state,
                  bio,
                  gender,
                  socials,
                  userColor: brandColor,
                  dispEmail,
                };

          await new BlogServices().updateUserInfo(data);
          toast.success('Profile updated');
          setAviBigFile && setAviBigFile(null);
          setAviSmallFile && setAviSmallFile(null);
        }
      } catch (error) {
        toast.error('Updating Failed');
      } finally {
        setIsSavingInfo(false);
      }
    }
  };

  const handleBrandColorTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    let finalValue = '';
    if (e.target.value && e.target.value.charAt(0) !== '#')
      finalValue = '#' + e.target.value;
    else finalValue = e.target.value;

    if (hexPattern.test(finalValue) && finalValue.length <= 7) {
      setBrandColorChar(finalValue);
      if (finalValue.length === 7) setBrandColor(finalValue);
    } else if (!finalValue.length) setBrandColorChar(finalValue);
  };

  return (
    <form className='set_prof_form settings_form' onSubmit={handleSubmit}>
      <fieldset className='form_segment'>
        <legend>User</legend>

        <article className='form_opt'>
          <label htmlFor='full_name'>Full Name</label>
          <input
            type='text'
            id='full_name'
            placeholder='Enter Fullname'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            ref={formRefs.fullNameInputRef}
          />
        </article>

        <article className='form_opt'>
          <div className='bottom_field'>
            <input
              type='checkbox'
              name='display_email'
              id='disp_email'
              checked={dispEmail}
              onChange={() => setDispEmail(!dispEmail)}
            />
            <label htmlFor='disp_email'>Display email on profile</label>
          </div>
        </article>

        <article className='form_opt'>
          <label htmlFor='user_name'>Username</label>
          <input
            type='text'
            id='user_name'
            placeholder='Enter Username'
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            ref={formRefs.userNameInputRef}
          />
        </article>

        <GenderInput />

        <article className='form_opt avi'>
          <label htmlFor='avi'>Profile Image</label>
          <ImageInputField />
        </article>
      </fieldset>

      <fieldset className='form_segment'>
        <legend>Basic</legend>
        <LocationInput />

        <article className='form_opt'>
          <label htmlFor='bio'>Bio</label>
          <textarea
            name='bio'
            cols={30}
            rows={8}
            placeholder='Give a brief description about yourself'
            maxLength={300}
            minLength={10}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>URL</label>
          <input
            type='url'
            placeholder='Enter Url (e.g. Portfolio link)'
            value={socials.url}
            onChange={(e) => setSocials({ ...socials, url: e.target.value })}
            id='url'
          />
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>Github</label>
          <input
            type='url'
            placeholder='Enter Github link'
            value={socials.git}
            onChange={(e) => setSocials({ ...socials, git: e.target.value })}
            id='url'
          />
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>X</label>
          <input
            type='url'
            placeholder='Enter X link'
            value={socials.X}
            onChange={(e) => setSocials({ ...socials, X: e.target.value })}
            id='url'
          />
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>Facebook</label>
          <input
            type='url'
            placeholder='Enter Facebook link'
            value={socials.fb}
            onChange={(e) => setSocials({ ...socials, fb: e.target.value })}
            id='url'
          />
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>Instagram</label>
          <input
            type='url'
            placeholder='Enter Instagram link'
            value={socials.ins}
            onChange={(e) => setSocials({ ...socials, ins: e.target.value })}
            id='url'
          />
        </article>

        <article className='form_opt'>
          <label htmlFor='url'>Behance</label>
          <input
            type='url'
            placeholder='Enter Behance link'
            value={socials.be}
            onChange={(e) => setSocials({ ...socials, be: e.target.value })}
            id='url'
          />
        </article>
      </fieldset>

      <fieldset className='form_segment'>
        <legend>Branding</legend>

        <article className='form_opt'>
          <div className='top'>
            <label htmlFor='brand_color'>Brand color</label>
            <p className='info'>Used for backgrounds, borders, etc.</p>
          </div>

          <div className='bottom'>
            <input
              type='color'
              name='brand_color'
              id='brand_color'
              value={brandColor || '#000000'}
              onChange={(e) => {
                setBrandColor(e.target.value);
                setBrandColorChar(e.target.value);
              }}
            />
            <input
              type='text'
              value={brandColorChar}
              onChange={handleBrandColorTextChange}
            />
          </div>
        </article>
      </fieldset>

      <button
        type='submit'
        className={`spc_btn ${isSavingInfo ? 'disable' : ''}`}
        disabled={isSavingInfo}
      >
        {isSavingInfo ? 'Updating...' : 'Update Profile Information'}
      </button>
    </form>
  );
};

export default ProfileSettings;
