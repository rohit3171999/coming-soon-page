import React, { useState, useEffect } from "react";

export default function App() {
    // Target launch date
    const launchDate = new Date("2025-12-31T00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((distance / 1000 / 60) % 60),
                    seconds: Math.floor((distance / 1000) % 60),
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [launchDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() !== "") {
            setSubmitted(true);
        }
    };

    return (
        <div className="text-center px-5 py-12 font-sans bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            {/* Hero Section */}
            <h1 className="text-4xl md:text-5xl mb-3 font-bold text-[#222]">
                🚀 Something Exciting is Coming Soon!
            </h1>
            <p className="text-lg text-gray-600 mb-10">
                We’re working hard to launch our new website. Stay tuned!
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-5 mb-8 flex-wrap">
                <div className="bg-white px-6 py-4 rounded-lg shadow-md min-w-[80px]">
          <span className="block text-3xl font-bold text-gray-800">
            {timeLeft.days}
          </span>
                    <span className="text-sm text-gray-500">Days</span>
                </div>
                <div className="bg-white px-6 py-4 rounded-lg shadow-md min-w-[80px]">
          <span className="block text-3xl font-bold text-gray-800">
            {timeLeft.hours}
          </span>
                    <span className="text-sm text-gray-500">Hours</span>
                </div>
                <div className="bg-white px-6 py-4 rounded-lg shadow-md min-w-[80px]">
          <span className="block text-3xl font-bold text-gray-800">
            {timeLeft.minutes}
          </span>
                    <span className="text-sm text-gray-500">Minutes</span>
                </div>
                <div className="bg-white px-6 py-4 rounded-lg shadow-md min-w-[80px]">
          <span className="block text-3xl font-bold text-gray-800">
            {timeLeft.seconds}
          </span>
                    <span className="text-sm text-gray-500">Seconds</span>
                </div>
            </div>

            {/* Signup Form */}
            {!submitted ? (
                <form
                    onSubmit={handleSubmit}
                    className="flex justify-center mb-8 w-full max-w-md"
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="px-3 py-2 w-64 border border-gray-300 rounded-l-md focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="px-5 py-2 bg-blue-600 text-white font-bold rounded-r-md hover:bg-blue-700"
                    >
                        Notify Me
                    </button>
                </form>
            ) : (
                <p className="text-green-600 text-lg mb-8">
                    ✅ Thanks! We’ll notify you at launch.
                </p>
            )}

            {/* Footer */}
            <footer className="mt-10 text-sm text-gray-600">
                <a href="#contact" className="text-blue-600 no-underline mx-1 hover:underline">
                    Contact
                </a>
                |{" "}
                <a href="#privacy" className="text-blue-600 no-underline mx-1 hover:underline">
                    Privacy Policy
                </a>
                |{" "}
                <a href="#terms" className="text-blue-600 no-underline mx-1 hover:underline">
                    Terms
                </a>
            </footer>
        </div>
    );
}
