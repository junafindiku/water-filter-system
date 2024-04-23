// FormField.js
import React from 'react';

const FormField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}

export default FormField;