import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorInt {
  type: '404' | 'profile';
}

const Error: React.FC = () => {
  return (
    <div id='error_sect'>
      <div className='wrapper'>
        <h3>oops!</h3>
        <h1>
          <span className='fours'>4</span>0<span className='fours'>4</span>
        </h1>
        <p>Page not found</p>
        <p>
          Return{' '}
          <Link to='/' replace>
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
