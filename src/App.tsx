import React, { useState } from 'react';
import { Doctor, Appointment, BookingFormData } from './types';
import Header from './components/Header';
import DoctorList from './components/DoctorList';
import BookAppointment from './components/BookAppointment';
import Appointments from './components/Appointments';

type PageType = 'doctors' | 'booking' | 'appointments';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('doctors');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('booking');
  };

  const handleBookingComplete = (bookingData: BookingFormData & { doctorId: string }) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      doctorId: bookingData.doctorId,
      patientName: bookingData.fullName,
      phoneNumber: bookingData.phoneNumber,
      appointmentDate: bookingData.appointmentDate,
      appointmentTime: bookingData.appointmentTime,
      reason: bookingData.reason,
      status: 'confirmed'
    };
    
    setAppointments(prev => [...prev, newAppointment]);
    
    // Navigate to appointments page after booking
    setTimeout(() => {
      setCurrentPage('appointments');
    }, 3000);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
  };
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    if (page !== 'booking') {
      setSelectedDoctor(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'doctors':
        return <DoctorList onBookAppointment={handleBookAppointment} />;
      case 'booking':
        return <BookAppointment preSelectedDoctor={selectedDoctor} onBookingComplete={handleBookingComplete} />;
      case 'appointments':
        return <Appointments appointments={appointments} onDeleteAppointment={handleDeleteAppointment} />;
      default:
        return <DoctorList onBookAppointment={handleBookAppointment} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}

export default App;