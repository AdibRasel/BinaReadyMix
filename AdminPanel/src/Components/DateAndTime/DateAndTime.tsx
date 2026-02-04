import React from 'react';

const DateAndTime = () => {
    return (
        <div className="TodayDate">
            <span className="text-end">
                {new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}
            </span>
            &nbsp; || &nbsp;
            <span className="text-end">
                {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                })}
            </span>
        </div>
    );
};

export default DateAndTime;
