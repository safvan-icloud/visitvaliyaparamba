'use client';

import { useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  {
    label: 'Explore',
    href: '#destinations',
    submenu: ['Beaches', 'Islands', 'Backwaters', 'Attractions'],
  },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Stay', href: '#stay' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Blog', href: '#blog' },
  { label: 'Travel Guide', href: '#guide' },
  { label: 'Contact', href: '#contact' },
];

const destinations = [
  {
    title: 'Valiyaparamba Beach',
    description: 'A wide, tranquil shoreline framed by golden light, gentle waves, and breezy evening sunsets.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    tag: 'Beach',
  },
  {
    title: 'Backwaters',
    description: 'Silent lagoons and village canals bring a quiet luxury where every cruise feels cinematic.',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    tag: 'Waterways',
  },
  {
    title: 'Mangrove Forests',
    description: 'Nature-rich mangrove corridors add shade, wildlife, and unforgettable eco-adventure.',
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
    tag: 'Nature',
  },
  {
    title: 'Sunset Point',
    description: 'A dramatic golden-hour panorama that turns the coast into one of Kerala’s most photogenic scenes.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    tag: 'Sunset',
  },
  {
    title: 'Island Tours',
    description: 'Glide through calm islands and hidden coves with local boatmen who know every tide and route.',
    image:
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    tag: 'Adventure',
  },
  {
    title: 'Scenic Boat Routes',
    description: 'Explore unforgettable coastal journeys across serene waters, fishing villages, and shoreline views.',
    image:
      'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80',
    tag: 'Cruises',
  },
];

const experiences = [
  'Houseboat Rides',
  'Sunset Cruises',
  'Fishing Tours',
  'Mangrove Exploration',
  'Kayaking',
  'Canoeing',
  'Photography Tours',
  'Local Food Experiences',
];

const stats = [
  { value: 15, suffix: '+', label: 'Attractions' },
  { value: 20, suffix: '+', label: 'Beaches & Islands' },
  { value: 50, suffix: '+', label: 'Stay Options' },
  { value: 1000, suffix: '+', label: 'Visitors' },
];

const galleryImages = [
  { category: 'Beaches', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80' },
  { category: 'Backwaters', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80' },
  { category: 'Fishing', image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80' },
  { category: 'Food', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80' },
  { category: 'Resorts', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80' },
  { category: 'Nature', image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80' },
];

const weather = [
  { label: 'Current Temperature', value: '29°C' },
  { label: 'Weather Condition', value: 'Sunny' },
  { label: 'Humidity', value: '78%' },
  { label: 'Wind Speed', value: '12 km/h' },
];

const travelPlan = [
  { title: 'By Air', details: 'Nearest Airports: Kochi International Airport (approx. 3.5 hrs drive)', icon: '✈️' },
  { title: 'By Train', details: 'Nearest Railway Stations: Alappuzha & Ernakulam rail links', icon: '🚆' },
  { title: 'By Road', details: 'Drive via NH66 with scenic coastal roads and easy access from major cities', icon: '🚗' },
];

const bestTime = [
  {
    season: 'Summer',
    months: 'March to May',
    weather: 'Warm and bright with excellent beach days',
    perks: 'Ideal for family travel and beach hopping',
    recommended: false,
  },
  {
    season: 'Monsoon',
    months: 'June to September',
    weather: 'Lush, dramatic rain-washed landscapes',
    perks: 'Best for waterfalls, greenery and tranquil backwaters',
    recommended: false,
  },
  {
    season: 'Winter',
    months: 'October to February',
    weather: 'Pleasant, breezy and comfortable for sightseeing',
    perks: 'Most recommended season for coastal exploration',
    recommended: true,
  },
];

const foodItems = [
  'Seafood Delicacies',
  'Traditional Kerala Meals',
  'Fish Curry',
  'Prawns',
  'Crab Dishes',
];

const tips = [
  'Respect local customs and dress modestly in temple and village areas.',
  'Carry cash for small beaches, ferry rides and local eateries.',
  'Mobile connectivity is strong in towns; local SIMs are easy to obtain.',
  'Light cotton clothing and beach footwear work best in warm coastal weather.',
  'Practice responsible tourism by avoiding littering and respecting wildlife habitats.',
];

const faqs = [
  { question: 'What is Valiyaparamba famous for?', answer: 'Valiyaparamba is celebrated for its coastal beauty, quiet beaches, backwater experiences, mangrove landscapes, and authentic Kerala culture.' },
  { question: 'How many days should I spend?', answer: 'A 2 to 4 day trip is ideal to experience the beaches, boat rides, food, and nearby scenic attractions at a relaxed pace.' },
  { question: 'What is the best time to visit?', answer: 'Winter from October to February is the most comfortable season for sightseeing, beaches, and boat tours.' },
  { question: 'How can I reach Valiyaparamba?', answer: 'The destination is accessible by air via Kochi, rail via nearby stations, and road through Kerala’s scenic coastal highways.' },
  { question: 'Are boat rides available?', answer: 'Yes, local boat rides and island cruises are widely available and are among the most memorable ways to explore the coast.' },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector('.topbar');
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 30);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const startAudio = async () => {
      if (!audioRef.current) return;
      audioRef.current.volume = 0.2;
      try {
        await audioRef.current.play();
      } catch {
        // Browser may block autoplay until the first user interaction.
      }
    };

    window.addEventListener('pointerdown', startAudio, { once: true });
    return () => window.removeEventListener('pointerdown', startAudio);
  }, []);

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-target]');
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target ?? 0);
      const duration = 1200;
      const start = performance.now();

      const tick = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        const value = Math.floor(progress * target);
        counter.textContent = `${value}${counter.dataset.suffix ?? ''}`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = `${target}${counter.dataset.suffix ?? ''}`;
        }
      };

      requestAnimationFrame(tick);
    });
  }, []);

  const filteredGallery =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter((item) => item.category === activeFilter);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Visit Valiyaparamba home">
            <span className="brand-mark">V</span>
            <div>
              <strong>Visit Valiyaparamba</strong>
              <small>Kerala’s Hidden Coastal Paradise</small>
            </div>
          </a>

          <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navItems.map((item) => (
              <div key={item.label} className="nav-group">
                <a href={item.href}>{item.label}</a>
                {item.submenu ? (
                  <div className="dropdown-menu" aria-label={`${item.label} submenu`}>
                    {item.submenu.map((sub) => (
                      <a key={sub} href="#destinations">{sub}</a>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <audio ref={audioRef} src="/media/water-ambient.mp3" loop preload="auto" style={{ display: 'none' }} />
        <div className="hero-video-wrap">
          <video
            src="/media/hero-kayak.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="hero-video"
          />
        </div>
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy reveal">
            <p className="eyebrow light">Luxury Coastal Escape</p>
            <h1>VISIT VALIYAPARAMBA</h1>
            <p className="hero-subtitle">Kerala&apos;s Hidden Coastal Paradise</p>
            <p className="hero-description">
              Discover breathtaking beaches, serene backwaters, island adventures and unforgettable coastal experiences.
            </p>
            <div className="hero-actions">
              <a href="#destinations" className="btn btn-primary">Explore Now</a>
              <a href="#contact" className="btn btn-secondary">Plan My Journey</a>
            </div>
          </div>
          <div className="scroll-indicator">
            <span />
          </div>
        </div>
      </section>

      <section className="about-section section-spacing">
        <div className="container split-layout">
          <div className="about-image reveal">
            <img
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
              alt="Valiyaparamba coastal landscape"
            />
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow">About Valiyaparamba</p>
            <h2>Where the coast meets culture, calm and wonder.</h2>
            <p>
              Valiyaparamba is a serene coastal destination in Kerala, shaped by its palms, backwaters, island routes, and rich fishing heritage. It offers visitors a tranquil blend of sea, nature, and local tradition.
            </p>
            <p>
              From glittering shorelines and mangrove stretches to village life and golden sunsets, every experience here feels immersive, authentic and beautifully unhurried.
            </p>
            <ul className="feature-list">
              <li>Historic coastal communities and local traditions</li>
              <li>Scenic backwater routes and mangrove beauty</li>
              <li>Fishing culture, local food and island journeys</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="destinations" className="section-spacing alt-panel">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Featured Destinations</p>
            <h2>Uncover Kerala’s most captivating coastal gems.</h2>
          </div>

          <div className="destination-grid">
            {destinations.map((place) => (
              <article key={place.title} className="destination-card reveal">
                <div className="destination-image">
                  <img src={place.image} alt={place.title} />
                  <span>{place.tag}</span>
                </div>
                <div className="destination-content">
                  <h3>{place.title}</h3>
                  <p>{place.description}</p>
                  <a href="#guide">View More</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="section-spacing">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Experiences</p>
            <h2>Wake up to moments you will remember forever.</h2>
          </div>

          <div className="experience-grid">
            {experiences.map((experience, index) => (
              <div key={experience} className="experience-card reveal" style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="icon-badge">{['🌊', '⛴️', '🎣', '🌿', '🛶', '🚣', '📷', '🍽️'][index]}</div>
                <h3>{experience}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section section-spacing">
        <div className="container stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-box reveal">
              <div className="stat-number" data-target={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" className="section-spacing">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Photo Gallery</p>
            <h2>Frame the beauty of Kerala’s coastal rhythm.</h2>
          </div>

          <div className="gallery-filters reveal">
            {['All', 'Beaches', 'Backwaters', 'Fishing', 'Food', 'Resorts', 'Nature'].map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="gallery-grid reveal">
            {filteredGallery.map((item, index) => (
              <div key={`${item.category}-${index}`} className="gallery-item gallery-item-large">
                <img src={item.image} alt={item.category} />
                <div className="gallery-label">{item.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="weather-section section-spacing">
        <div className="container weather-layout">
          <div className="weather-card reveal">
            <div className="weather-header">
              <div>
                <p className="eyebrow">Weather</p>
                <h3>Valiyaparamba</h3>
              </div>
              <span className="weather-icon">☀️</span>
            </div>
            <div className="weather-grid">
              {weather.map((item) => (
                <div key={item.label} className="weather-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="guide" className="section-spacing alt-panel">
        <div className="container guide-layout">
          <div className="section-head reveal">
            <p className="eyebrow">How to Reach</p>
            <h2>Seamless travel to Kerala’s quiet coastal jewel.</h2>
          </div>

          <div className="travel-grid">
            {travelPlan.map((plan) => (
              <div key={plan.title} className="travel-card reveal">
                <div className="travel-icon">{plan.icon}</div>
                <h3>{plan.title}</h3>
                <p>{plan.details}</p>
              </div>
            ))}
          </div>

          <div className="map-card reveal">
            <iframe
              src="https://www.google.com/maps?q=Valiyaparamba%20Kerala&z=12&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Valiyaparamba location map"
            />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">Best Time to Visit</p>
            <h2>Choose the season that matches your ideal coastal escape.</h2>
          </div>

          <div className="season-grid">
            {bestTime.map((season) => (
              <div key={season.season} className={`season-card reveal ${season.recommended ? 'recommended' : ''}`}>
                <span className="season-tag">{season.recommended ? 'Recommended' : 'Season'}</span>
                <h3>{season.season}</h3>
                <p className="season-months">{season.months}</p>
                <p>{season.weather}</p>
                <strong>{season.perks}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing alt-panel">
        <div className="container food-layout">
          <div className="food-copy reveal">
            <p className="eyebrow">Local Food</p>
            <h2>Flavours that carry the spirit of Kerala’s coast.</h2>
            <p>
              Taste aromatic seafood, traditional curries and dishes shaped by the region’s riverside and marine heritage.
            </p>
            <ul className="feature-list">
              {foodItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="food-image reveal">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
              alt="Kerala seafood platter"
            />
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container tips-layout">
          <div className="section-head reveal">
            <p className="eyebrow">Travel Tips</p>
            <h2>Plan a thoughtful, smooth and responsible getaway.</h2>
          </div>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={tip} className="tip-box reveal" style={{ transitionDelay: `${index * 80}ms` }}>
                <span>{index + 1}</span>
                <p>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing alt-panel" id="blog">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">FAQ</p>
            <h2>Everything you need before you go.</h2>
          </div>

          <div className="faq-list reveal">
            {faqs.map((faq, index) => (
              <div key={faq.question} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section section-spacing">
        <div className="container cta-box reveal">
          <div className="cta-content">
            <p className="eyebrow light">Your Coastal Escape Awaits</p>
            <h2>Ready To Explore Valiyaparamba?</h2>
          </div>
          <a href="#contact" className="btn btn-primary">Start Your Journey</a>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="container footer-grid">
          <div>
            <a href="#home" className="brand footer-brand">
              <span className="brand-mark">V</span>
              <div>
                <strong>Visit Valiyaparamba</strong>
                <small>Kerala’s Hidden Coastal Paradise</small>
              </div>
            </a>
            <p>
              Discover the charm of Kerala’s quiet shoreline through premium stays, scenic adventures and unforgettable coastal stories.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#destinations">Explore</a></li>
              <li><a href="#experiences">Experiences</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#guide">Travel Guide</a></li>
            </ul>
          </div>

          <div>
            <h4>Travel Guide</h4>
            <ul>
              <li><a href="#guide">How to Reach</a></li>
              <li><a href="#blog">FAQs</a></li>
              <li><a href="#">Best Time to Visit</a></li>
              <li><a href="#">Travel Tips</a></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@visitvaliyaparamba.com">info@visitvaliyaparamba.com</a></li>
              <li><a href="https://visitvaliyaparamba.com">visitvaliyaparamba.com</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms & Conditions</a>
              <a href="#">Cookie Policy</a>
              <a href="#">Accessibility</a>
            </div>
            <p>© Visit Valiyaparamba</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
