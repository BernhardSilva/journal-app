import React from 'react';
import Loading from '../../assets/images/loading.gif';

export const LoadingScreen = () => {
  return (
    <div className="loading__main animate__animated animate__fadeIn">
      <h3 className="loading__title">Please wait...</h3>
      <img src={Loading} className="loading__img" alt="Loading" />
    </div>
  );
};
