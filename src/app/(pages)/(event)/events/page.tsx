import Filter from './components/Filter/Filter'
import { fetchEvents } from '../../../../utils/fetch'
import EventsGalleries from './components/EventsGalleries'
import EventsWrapper from './components/EventsWrapper'

export default async function Events() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <EventsWrapper>
            <Filter events={data} />
            <EventsGalleries events={data} />
         </EventsWrapper>
      </div>
   )
}