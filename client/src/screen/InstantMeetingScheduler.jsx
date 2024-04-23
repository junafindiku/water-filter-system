// InstantMeetingScheduler.js, this is the form that will be used by the instant meeting interface
import React, { useState } from 'react';
import FormField from '../components/FormField';
import RadioGroup from '../components/RadioGroup';
import ButtonGroup from '../components/ButtonGroup';
import '../css/InstantMeetingSchedule.css'

const InstantMeetingScheduler = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    address: '',
    date: '',
    status: 'successful', // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (status) => {
    setFormData({ ...formData, status });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, like sending data to a server
    console.log(formData);
  };

  const handleAddReferences = () => {
    // Handle adding references
    console.log("Adding references");
  };

  const radioOptions = [
    { value: 'successful', label: 'Successful', check: 'successfu' },
    { value: 'unsuccessful', label: 'Unsuccessful' }
  ];

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <FormField label="First Name" type="text" name="name" value={formData.name} onChange={handleChange} />
        <FormField label="Last Name" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        <FormField label="Address" type="text" name="address" value={formData.address} onChange={handleChange} />
        <FormField label="Date" type="date" name="date" value={formData.date} onChange={handleChange} />
        <RadioGroup options={radioOptions} selectedOption={formData.status} onChange={(e) => handleStatusChange(e.target.value)} />
        <ButtonGroup onSubmit={handleSubmit} onAddReferences={handleAddReferences} />
      </form>
    </div>
  );
}

export default InstantMeetingScheduler;
