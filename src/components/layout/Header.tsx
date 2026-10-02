import React, { useState, useEffect } from 'react';
import { Phone, Clock, MapPin, Menu } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 bg-white py-4 md:py-6 border-b border-gray-200 mb-8 z-40 transition-shadow duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            <div className="flex items-center gap-3 text-left">
              <Logo size={52} className="flex-shrink-0" />
              <div>
                <h1
                  className="text-2xl md:text-3xl text-[#2c3e50] leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 600 }}
                >
                  Lic. Natalia Domecq
                </h1>
                <p className="text-sm text-gray-600 tracking-[0.12em]">Lic en Psicología</p>
              </div>
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-[#1FA7DA] hover:bg-[#178bb8] text-white rounded transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Header Widgets */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-4 lg:gap-5">
            {/* Icon Box - Dirección */}
            <div className="icon-box text-left">
              <MapPin className="w-10 h-10 text-[#dddddd] flex-shrink-0" />
              <div className="icon-box__text">
                <h4 className="icon-box__title">Bahía Blanca</h4>
                <span className="icon-box__subtitle">Buenos Aires, Argentina</span>
              </div>
            </div>

            {/* Icon Box - Horario */}
            <div className="icon-box text-left">
              <Clock className="w-10 h-10 text-[#dddddd] flex-shrink-0" />
              <div className="icon-box__text">
                <h4 className="icon-box__title">Lunes a Viernes de 8 a 19 hs</h4>
                {/* <span className="icon-box__subtitle">Sábados con turno</span> */}
              </div>
            </div>

            {/* Phone Button */}
            <a 
              href="https://wa.me/5492916433000" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !flex !flex-row items-center gap-2"
              style={{ borderRadius: '32px' }}
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">+54 9 291 643-3000</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
