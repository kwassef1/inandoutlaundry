import React from 'react';
import './App.css';

function App() {
  const services = [
    'Wash & Fold',
    'Self-Serve Machines',
    'Dry Cleaning Drop-off',
    'Commercial Laundry',
    'Pickup & Delivery'
  ];

  const hours = [
    { day: 'Mon-Fri', time: '7:00 AM – 9:00 PM' },
    { day: 'Sat', time: '8:00 AM – 8:00 PM' },
    { day: 'Sun', time: '9:00 AM – 6:00 PM' }
  ];

  return (
    <div className="site">
      <header className="site-header">
        <div className="brand">
          <h1>In & Out Laundry</h1>
          <p className="tagline">Fast, friendly laundry service</p>
        </div>
        <nav className="site-nav">
          <a href="#hours">Hours</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="site-content">
        <section id="hours" className="card">
          <h2>Hours</h2>
          <ul>
            {hours.map(h => (
              <li key={h.day}><strong>{h.day}:</strong> {h.time}</li>
            ))}
          </ul>
        </section>

        <section id="services" className="card">
          <h2>Services</h2>
          <ul>
            {services.map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>

        <section id="contact" className="card">
          <h2>Contact Us</h2>
          <p>Phone: <a href="tel:+1234567890">(123) 456-7890</a></p>
          <p>Email: <a href="mailto:info@inandoutlaundry.example">info@inandoutlaundry.example</a></p>
          <p>Address: 123 Clean St., Washville</p>
        </section>
      </main>

      <footer className="site-footer">
        <small>&copy; {new Date().getFullYear()} In & Out Laundry</small>
      </footer>
    </div>
  );
}

export default App;
