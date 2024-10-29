import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarForm from './CalendarForm'
import { Button } from 'react-bootstrap';
import './Calendar.css'
import { useEffect } from 'react';
import { useCollection } from '../../Hook/useCollection';
import CalendarEditForm from './CalendarEditForm';
export default function CalendarEvent() {
  const [calendarForm, setCalendarForm] = useState(false)
  const [calendarEditForm, setCalendarEditForm] = useState(false)
  const {documents, error} = useCollection("events")
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    if (documents) {
      const formattedEvents = documents.map(doc => ({
        ...doc,
        id: doc.id,
        title: doc.title,
        date: doc.date,
        imageURL: doc.imageURL,
        description: doc.description,
        display: 'block',  // Add this to ensure full background color
        color: doc.color,
        textColor: doc.textColor,
        borderColor: doc.borderColor
      }));
      console.log('Formatted events:', formattedEvents); // Add this to debug
      setEvents(formattedEvents);
    }
  }, [documents]);

  

 

  const [selectedEvent, setSelectedEvent] = useState([]);

  //adding news events
  const handleDateClick = (info) => {
    setCalendarForm(true)

  }

  //editing existing events
  const handleEventClick = (info) => {
    setSelectedEvent({
      id: info.event.id,
      uid: info.event.extendedProps.uid,
      username: info.event.extendedProps.username,
      photoURL: info.event.extendedProps.photoURL,
      title: info.event.title,
      description: info.event.extendedProps.description,
      imageURL: info.event.extendedProps.imageURL,
      date: info.event.startStr,
    });
    setCalendarEditForm(true)
  };

  return (
    <div className='Calendar-body'>
      <Button className="custom-button" onClick={() => handleDateClick()}>Add Date</Button>
    
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
        eventDurationEditable={true}
        height={"80vh"}
        selectable={true}
        unselectAuto={true}
        selectMirror={true}
        dayMaxEvents={true}  
        views={{
          dayGridMonth: {
            dayMaxEvents: 3 
          }
        }}
        moreLinkClick="popover"  // for all non-TimeGrid views
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: "multiMonthYear, dayGridMonth, timeGridWeek, timeGridDay, listYear"
        }}
       
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />
      

        <CalendarForm 
          show={calendarForm}
          onHide={() => setCalendarForm(false)}
          name="Create"
        />
  
        <CalendarEditForm
          show={calendarEditForm}
          onHide={() => setCalendarEditForm(false)}
          name="Edit"
          selectedEvents={selectedEvent}
        />
 
    </div>
  );
}