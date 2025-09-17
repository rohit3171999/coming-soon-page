import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
* Description: Displays the dynamic countdown to launch date/time.
Purpose: Build anticipation by showing exact time left until launch.
* */
export default function CountdownWriter({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        // Set up a timer that updates the countdown every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <div className="flex justify-center gap-4 sm:gap-8">
            {timeUnits.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center justify-center bg-gray-700/50 p-3 sm:p-4 rounded-lg w-24 h-24 sm:w-28 sm:h-28">
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                        {/* Pad with a leading zero if the number is less than 10 */}
                        {String(unit.value).padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-400">
                        {unit.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

CountdownWriter.propTypes = {
    targetDate: PropTypes.instanceOf(Date).isRequired,
};