import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando datos del fútbol...</p>
    </div>
  );
};

export default LoadingSpinner;