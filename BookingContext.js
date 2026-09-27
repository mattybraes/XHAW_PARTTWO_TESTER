import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [details, setDetails] = useState({ name: '', phone: '', email: '' });
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [people, setPeople] = useState(1);
  const [bookingInfo, setBookingInfo] = useState({ date: '', time: '', emergencyContact: '' });
  const [reference, setReference] = useState(null);

  const togglePackage = (id) =>
    setSelectedPackages((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  const toggleActivity = (id) =>
    setSelectedActivities((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));

  const reset = () => {
    setSelectedPackages([]);
    setSelectedActivities([]);
    setPeople(1);
    setBookingInfo({ date: '', time: '', emergencyContact: '' });
    setReference(null);
  };

  return (
    <BookingContext.Provider
      value={{
        details,
        setDetails,
        selectedPackages,
        togglePackage,
        selectedActivities,
        toggleActivity,
        people,
        setPeople,
        bookingInfo,
        setBookingInfo,
        reference,
        setReference,
        reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);