import React, { useState, useEffect } from 'react';

// SVG Icon Components
const Logo = () => (
    <svg className="w-16 h-16 text-white mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SocialIcon = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        {children}
    </a>
);

// Main App Component
function App() {
    // --- STATE MANAGEMENT ---

    // Set the launch date based on the PRD's timeline.
    // PRD Date: Sep 3, 2025. Adding buffer for development.
    const launchDate = new Date('2025-09-30T12:00:00');

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +launchDate - +new Date();
            let newTimeLeft = {};

            if (difference > 0) {
                newTimeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            } else {
                newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }
            return newTimeLeft;
        };

        // Set initial time left
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, [launchDate]);

    // --- FORM HANDLING ---
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) {
            setError(''); // Clear error when user starts typing
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        console.log('Email submitted:', email); // In a real app, send this to a backend/service
        setIsSubmitted(true);
        setError('');
    };

    // Helper function to format countdown numbers
    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
            <main className="text-center w-full max-w-3xl mx-auto flex flex-col items-center">

                {/* 1. Hero Section */}
                <div className="mb-8">
                    <Logo />
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-down">
                        Something Exciting is Coming Soon!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-fade-in-up">
                        We're working hard to bring you a new, revolutionary platform. Get ready to experience something amazing.
                    </p>
                </div>

                {/* 2. Countdown Timer */}
                <div className="flex justify-center space-x-2 md:space-x-4 mb-10 animate-zoom-in">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="text-center p-3 md:p-4 bg-white/10 rounded-lg w-20 md:w-28 border border-white/20 backdrop-blur-sm">
                            <div className="text-3xl md:text-5xl font-bold text-blue-300">{formatNumber(value)}</div>
                            <div className="text-xs md:text-sm uppercase tracking-widest text-gray-400 mt-1">{unit}</div>
                        </div>
                    ))}
                </div>

                {/* 3. Signup Form */}
                <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Enter your email address"
                                className="w-full px-5 py-3 rounded-md bg-gray-700/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 transition-all duration-300"
                                aria-label="Email Address"
                            />
                            <button
                                type="submit"
                                className="px-8 py-3 bg-blue-600 rounded-md font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-100 whitespace-nowrap"
                            >
                                Notify Me
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-500/20 text-green-300 border border-green-500/30 rounded-md px-4 py-3 text-center">
                            <p className="font-semibold">Thanks for your interest!</p>
                            <p className="text-sm">We'll notify you at launch. You're on the list!</p>
                        </div>
                    )}
                    {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
                </div>

                {/* 4. Social Links */}
                <div className="flex justify-center space-x-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.087-.79-.167-2.005.038-2.877.19-.776.994-4.205.994-4.205s-.252-.504-.252-1.243c0-1.161.67-2.043 1.506-2.043.708 0 1.046.53 1.046 1.175 0 .714-.457 1.782-.698 2.778-.202.822.41 1.494 1.223 1.494 1.464 0 2.586-1.56 2.586-3.818 0-1.994-1.424-3.445-3.25-3.445-2.215 0-3.51 1.66-3.51 3.202 0 .612.204 1.254.462 1.626l.278.473c-.07.297-.234.936-.303 1.228-.084.357-.155.584-.26.844-.063.15-.12.292-.12.292s-.41 1.65-.494 1.954c-.144.532-.546 1.182-.857 1.543A9.997 9.997 0 0012 22a10 10 0 0010-10c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                    </SocialIcon>
                    <SocialIcon href="#">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.336 9.005H4.002v-8.59h2.671v8.59zM17.668 2H6.328C3.965 2 2 3.989 2 6.354v11.292C2 20.01 3.965 22 6.328 22h11.34c2.365 0 4.328-1.99 4.328-4.354V6.354C22 3.989 20.035 2 17.668 2z" clipRule="evenodd" /></svg>
                    </SocialIcon>
                </div>

            </main>

            {/* 5. Footer */}
            <footer className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
                <div className="mt-1">
                    <a href="#" className="hover:text-gray-300 transition-colors">Contact</a> &middot;
                    <a href="#" className="mx-2 hover:text-gray-300 transition-colors">Terms</a> &middot;
                    <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
