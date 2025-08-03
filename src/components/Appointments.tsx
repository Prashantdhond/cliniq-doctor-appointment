import React from 'react';
import { Calendar, Clock, User, Phone, Trash2 } from 'lucide-react';
import { Appointment } from '../types';
import { mockDoctors } from '../data/mockData';

interface AppointmentsProps {
  appointments: Appointment[];
  onDeleteAppointment: (appointmentId: string) => void;
}

const Appointments: React.FC<AppointmentsProps> = ({ appointments, onDeleteAppointment }) => {

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      onDeleteAppointment(appointmentId);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
          <p className="text-gray-600">View and manage your scheduled appointments</p>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => {
            const doctor = mockDoctors.find(d => d.id === appointment.doctorId);
            return (
              <div key={appointment.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {doctor ? (
                    <img 
                      src={doctor.image} 
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor?.name || 'Unknown Doctor'}</h3>
                    <p className="text-blue-600">{doctor?.specialty || 'General'}</p>
                    <p className="text-gray-600">Patient: {appointment.patientName}</p>
                    <p className="text-gray-500 text-sm">Reason: {appointment.reason}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{appointment.appointmentDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{appointment.appointmentTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{appointment.phoneNumber}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteAppointment(appointment.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Cancel Appointment"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No appointments scheduled.</p>
            <p className="text-gray-400 text-sm mt-2">Book an appointment to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;