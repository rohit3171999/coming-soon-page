import { useState } from 'react';

/*
* Description: A form to capture visitors’ email addresses.
Purpose: Build a pre-launch email list of potential users.
* */
export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        // In a real app, you'd send the email to your backend here.
        console.log('Form submitted with email:', email);
        setError('');
        setSubmitted(true);
    };

    // If the form has been submitted, show a confirmation message
    if (submitted) {
        return (
            <section className="bg-gray-800 py-12 sm:py-16 px-4 text-center">
                <h2 className="text-2xl font-bold text-green-400">Thank you! You're on the list.</h2>
                <p className="mt-2 text-lg text-gray-300">
                    We'll send a notification to <span className="font-medium text-white">{email}</span> the moment we launch.
                </p>
            </section>
        );
    }

    // Otherwise, show the sign-up form
    return (
        <section className="bg-gray-800 py-12 sm:py-16 px-4">
            <div className="max-w-lg mx-auto">
                <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6">
                    Don't Miss the Launch!
                </h2>
                <form onSubmit={handleSubmit} className="sm:flex sm:gap-3">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3 mb-3 sm:mb-0 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 flex-grow"
                        placeholder="Enter your email address"
                    />
                    <button
                        type="submit"
                        className="w-full sm:w-auto flex-shrink-0 px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors"
                    >
                        Notify Me
                    </button>
                </form>
                {error && <p className="mt-3 text-sm text-red-400 text-center sm:text-left">{error}</p>}
            </div>
        </section>
    );
}