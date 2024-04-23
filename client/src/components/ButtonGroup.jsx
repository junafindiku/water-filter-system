// ButtonGroup.js
import React from 'react';
import Button from './Button';

const ButtonGroup = ({ onSubmit, onAddReferences }) => {
  return (
    <div className="buttons">
      <Button onClick={onSubmit} text="Submit" />
      <Button onClick={onAddReferences} text="Add references" />
    </div>
  );
}

export default ButtonGroup;