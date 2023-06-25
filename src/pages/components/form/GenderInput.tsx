import React, { useState } from 'react';

const GenderInput = () => {
  const [gender, setGender] = useState('male');

  return (
    <article className='form_opt gen_opt_wrapper'>
      <p className='radio_head'>Gender</p>

      <div className='gen_opt_sub_wrapper'>
        <article className='gen_opt'>
          <input
            type='radio'
            name='gender'
            id='male'
            value='male'
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor='male'>
            Male <span></span>
          </label>
        </article>

        <article className='gen_opt'>
          <input
            type='radio'
            name='gender'
            id='female'
            value='female'
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor='female'>
            Female <span></span>
          </label>
        </article>

        <article className='gen_opt'>
          <input
            type='radio'
            name='gender'
            id='others'
            value='others'
            checked={gender === 'others'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label htmlFor='others'>
            Others <span></span>
          </label>
        </article>
      </div>
    </article>
  );
};

export default GenderInput;
