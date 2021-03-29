import React from 'react';
import Loading from '../../assets/images/loading.gif';

export const LoadingScreen = () => {
  return (
    <div className="loading__main">
      <h2 className="loading__title">Please wait...</h2>
      <img src={Loading} className="loading__img" alt="Loading" />
    </div>
  );
};
