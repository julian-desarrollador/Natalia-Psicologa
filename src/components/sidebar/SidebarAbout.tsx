import React, { useState } from 'react';

const SidebarAbout: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<'nati1' | 'nati2'>('nati1');

  const academicTitles: string[] = [
    'Profesora de Psicología — Instituto Superior Juan XXIII (1997).',
    'Licenciada en Psicología — Universidad Católica de La Plata (2001).',
    'Especialización en Psicoanálisis con niños — Universidad de Ciencias Empresariales y Sociales, Buenos Aires (tesis en construcción).',
    'Diplomatura en Bioética y Familia — Universidad Católica de La Plata, Buenos Aires (2023).',
    'Maestría en Psicología Clínica y de la Salud — TECH Global University, Andorra, España (2025).',
    'Diplomatura Universitaria Internacional en Psicología de la Emergencia e Intervención con víctimas en crisis y desastres.',
  ];

  const toggleImage = () => {
    setCurrentImage(currentImage === 'nati1' ? 'nati2' : 'nati1');
  };

  return (
    <div className="widget widget-about-us bg-white border border-gray-200 rounded overflow-hidden mb-6">
      {/* Image */}
      <div className="relative">
        <img 
          src={currentImage === 'nati1' ? "https://res.cloudinary.com/dzoupwn0e/image/upload/v1761258760/Foto_Nati_nzkzsy.webp" : "https://res.cloudinary.com/dzoupwn0e/image/upload/v1761258760/Foto_Nati2_n3y9cu.webp"} 
          alt="Lic. Natalia Domecq - Psicóloga" 
          className="w-full h-64 object-cover cursor-pointer transition-opacity duration-300"
          onClick={toggleImage}
        />
        
        {/* Tag */}
        <a 
          href="#sobre-mi" 
          className="about-us__tag absolute top-4 left-4 bg-[#1FA7DA] hover:bg-[#178bb8] transition-colors"
        >
          M.P: 531, Lic en Psicología
        </a>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h5 className="about-us__name">Lic. Natalia Domecq</h5>
        <div className="about-us__description">
          <p className="about-us__lead">
            Licenciada en Psicología con sede en Bahía Blanca.
          </p>
          <ul className="about-us__titles" aria-label="Formación académica">
            {academicTitles.map((title) => (
              <li key={title} className="about-us__titlesItem">
                {title}
              </li>
            ))}
          </ul>
        </div>
        {/* <a
          href="/cv-natalia-domecq.pdf"
          download="CV-Natalia-Domecq.pdf"
          className="inline-flex items-center gap-2 bg-[#1FA7DA] hover:bg-[#178bb8] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm mt-2 cursor-pointer"
          aria-label="Descargar CV en PDF"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3a1 1 0 011 1v9.586l2.293-2.293a1 1 0 111.414 1.414l-4.001 4a1 1 0 01-1.412 0l-4-4a1 1 0 111.414-1.414L11 13.586V4a1 1 0 011-1z"></path>
            <path d="M5 15a1 1 0 011 1v2a1 1 0 001 1h10a1 1 0 001-1v-2a1 1 0 112 0v2a3 3 0 01-3 3H7a3 3 0 01-3-3v-2a1 1 0 011-1z"></path>
          </svg>
          Descargar CV (PDF)
        </a> */}
   {/*      <div className="mt-3">
          <a
            href="https://wa.me/5492916433000?text=Hola%20Natalia%2C%20tengo%20una%20consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:brightness-95 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            Escribime por WhatsApp
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarAbout;

