// RadioButton.js
import React from 'react';

const RadioButton = ({ id, value, checked, onChange, label }) => {
  return (
    <>
      <input type="radio" id={id} value={value} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

export default RadioButton;