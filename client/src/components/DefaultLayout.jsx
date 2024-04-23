import React, { useState } from 'react';
function Avatar({ src, alt, onClick }) {
  return (
    <button className="avatar" onClick={onClick}>
      <img src={src} alt={alt} loading="lazy" />
    </button>
  );
}
export default function DefaultLayout(){
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [currentDate] = useState(new Date());
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const timeSlots = [
    '08:00 - 09:30',
    '09:30 - 11:00',
    '11:00 - 12:30',
    '12:30 - 14:00',
    '14:00 - 15:30',
    '15:30 - 17:00',
    '17:00 - 18:30',
    '18:30 - 20:00',
    '20:00 - 21:30'
  ];
  const handleClick = (day) => {
    setSelectedDay(day);
    setSelectedTimes([]); // Reset selected times when a new day is selected
  };

  const handleTimeClick = (time) => {
    const isSelected = selectedTimes.includes(time);
    if (isSelected) {
      setSelectedTimes(selectedTimes.filter(selectedTime => selectedTime !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };
  const avatars = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/693efd1ed806eb4099290164b3b4dc14883a2626c5b48504e5ce0f3e05184a64?apiKey=c5888463de7c4344aa712a65442ac89b&", alt: "Avatar 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b01d86a1d03a241735b152c6da2f37a8dfe09e5a9233673096b3bb4c30aca5a2?apiKey=c5888463de7c4344aa712a65442ac89b&", alt: "Avatar 2" },
  ];

  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  const nextWeekDates = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    nextWeekDates.push(date);
  }
  return(
    // <div>
    //   <h1>Default Layout</h1>
    // </div>
    <div className='app'>
      <h2>Schedule Managment</h2>
      <div style={{  border: '1px solid black',borderRadius: '16px',padding: '8px', width:'fit-content'}}>
        <p>Next Weeks Schedule</p>
        <div>
          {nextWeekDates.map((date, index) => (
            <div key={index} style={{ display: 'inline-block', margin: '10px', textAlign: 'center' }}>
              <div>{days[date.getDay()]}</div>
              <div 
                style={{
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  border: '1px solid black', 
                  lineHeight: '50px', 
                  backgroundColor: selectedDay === index ? 'lightblue' : '#eee',
                  cursor: 'pointer'
                }}
                onClick={() => handleClick(index)}
              >
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>
        <p>Available time slots</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {timeSlots.map((time, index) => (
            <div 
              key={index} 
              style={{
                border: '1px solid black', 
                borderRadius: '8px', 
                padding: '8px', 
                margin: '5px', 
                cursor: 'pointer',
                backgroundColor: selectedTimes.includes(time) ? 'lightblue' : '#eee'
              }}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
      <p>Available time slots</p>
      <div style={{display:'flex',width:'100%', alignItems:'center',justifyContent:'space-between'}}>
        <p>Status:Waiting on approval</p>
        <div className="icons" style={{display:'flex', gap:'8px'}}>
          <p>pencil</p>
          <p>bin</p>
        </div>
      </div>
      <div className='card2'>
        <div className="avatar-container">
          {avatars.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar.src}
              alt={avatar.alt}
              onClick={() => handleAvatarClick(index)}
            />
          ))}
        </div>
        {selectedAvatar !== null && (
          <p>Selected avatar: {avatars[selectedAvatar].alt}</p>
        )}
      </div>
    </div>
  );
}
