import EventsWrapper from './components/EventsWrapper'
import Filter from './components/Filter/Filter'
import EventsGalleries from './components/EventsGalleries'

async function fetchEvents() {
   
   const URL = process.env.URL

   const events = await fetch(URL + "/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   return events.data
}

export default async function Events() {

   const events = await fetchEvents()

   return (
      <div className="container">
         <EventsWrapper>
            <Filter events={events} />
            <EventsGalleries events={events} />
         </EventsWrapper>
      </div>
   )
}