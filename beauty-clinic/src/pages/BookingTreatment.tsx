import React, { useEffect, useState } from "react";
import { BookingTable } from "../components";
import { customFetch } from "../services/customFetch";
import { Title, Clinician, Booking } from "../model";

export const BookingTreatment = () => {

// const fake: Booking[] = [
//   {
//     ID: 'BKG001',
//     clinicianID: 22234,
//     clientID: 58234,
//     dateTimeStart: '2025-07-04T08:00:00.000',
//     dateTimeEnd: '2025-07-04T09:30:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG002',
//     clinicianID: 22234,
//     clientID: 45321,
//     dateTimeStart: '2025-07-04T10:00:00.000',
//     dateTimeEnd: '2025-07-04T12:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG003',
//     clinicianID: 22234,
//     clientID: 91234,
//     dateTimeStart: '2025-07-04T14:00:00.000',
//     dateTimeEnd: '2025-07-04T15:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG004',
//     clinicianID: 22234,
//     clientID: 48291,
//     dateTimeStart: '2025-07-06T09:30:00.000',
//     dateTimeEnd: '2025-07-06T11:30:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG005',
//     clinicianID: 22234,
//     clientID: 34982,
//     dateTimeStart: '2025-07-06T13:00:00.000',
//     dateTimeEnd: '2025-07-06T14:30:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG006',
//     clinicianID: 22234,
//     clientID: 75019,
//     dateTimeStart: '2025-07-06T15:00:00.000',
//     dateTimeEnd: '2025-07-06T16:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG007',
//     clinicianID: 22234,
//     clientID: 19374,
//     dateTimeStart: '2025-07-07T08:30:00.000',
//     dateTimeEnd: '2025-07-07T10:30:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG008',
//     clinicianID: 22234,
//     clientID: 57013,
//     dateTimeStart: '2025-07-07T11:00:00.000',
//     dateTimeEnd: '2025-07-07T12:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG009',
//     clinicianID: 22234,
//     clientID: 68512,
//     dateTimeStart: '2025-07-07T13:30:00.000',
//     dateTimeEnd: '2025-07-07T15:30:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG010',
//     clinicianID: 22234,
//     clientID: 43258,
//     dateTimeStart: '2025-07-08T09:00:00.000',
//     dateTimeEnd: '2025-07-08T11:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG011',
//     clinicianID: 22234,
//     clientID: 80724,
//     dateTimeStart: '2025-07-08T12:30:00.000',
//     dateTimeEnd: '2025-07-08T14:00:00.000',
//     comments: '',
//   },
//   {
//     ID: 'BKG012',
//     clinicianID: 22234,
//     clientID: 27583,
//     dateTimeStart: '2025-07-08T15:00:00.000',
//     dateTimeEnd: '2025-07-08T17:00:00.000',
//     comments: '',
//   },
// ];


  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number>(0);
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedTitleId, setSelectedTitleId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookedSlots, setBookedSlots] = useState<Booking[]>([]);
  const [startDate, setStartDate] = useState<Date>(today);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<{
    date: string;
    startSlot: number;
    endSlot: number;
    comments: string;
    startTime: string;
    endTime: string;
  } | null>(null);


  useEffect(() => {
    async function fetchTitles() {
      try {
        const data = await customFetch("api/titles");
        if (data.status === 200) {
          setTitles(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTitles();
  }, []);

  useEffect(() => {
    async function fetchClinicians() {
      try {
        const data = await customFetch("api/clinicians");
        if (data.status === 200) {
          setClinicians(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchClinicians();
  }, []);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        setLoading(true);
        const data = await customFetch(`api/clinicians/${selectedClinicianID}`);
        if (data.status === 200) {
          setBookedSlots(data);
        }
        else {
          setBookedSlots([]);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchSchedule();
  }, [selectedClinicianID]);

  async function submitBookings() {
    // send info to backend
    // check if booking can be done
    // loading
    // return
    // refetch data
    // setBookingDetails(null);

  }

  return (
    <div className="booking-treatment-main-div">
      <h2>Book Appointment</h2>
      <select
        value={selectedTitleId}
        onChange={(e) => setSelectedTitleId(parseInt(e.target.value, 10))}
      >
        <option value="">Select Clinician Type</option>
        {titles.map((c, index) => (
          <option key={index + "-clinicianType"} value={c.ID}>
            {c.name}
          </option>
        ))}
      </select>

      {selectedTitleId && <select
        value={selectedClinicianID}
        onChange={(e) =>{ setSelectedClinicianID(parseInt(e.target.value, 10))}}
      >
        <option value="">Select a Clinician</option>
        {clinicians
          .filter((c) => c.titleID === selectedTitleId)
          .map((c, index) => (
            <option key={index + "-clinician"} value={c.ID}>
              {c.name}
            </option>
          ))}
      </select>}

      {selectedClinicianID && <BookingTable
        startDate={startDate}
        bookings={bookedSlots}
        onSelectSlot={(info) => {
          setBookingDetails({ ...info, comments: "" });
          console.log(info);
          setShowModal(true);
        }}
        role="client"
      />}

      {showModal && bookingDetails && (
        <div className="modal">
          <h3>Confirm Booking</h3>
          <p>
            Date: {bookingDetails.date} <br />
            From slot {bookingDetails.startTime} to {bookingDetails.endTime}
          </p>
          <textarea
            value={bookingDetails.comments}
            onChange={(e) =>
              setBookingDetails((prev) =>
                prev ? { ...prev, comments: e.target.value } : null
              )
            }
            placeholder="Comments (optional)"
          />
          <div className="modal-buttons">
            <button
              onClick={() => {
                console.log("Booking confirmed:", bookingDetails);
                setShowModal(false);
                setBookingDetails(null);
              }}
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
