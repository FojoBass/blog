import React, {
  FormEvent,
  useState,
  useEffect,
  ChangeEvent,
  useRef,
} from 'react';
import { GenderInput, ImageInputField, LocationInput } from '../components';

const ProfileSettings = () => {
  const [fullName, setFullName] = useState(''),
    [email, setEmail] = useState(''),
    [dispEmail, setDispEmail] = useState(true),
    [userName, setUsername] = useState(''),
    [url, setUrl] = useState(''),
    [bio, setBio] = useState(''),
    [brandColor, setBrandColor] = useState(''),
    [hexPattern] = useState(/^[0-9A-Fa-f]+$/),
    [brandColorChar, setBrandColorChar] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Profile settings submitted');
  };

  const handleBrandColorTextChange = (e: ChangeEvent) => {
    console.log('Yeah I changed');
  };

  return (
    <form className='set_prof_form' onSubmit={handleSubmit}>
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
          />
        </article>

        <article className='form_opt'>
          <div className='top_field'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
            />
          </div>

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
        <article className='form_opt'>
          <label htmlFor='url'>Website URL</label>
          <input
            type='url'
            placeholder='Enter Url(e.g. Portfolio link)'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </article>

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
      </fieldset>

      <fieldset className='form_segment'>
        <legend>Branding</legend>

        <article className='form_opt'>
          <div className='top_field'>
            <label htmlFor='brand_color'>Brand color</label>
            <p className='info'>Used for backgrounds, borders, etc.</p>
          </div>

          <div className='bottom_field'>
            <input
              type='color'
              name='brand_color'
              id='brand_color'
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
            />
            <input
              type='text'
              value={brandColorChar}
              onChange={handleBrandColorTextChange}
            />
          </div>
        </article>
      </fieldset>

      <button type='submit' className='spc_btn'>
        Save Profile Information
      </button>
    </form>
  );
};

export default ProfileSettings;
