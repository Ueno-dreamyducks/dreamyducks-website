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
  const [calendarUpcomings, setCalendarUpcomings] = useState([]);
  const webAppUrl = "https://script.google.com/macros/s/AKfycbyhbdnNxDDsu_oO2ZB7q1SobCeakhKedUKdWae7CEVhAywsYTGKZZbEZldGlo5vyhgH-Q/exec"; // Replace with your URL

  useEffect(() => {
    fetch(webAppUrl)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          
          const today = new Date();
          var upComings = [];
          for (var i = 0; i < data.length; i++) {
            const date = new Date(data[i]['start']);
            const timeOfDate = date.toLocaleString([], {hour: '2-digit', minute: "2-digit"});

            console.log("time of date: " + timeOfDate);
            var year;
            var month;
            var day;

            if (today < date) {
              year = date.getFullYear();
              month = String(date.getMonth() + 1).padStart(2, '0');
              day = String(date.getDate()).padStart(2, '0');

              upComings.push({ year: year, month: month, day: day, time: timeOfDate, title: data[i]["title"] })
            }
          }
          setCalendarUpcomings(upComings);
        } else {
          console.error("Error: Invalid data received from server:", data);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []); 

  return (
    <div>
      {calendarUpcomings.map((data, index) => (
        <EventCard key={index} events={data} />
      ))}

    </div>
  )
}

function EventCard({ events }) {
  console.log("event month" + events.month)
  return (
    <div className='Event-card'>
      <div className='Event-card-content'>
        <div className='Event-card-date'>
          <h3 className='margin-0'>{getMonthName(Number(events.month))}</h3>
          <h2 className='margin-0'>{events.day}</h2>
        </div>
        <div style={{marginLeft: "12px" }}>
          <p>{events.time}</p>
        </div>
        <div style={{ marginLeft: "12px" }}>
          <h1>{events.title}</h1>
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