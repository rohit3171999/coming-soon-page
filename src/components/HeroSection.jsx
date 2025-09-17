import CountdownWriter from "./CountdownWriter.jsx";

/*
* Description: The top section of the page that captures attention and communicates the key message.
Purpose: Immediately tell visitors something exciting is coming, and show the countdown prominently.
* */
export default function HeroSection(){
    // Set your target launch date here
    const launchDate = new Date('2024-12-31T23:59:59');

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white text-center p-4 sm:p-6 md:p-8">
            {/* You can add a background image here for more visual appeal */}
            {/* e.g., style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }} className="bg-cover bg-center" */}
            <div className="z-10">
                {/* Logo placeholder - Replace with your actual logo */}
                <img src="https://www.wpelemento.com/cdn/shop/files/free-coming-soon-wordpress-theme.png?v=1717758512" alt="Company Logo" className="h-24 sm:h-32 mx-auto mb-8"/>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                    Something Exciting is Coming Soon!
                </h1>

                {/* Subheadline */}
                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-12">
                    We're putting the finishing touches on our new website. Be the first to know when we launch!
                </p>

                {/* Wrapper for CountdownTimer component */}
                <div>
                    <CountdownWriter targetDate={launchDate} />
                </div>
            </div>
        </section>
    );
}