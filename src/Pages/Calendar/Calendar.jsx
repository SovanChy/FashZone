import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.css'

export default function CalendarEvent() {
 
  const [events, setEvents] = useState([
    { title: 'event 1', start: '2024-10-01', end: '2024-10-10', },
    { title: 'event 2', date: '2024-10-12',  end: '2024-10-10', },
    {title: 'job', description: 'Job offer for this week', date: '2024-10-17', end: '2024-10-17'}
  ]);


  return (
    <div className='Calendar-body'>

      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          multiMonthPlugin,
          interactionPlugin
        ]}
        initialView={'dayGridMonth'}
        events={events}
        editable={true}
        eventBackgroundColor='black'
        eventTextColor="white"
        eventBorderColor='black'
        eventDurationEditable={true}
        height={"80vh"}
        headerToolbar={
          {
            start: 'today prev,next',
            center: 'title',
            end: "multiMonthYear, dayGridMonth, timeGridWeek, timeGridDay, listYear"
          }
        }
        eventClick={(info) => {
          alert(
            'Event: ' + info.event.title + " " + 
            'Description: ' + info.event.description,
          );
          
        }}


      />
    </div>
  );
}