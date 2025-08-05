import React, { useEffect, useState } from "react";
import { BookingTable } from "../components";
import { customFetch } from "../services/customFetch";
import { Title, Clinician, Booking } from "../model";

export const BookingTreatment = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedClinicianID, setSelectedClinicianID] = useState<number | null>(
    null
  );
  const [clinicians, setClinicians] = useState<Clinician[]>([]);
  const [titles, setTitles] = useState<Title[]>([]);
  const [selectedTitleId, setSelectedTitleId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [mobileNumberTemp, setMobileNumberTemp] = useState<string>("");

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

  async function fetchSchedule() {
    try {
      setLoading(true);
      const data = await customFetch(`api/appointments/${selectedClinicianID}`);
      if (data.status === 200) {
        setBookedSlots(data);
      } else {
        setBookedSlots([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedClinicianID) fetchSchedule();
  }, [selectedClinicianID]);

  async function submitBooking() {
    try {
      if (bookingDetails) {
        const dateTimeStart = `${bookingDetails.date}T${bookingDetails.startTime}:00`;
        const dateTimeEnd = `${bookingDetails.date}T${bookingDetails.endTime}:00`;

        const appointmentDTO = {
          clinicianID: selectedClinicianID,
          clientNumber: mobileNumber,
          dateTimeStart,
          dateTimeEnd,
          comments: bookingDetails.comments,
        };
        const data = await customFetch(
          "api/appointments",
          appointmentDTO,
          "PUT"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      fetchSchedule();
    }
  }

  function validateMobile(mobile: string): void {
    if (mobile.length === 10 && mobile.startsWith("04")) {
      setMobileNumber(mobile);
    }
  }

  return (
    <div className="booking-treatment-main-div">
      <h2>Book Appointment</h2>
      <div className="booking-instruction-div">
        {!mobileNumber ? (
          <div>
            <div className="label-input-div">
              <label>
                Please begin by entering your mobile number starting with 04:
              </label>
              <input onChange={(e) => setMobileNumberTemp(e.target.value)} />
              <br />
              <button
                className="btn form-btn"
                disabled={mobileNumberTemp.length !== 10}
                onClick={() => validateMobile(mobileNumberTemp)}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <div className="label-input-div">
            <input value={mobileNumber} className="text-centre" />
          </div>
        )}
      </div>
      {mobileNumber && (
        <div>
          <p className="text-centre">
            To make a booking, please select the type of therapist/clinician you
            would like to book. Next, choose a specific therapist by name. Once
            selected, click on an available time slot in the table, then click
            and drag downward to extend the booking duration. Please note that
            the minimum booking time is one hour; equivalent to two time slots.
          </p>
          <br />
          <select
            value={selectedTitleId ? selectedTitleId : ""}
            onChange={(e) => setSelectedTitleId(parseInt(e.target.value, 10))}
          >
            <option value="">Select Clinician Type</option>
            {titles.map((c, index) => (
              <option key={index + "-clinicianType"} value={c.ID}>
                {c.name}
              </option>
            ))}
          </select>

          {selectedTitleId && (
            <select
              value={selectedClinicianID ? selectedClinicianID : ""}
              onChange={(e) => {
                setSelectedClinicianID(parseInt(e.target.value, 10));
              }}
            >
              <option value="">Select a Clinician</option>
              {clinicians
                .filter((c) => c.titleID === selectedTitleId)
                .map((c, index) => (
                  <option key={index + "-clinician"} value={c.ID}>
                    {c.name}
                  </option>
                ))}
            </select>
          )}

          {selectedClinicianID && (
            <BookingTable
              startDate={startDate}
              bookings={bookedSlots}
              onSelectSlot={(info) => {
                setBookingDetails({ ...info, comments: "" });
                console.log(info);
                setShowModal(true);
              }}
              role="client"
            />
          )}

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
                    submitBooking();
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
      )}
    </div>
  );
};
