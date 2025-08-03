import React from 'react';
import { Star, User } from 'lucide-react';
import { Doctor } from '../types';
import { mockDoctors } from '../data/mockData';

interface DoctorSelectionProps {
  selectedDoctor: Doctor | null;
  onSelectDoctor: (doctor: Doctor) => void;
}

const DoctorSelection: React.FC<DoctorSelectionProps> = ({ selectedDoctor, onSelectDoctor }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Select a Doctor</h2>
        <p className="text-gray-600">Choose from our experienced healthcare professionals</p>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {mockDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => onSelectDoctor(doctor)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedDoctor?.id === doctor.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {selectedDoctor?.id === doctor.id && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 text-sm">{doctor.specialty}</p>
                
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{doctor.experience} years experience</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{doctor.rating}/5.0 rating</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-900">
                    ₹{doctor.consultationFee} consultation fee
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSelection;