import React from 'react';
import avocado from '../../assets/temp_pfp/avocado.jpg';

export const PageNotFound = () => {
  return (
    <>
      <div className="flex flex-col text-center text-2xl items-center">
        <h1 className="mt-10">404</h1>
        <p className="mt-10">How did this happen?</p>

        <img className="mt-[5rem]" src={avocado} alt="Error sprite" height={184} width={184} />
      </div>
    </>
  );
};
