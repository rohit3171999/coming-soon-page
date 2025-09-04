import React, { useState, useEffect } from "react";

export default function App() {
    // Target launch date (set your launch date here)
    const launchDate = new Date("2025-12-31T00:00:00").getTime();

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
        <div style={styles.container}>
            {/* Hero Section */}
            <h1 style={styles.headline}>🚀 Something Exciting is Coming Soon!</h1>
            <p style={styles.subheadline}>
                We’re working hard to launch our new website. Stay tuned!
            </p>

            {/* Countdown Timer */}
            <div style={styles.countdown}>
                <div style={styles.timerBox}>
                    <span style={styles.timerValue}>{timeLeft.days}</span>
                    <span style={styles.timerLabel}>Days</span>
                </div>
                <div style={styles.timerBox}>
                    <span style={styles.timerValue}>{timeLeft.hours}</span>
                    <span style={styles.timerLabel}>Hours</span>
                </div>
                <div style={styles.timerBox}>
                    <span style={styles.timerValue}>{timeLeft.minutes}</span>
                    <span style={styles.timerLabel}>Minutes</span>
                </div>
                <div style={styles.timerBox}>
                    <span style={styles.timerValue}>{timeLeft.seconds}</span>
                    <span style={styles.timerLabel}>Seconds</span>
                </div>
            </div>

            {/* Signup Form */}
            {!submitted ? (
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Notify Me
                    </button>
                </form>
            ) : (
                <p style={styles.thankyou}>✅ Thanks! We’ll notify you at launch.</p>
            )}

            {/* Footer */}
            <footer style={styles.footer}>
                <a href="#contact" style={styles.footerLink}>Contact</a> |{" "}
                <a href="#privacy" style={styles.footerLink}>Privacy Policy</a> |{" "}
                <a href="#terms" style={styles.footerLink}>Terms</a>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "50px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f5f5f5",
        minHeight: "100vh",
    },
    headline: {
        fontSize: "2.5rem",
        marginBottom: "10px",
        color: "#222",
    },
    subheadline: {
        fontSize: "1.2rem",
        marginBottom: "40px",
        color: "#555",
    },
    countdown: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginBottom: "30px",
    },
    timerBox: {
        background: "#fff",
        padding: "15px 25px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        minWidth: "80px",
    },
    timerValue: {
        display: "block",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#333",
    },
    timerLabel: {
        fontSize: "0.9rem",
        color: "#777",
    },
    form: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "30px",
    },
    input: {
        padding: "10px",
        width: "250px",
        border: "1px solid #ccc",
        borderRadius: "5px 0 0 5px",
        outline: "none",
    },
    button: {
        padding: "10px 20px",
        border: "none",
        background: "#007bff",
        color: "#fff",
        cursor: "pointer",
        borderRadius: "0 5px 5px 0",
        fontWeight: "bold",
    },
    thankyou: {
        fontSize: "1.1rem",
        color: "green",
        marginBottom: "30px",
    },
    footer: {
        marginTop: "40px",
        fontSize: "0.9rem",
        color: "#555",
    },
    footerLink: {
        color: "#007bff",
        textDecoration: "none",
        margin: "0 5px",
    },
};
