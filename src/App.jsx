import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date("2025-12-31T00:00:00").getTime(); // Change launch date here

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="comingsoon-container">
            <h1>🚀 Our Website is Coming Soon!</h1>
            <p>We’re working hard to launch something amazing. Stay tuned!</p>

            {/* Countdown Timer */}
            <div className="countdown">
                <div className="time-box">
                    <span>{timeLeft.days}</span>
                    <p>Days</p>
                </div>
                <div className="time-box">
                    <span>{timeLeft.hours}</span>
                    <p>Hours</p>
                </div>
                <div className="time-box">
                    <span>{timeLeft.minutes}</span>
                    <p>Minutes</p>
                </div>
                <div className="time-box">
                    <span>{timeLeft.seconds}</span>
                    <p>Seconds</p>
                </div>
            </div>

            {/* Newsletter Form */}
            <form className="subscribe-form">
                <input type="email" placeholder="Enter your email" required />
                <button type="submit">Notify Me</button>
            </form>
        </div>
    );
}
