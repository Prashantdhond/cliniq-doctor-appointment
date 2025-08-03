import React, { useState } from 'react';
import { Calendar, Clock, Phone, User, FileText, CheckCircle } from 'lucide-react';
import { Doctor, BookingFormData } from '../types';

interface BookingFormProps {
  selectedDoctor: Doctor | null;
  onBookingComplete: (bookingData: BookingFormData & { doctorId: string }) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ selectedDoctor, onBookingComplete }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phoneNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDoctor) {
      onBookingComplete({
        ...formData,
        doctorId: selectedDoctor.id
      });
      setShowConfirmation(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
        setFormData({
          fullName: '',
          phoneNumber: '',
          appointmentDate: '',
          appointmentTime: '',
          reason: ''
        });
      }, 2500);
    }
  };

  if (showConfirmation) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600">
            Your appointment with {selectedDoctor?.name} has been successfully booked.
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-green-800 mb-2">Appointment Details</h3>
          <p className="text-green-700 text-sm">
            <strong>Doctor:</strong> {selectedDoctor?.name}<br />
            <strong>Date:</strong> {formData.appointmentDate}<br />
            <strong>Time:</strong> {formData.appointmentTime}<br />
            <strong>Patient:</strong> {formData.fullName}
          </p>
        </div>
        
        <p className="text-blue-600 font-medium">
          You will receive a confirmation SMS shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Details</h2>
        
        {selectedDoctor && (
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg mb-6">
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
              <p className="text-blue-600 text-sm">{selectedDoctor.specialty}</p>
              <p className="text-gray-600 text-sm">Fee: ₹{selectedDoctor.consultationFee}</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit *
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Brief description of your concern"
              required
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedDoctor}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookingForm;