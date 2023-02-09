import React from 'react';
import ReactCalendar from 'react-calendar';

const Calendarr = () => {
  const tileContent = ({ date, view }: any) => {
    return (
      <div>
        {date.toLocaleDateString('default', {
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
    );
  };

  return <ReactCalendar tileContent={tileContent} />;
};

export default Calendarr;
