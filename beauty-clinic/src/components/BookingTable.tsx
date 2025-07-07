import React, { useState } from "react";
import { Booking } from "../model";

interface BookingTableProps {
  startDate: Date;
  bookings: Booking[];
  onSelectSlot?: (info: {
    date: string;
    startSlot: number;
    endSlot: number;
    startTime: string;
    endTime: string;
  }) => void;
  role?: "client" | "clinician";
}

const getDateLabel = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


const halfHourSlots = Array.from({ length: 30 }, (_, i) => {
  const startMinutes = 8 * 60 + i * 30;
  const endMinutes = startMinutes + 30;

  const formatTime = (minutes: number) => {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  return {
    startTime: formatTime(startMinutes),
    endTime: formatTime(endMinutes),
    index: i,
  };
});


export const BookingTable: React.FC<BookingTableProps> = ({
  startDate,
  bookings,
  onSelectSlot,
  role = "client",
}) => {
  const today = new Date();

  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{
    date: string;
    slotIndex: number;
    slotStartTime: string;
  } | null>(null);
  const [dragEnd, setDragEnd] = useState<{
    slotIndex: number;
    slotEndTime: string;
  } | null>(null);
  const [calendarStartDate, setCalendarStartDate] = useState<Date>(today); // Controlled by parent prop

  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  maxDate.setHours(0, 0, 0, 0);

  const canGoPrev = role === "clinician" || calendarStartDate > today;
  const canGoNext = calendarStartDate < maxDate;

  const prevWeek = () => {
    if (canGoPrev) {
      const prev = new Date(calendarStartDate);
      prev.setDate(calendarStartDate.getDate() - 7);
      setCalendarStartDate(prev);
    }
  };

  const nextWeek = () => {
    if (canGoNext) {
      const next = new Date(calendarStartDate);
      next.setDate(calendarStartDate.getDate() + 7);
      setCalendarStartDate(next);
    }
  };

  const getDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(calendarStartDate);
      date.setDate(calendarStartDate.getDate() + i);
      return date;
    });
  };
  

  return (
    <div className="table-container">
      <div className="calendar-header">
        <button className="btn" onClick={prevWeek} disabled={!canGoPrev}>
          ← Prev
        </button>
        <strong>
          {getDateLabel(calendarStartDate)} to{" "}
          {getDateLabel(new Date(calendarStartDate.getTime() + 6 * 86400000))}
        </strong>

        <button className="btn" onClick={nextWeek} disabled={!canGoNext}>
          Next →
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            {getDays().map((d) => (
              <th key={d.toISOString()}>{getDateLabel(d)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {halfHourSlots.map((slot) => (
            <tr key={slot.index}>
              <td>
              { `${slot.startTime} - ${slot.endTime}`}
              </td>
              {getDays().map((day) => {
                const dateLabel = getDateLabel(day);
                const slotStart = new Date(day);
                slotStart.setHours(
                  8 + Math.floor(slot.index / 2),
                  (slot.index % 2) * 30
                );
                const slotEnd = new Date(slotStart.getTime() + 30 * 60000);

                const isSlotBooked = bookings.some((booking) => {
                  const bookingStart = new Date(booking.dateTimeStart);
                  const bookingEnd = new Date(booking.dateTimeEnd);
                  return bookingStart < slotEnd && bookingEnd > slotStart;
                });

                const isSelected =
                  dragging &&
                  dragStart &&
                  dragStart.date === dateLabel &&
                  dragEnd !== null &&
                  slot.index >= Math.min(dragStart.slotIndex, dragEnd?.slotIndex) &&
                  slot.index <= Math.max(dragStart.slotIndex, dragEnd?.slotIndex);

                const cellProps =
                  role === "client" && !isSlotBooked
                    ? {
                        onMouseDown: () => {
                          setDragging(true);
                          setDragStart({
                            date: dateLabel,
                            slotIndex: slot.index,
                            slotStartTime: slot.startTime
                          });
                          setDragEnd({slotIndex : slot.index, slotEndTime: slot.endTime});
                        },
                        onMouseOver: () => {
                          if (
                            dragging &&
                            dragStart &&
                            dragStart.date === dateLabel
                          ) {
                            setDragEnd({slotIndex : slot.index, slotEndTime: slot.endTime});
                          }
                        },
                        onMouseUp: () => {
                          if (
                            dragStart &&
                            dragEnd !== null &&
                            Math.abs(dragEnd?.slotIndex - dragStart.slotIndex) >= 1 &&
                            onSelectSlot
                          ) {
                            onSelectSlot({
                              date: dragStart.date,
                              startSlot: Math.min(dragStart.slotIndex, dragEnd?.slotIndex),
                              endSlot: Math.max(dragStart.slotIndex, dragEnd?.slotIndex),
                              startTime: dragStart.slotStartTime,
                              endTime: dragEnd.slotEndTime,
                            });
                          }
                          setDragging(false);
                          setDragStart(null);
                          setDragEnd(null);
                        },
                      }
                    : {};

                return (
                  <td
                    key={`${dateLabel}_${slot.index}`}
                    className={
                      isSelected
                        ? "selected"
                        : isSlotBooked
                        ? "booked"
                        : "available"
                    }
                    {...cellProps}
                  >
                    {isSelected ? "Selected" : isSlotBooked ? "Booked" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
