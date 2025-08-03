export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  price: number;
  rating: number;
  experience: number;
  availableDate: string;
  timeSlot: string;
  image: string;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}