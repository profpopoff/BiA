import styles from './Events.module.scss'
import { quarterArray } from "../../../../utils/divideArray"

import Filter from './components/Filter/Filter'
import { fetchEvents } from '../../../../utils/fetch'
import EventsGalleries from './components/EventsGalleries'

export default async function Events() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <Filter events={data} />
            <EventsGalleries events={data} />
         </div>
      </div>
   )
}