import EventsWrapper from './components/EventsWrapper'
import Filter from './components/Filter/Filter'
import EventsGalleries from './components/EventsGalleries'

import { fetchEvents } from '../../../../utils/fetch'

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