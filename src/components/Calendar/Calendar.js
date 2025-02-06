import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './Calendar.css';

function Calendar() {
  return (
    <div>
      <Header />
      <CalendarWidget />
    </div>
  );
}

export default Calendar;

export function CalendarWidget() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const webAppUrl = "https://script.google.com/macros/s/AKfycbyhbdnNxDDsu_oO2ZB7q1SobCeakhKedUKdWae7CEVhAywsYTGKZZbEZldGlo5vyhgH-Q/exec"; // Replace with your URL

  useEffect(() => {
    fetch(webAppUrl)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          console.log(data);

          const formattedDates = data.map(dateString => {
            const date = new Date(dateString['start']);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return { year: year, month: month, day: day };
          })
          setCalendarEvents(formattedDates);
        } else {
          console.error("Error: Invalid data received from server:", data);
          // Handle the error, e.g., display a message to the user
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Handle the error
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      {calendarEvents.map((date, index) => (
        <EventCard events={date} />
      ))}

    </div>
  )
}

function EventCard({ events }) {
  return (
    <div className='Event-card'>
      <div className='Event-card-content'>
        <div className='Event-card-date'>
          <h3 className='margin-0'>{getMonthName(Number(events.month))}</h3>
          <h2 className='margin-0'>{events.day}</h2>
        </div>
        <div style={{ marginLeft: "12px" }}>
          <h1>{events.year}</h1>
        </div>
      </div>
    </div>
  )
}

function getMonthName(monthNum) {
  console.log(monthNum);

  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];

  if (1 <= monthNum && monthNum <= 12) {
    return months[monthNum - 1];
  } else {
    return "N/A";
  }
}