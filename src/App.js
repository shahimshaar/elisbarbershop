import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, MapPin, Mail, Phone, Calendar, Scissors, ChevronRight, Clock } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Favicon as a base64 encoded SVG
  const favicon = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✂️</text></svg>";
  
  // Use a useEffect hook to safely manipulate the document head after component renders
  useEffect(() => {
    let link = document.head.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = favicon;
    
    // Cleanup function (optional for a single-page app, but good practice)
    return () => {
      // document.head.removeChild(link);
    };
  }, [favicon]); // Re-run effect if favicon changes

  // Dummy data for the site
  const barbershopName = "Eli's Barbershop";
  const dummyInfo = {
    address: '123 Main Street, Anytown, USA 12345',
    phone: '(555) 123-4567',
    email: 'hello@elisbarbershop.com',
    instagram: 'elisbarbershop',
    bookingLink: 'https://booksy.com/en-us/1132493_elis-barbershop-of-galesburg_barber-shop_18668_galesburg?hl=en-US&gei=IYGfaK7kArqjptQPvo_i6Qg&rwg_token=ACgRB3cAikIcuGtwuba1VPgaXGAuE6P2vh6yvZ5NLM4adziAkfqt_ZwTDY8PH51SN_hpqEeZw6_p21y0EyL7Ox9dBJ7hLtX_5A%3D%3D#ba_s=seo',
    mapsIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2818619934444!2d-73.98774848459424!3d40.74844047932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25968bb03b715%3A0x6b49e0c1f2f0b73c!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628183184643!5m2!1sen!2sus',
    hours: "Mon - Fri: 9am - 7pm | Sat: 10am - 5pm | Sun: Closed"
  };

  // Gallery images with dummy placeholders
  const galleryImages = [
    'https://placehold.co/800x600/000000/FFFFFF?text=Modern+Cut',
    'https://placehold.co/800x600/000000/FFFFFF?text=Classic+Shave',
    'https://placehold.co/800x600/000000/FFFFFF?text=Styled+Haircut'
  ];

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'booking', name: 'Booking' },
    { id: 'contact', name: 'Contact' }
  ];

  const handleScrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const NavItem = ({ section }) => (
    <a
      href={`#${section.id}`}
      onClick={(e) => {
        e.preventDefault();
        handleScrollToSection(section.id);
      }}
      className="px-3 py-2 rounded-full text-white hover:bg-gray-700 transition-colors"
    >
      {section.name}
    </a>
  );

  return (
    <div className="bg-gray-900 text-gray-100 font-sans leading-relaxed">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-wide text-white">
            {barbershopName}
          </a>
          <nav className="hidden md:flex space-x-4">
            {sections.map(section => (
              <NavItem key={section.id} section={section} />
            ))}
          </nav>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-900`}>
          <nav className="flex flex-col items-center py-4 space-y-2">
            {sections.map(section => (
              <NavItem key={section.id} section={section} />
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative h-screen flex items-center justify-center text-center px-4 py-20 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/1a202c/F0F0F0?text=Hero+Image')" }}>
          <div className="absolute inset-0 bg-gray-900 opacity-60"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              The Art of the Cut.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Experience a blend of classic techniques and modern styles. Our commitment is to give you a look that defines you.
            </p>
            <a href="#booking" className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105">
              Book an Appointment <ChevronRight size={20} className="ml-2" />
            </a>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A glimpse into the styles and precision we bring to every client. Our passion is in the details.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((src, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                <img
                  src={src}
                  alt={`Barbershop work sample ${index + 1}`}
                  className="w-full h-80 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Booking & Services Section */}
        <section id="booking" className="bg-gray-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-4">Ready for a Fresh Look?</h2>
              <p className="text-gray-400 mb-8">
                Our team is ready to provide you with the perfect haircut, shave, or style. Book your appointment now for a personalized experience.
              </p>
              <a href={dummyInfo.bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-10 py-4 bg-white text-gray-900 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105">
                <Calendar size={20} className="mr-2" /> Book Now
              </a>
            </div>
          </div>
        </section>

        {/* Contact & Google Maps Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">Get in Touch</h2>
              <div className="space-y-6 text-gray-400">
                <div className="flex items-center">
                  <MapPin size={24} className="text-red-600 mr-4" />
                  <p>{dummyInfo.address}</p>
                </div>
                <div className="flex items-center">
                  <Phone size={24} className="text-red-600 mr-4" />
                  <p>{dummyInfo.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail size={24} className="text-red-600 mr-4" />
                  <p>{dummyInfo.email}</p>
                </div>
                <div className="flex items-center">
                  <Instagram size={24} className="text-red-600 mr-4" />
                  <p>@{dummyInfo.instagram}</p>
                </div>
                <div className="flex items-center">
                  <Clock size={24} className="text-red-600 mr-4" />
                  <p>{dummyInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden shadow-lg h-96 lg:h-full">
              <iframe
                src={dummyInfo.mapsIframe}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 py-8 text-center text-gray-500">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} {barbershopName}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
