import React from 'react';
import testImg from 'Image/1111.jpg';

function InnerImage() {
  return (
    <div>
      <img src={testImg} alt="alt" />
      <h1> hello </h1>
    </div>
  );
}

export default InnerImage;
