import React from 'react';
import AppLabel from '../AppLabel';
import './styles.css';
function LandingPage() {
  return (
    <div className='d-flex justify-content-center '>
      <AppLabel
        label='Welcome to Image Portal'
        className='welcome-text-styling'
      />
    </div>
  );
}

LandingPage.propTypes = {};

export default LandingPage;
