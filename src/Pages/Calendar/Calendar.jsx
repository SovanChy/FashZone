import React, { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarForm from './CalendarForm'
import './Calendar.css'
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useCollection } from '../../Hook/useCollection';
export default function CalendarEvent() {
  const [calendarForm, setCalendarForm] = useState(false)
  const {documents, error} = useCollection('events')
 
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    if (documents) {
      const formattedEvents = documents.map(doc => ({
        ...doc,
        title: doc.title,
        start: doc.start,
        end: doc.end,
        description: doc.description
      }));
      setEvents(formattedEvents);
      console.log(formattedEvents);
    }
  }, [documents]);


 

  return (
    <div className='Calendar-body'>
      <Button onClick={() => setCalendarForm(true)}>Add Calendar</Button>
    
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
        selectable={true}
        unselectAuto={true}
        selectMirror={true}
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
      

      <CalendarForm 
      show={calendarForm}
      onHide={() => setCalendarForm(false)}
      name="Create"
      events={events}/>

      
    </div>
  );
}