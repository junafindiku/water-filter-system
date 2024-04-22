// RadioGroup.js
import React from 'react';
import RadioButton from './RadioButton';

const RadioGroup = ({ options, selectedOption, onChange }) => {
  return (
    <div className="radio-group">
      {options.map((option, index) => (
        <RadioButton
          key={index}
          id={option.value}
          value={option.value}
          checked={selectedOption === option.value}
          onChange={onChange}
          label={option.label}
        />
      ))}
    </div>
  );
}

export default RadioGroup;
