import React from 'react';
import { Star, Calendar, Clock } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-4 border-blue-100">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-blue-600 font-medium mb-1">{doctor.specialty}</p>
        <p className="text-gray-500 text-sm">{doctor.location}</p>
      </div>

      <div className="flex justify-center mb-4">
        <span className="text-2xl font-bold text-green-600">₹{doctor.price}</span>
      </div>

      <div className="flex items-center justify-center space-x-1 mb-4">
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700 ml-1">
            {doctor.rating}/5
          </span>
        </div>
        <span className="text-gray-300">•</span>
        <span className="text-sm text-gray-600">{doctor.experience} yrs exp</span>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Available Date: {formatDate(doctor.availableDate)}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Time Slot: {doctor.timeSlot}</span>
        </div>
      </div>

      <button
        onClick={() => onBookAppointment(doctor)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;