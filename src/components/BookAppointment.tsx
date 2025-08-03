import React, { useState } from 'react';
import { Doctor, BookingFormData } from '../types';
import DoctorSelection from './DoctorSelection';
import BookingForm from './BookingForm';

interface BookAppointmentProps {
  preSelectedDoctor?: Doctor;
  onBookingComplete: (bookingData: BookingFormData & { doctorId: string }) => void;
}

const BookAppointment: React.FC<BookAppointmentProps> = ({ preSelectedDoctor, onBookingComplete }) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(preSelectedDoctor || null);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Select a doctor and schedule your appointment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <DoctorSelection
              selectedDoctor={selectedDoctor}
              onSelectDoctor={setSelectedDoctor}
            />
          </div>
          
          <div>
            <BookingForm
              selectedDoctor={selectedDoctor}
              onBookingComplete={onBookingComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;