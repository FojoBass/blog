import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [msg, setMsg] = useState('');
  return (
    <section id='contact_sect'>
      <div className='center_sect'>
        <h2 className='contact_heading'>Contact Us</h2>

        <div className='contact_wrapper'>
          <div className='left_side'>
            <article className='contact_opt'>
              <div className='title'>Phone:</div>
              <a className='info' href='tel:+12345678900'>
                +123 4567 8900
              </a>
            </article>

            <article className='contact_opt'>
              <div className='title'>Email:</div>
              <a className='info' href='mailto:lorem@ipsum.com'>
                lorem@ipsum.com
              </a>
            </article>

            <article className='contact_opt'>
              <div className='title'>Twitter:</div>
              <a className='info' href='https://twitter.com'>
                Devies
              </a>
            </article>
          </div>

          <div className='right_side'>
            <form action=''>
              <h3 className='form_heading'>Message Us</h3>

              <input
                type='text'
                placeholder='Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='mail'
                placeholder='Your Email'
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
              <textarea
                placeholder='Your Messages'
                cols={30}
                rows={10}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              ></textarea>

              <button type='submit' className='submit_btn spc_btn'>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
