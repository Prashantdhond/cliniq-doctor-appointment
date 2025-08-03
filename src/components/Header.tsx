import React from 'react';

interface HeaderProps {
  currentPage: 'doctors' | 'booking' | 'appointments';
  onNavigate: (page: 'doctors' | 'booking' | 'appointments') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src="/cliniq-logo.jpg" alt="Cliniq Logo" width={40} height={40} className="w-10 h-10" />
        <div className="text-[#0b2c53] text-xl font-bold">CLINIQ</div>
      </div>
      
      <div className="space-x-6">
        <button
          onClick={() => onNavigate('doctors')}
          className={`hover:text-blue-500 transition-colors ${
            currentPage === 'doctors' ? 'text-blue-500 font-medium' : 'text-gray-700'
          }`}
        >
          Doctor List
        </button>
        <button
          onClick={() => onNavigate('booking')}
          className={`hover:text-blue-500 transition-colors ${
            currentPage === 'booking' ? 'text-blue-500 font-medium' : 'text-gray-700'
          }`}
        >
          Booking
        </button>
        <button
          onClick={() => onNavigate('appointments')}
          className={`hover:text-blue-500 transition-colors ${
            currentPage === 'appointments' ? 'text-blue-500 font-medium' : 'text-gray-700'
          }`}
        >
          Appointments
        </button>
        <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Profile</a>
        <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">Doctor Portal</a>
      </div>
    </nav>
  );
};

export default Header;