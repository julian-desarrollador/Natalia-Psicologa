import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Special case for Contacto - scroll to bottom
    if (targetId === 'contacto') {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }
    
    // Special case for Inicio - scroll to top
    if (targetId === 'inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Get element position and add offset based on section
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      let offset = 100; // Default offset
      
      // Customize offset per section (same as sidebar)
      switch (targetId) {
        case 'sobre-mi':
          offset = 210; // Un poco más arriba
          break;
        case 'servicios':
          offset = 120; // Un poco más arriba
          break;
        case 'blog':
          offset = 80; // Un poco más abajo
          break;
        case 'faq':
          offset = 130; // Perfecto como está
          break;
        default:
          offset = 130;
      }
      
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <footer className="footer" id="contacto">
      {/* Footer Top */}
      <div className="footer-top">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* About */}
            <div>
              <h6 className="footer-top__headings">Sobre esta web</h6>
              <div className="text-sm text-gray-600 leading-relaxed">
                <p className="mb-3">
                  Este espacio está dedicado a compartir información profesional y 
                  confiable sobre salud mental. Mi objetivo es ofrecer una perspectiva 
                  basada en la evidencia y la experiencia clínica.
                </p>
                <a href="#sobre-mi" onClick={(e) => handleSmoothScroll(e, 'sobre-mi')} className="read-more">CONOCER MÁS</a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h6 className="footer-top__headings">Navegación</h6>
              <ul className="space-y-2">
                <li>
                  <a href="#inicio" onClick={(e) => handleSmoothScroll(e, 'inicio')} className="text-sm text-gray-600 hover:text-[#1FA7DA] transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#sobre-mi" onClick={(e) => handleSmoothScroll(e, 'sobre-mi')} className="text-sm text-gray-600 hover:text-[#1FA7DA] transition-colors">
                    Sobre Mí
                  </a>
                </li>
                <li>
                  <a href="#servicios" onClick={(e) => handleSmoothScroll(e, 'servicios')} className="text-sm text-gray-600 hover:text-[#1FA7DA] transition-colors">
                    Acompañamiento
                  </a>
                </li>
                <li>
                  <a href="#blog" onClick={(e) => handleSmoothScroll(e, 'blog')} className="text-sm text-gray-600 hover:text-[#1FA7DA] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="text-sm text-gray-600 hover:text-[#1FA7DA] transition-colors">
                    Preguntas Frecuentes
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h6 className="footer-top__headings">Contacto</h6>
              <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                <div>
                  <p className="font-semibold text-[#2c3e50] mb-1">Ubicación</p>
                  <p>Bahía Blanca, Buenos Aires<br/>Argentina</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2c3e50] mb-1">Horario de atención</p>
                  <p>Lunes a Viernes: 8:00 a 19:00 hs {/* <br/>Sábados con turno previo  */}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#2c3e50] mb-1">Contacto</p>
                  <a 
                    href="https://wa.me/5492916433000" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-[#1FA7DA] hover:bg-[#178bb8] text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    +54 9 291 643-3000
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Logo */}
            <div className="flex items-center gap-2 text-lg font-bold text-[#2c3e50]">
              <Logo size={36} className="flex-shrink-0" />
              Lic. Natalia Domecq
            </div>
            
            {/* Copyright & Description */}
            <div className="text-sm text-gray-500 text-center md:text-right">
              <p>Lic en Psicología</p>
              <p className="text-xs mt-1">© {new Date().getFullYear()} - Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
