import React from 'react';
import { useRouteError } from 'react-router-dom';

interface ErrorInt {
  type: '404' | 'profile';
}

const Error: React.FC<ErrorInt> = ({ type }) => {
  const error = useRouteError();

  console.log(error);

  return (
    <div id='error_sect'>
      {type === '404' ? (
        <div>Error</div>
      ) : type === 'profile' ? (
        <div>User not found</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Error;
