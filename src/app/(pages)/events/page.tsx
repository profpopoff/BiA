import styles from './Events.module.scss'
import { quarterArray } from "../../../utils/divideArray"
import Gallery from "../../components/Gallery/Gallery"
import Filter from './components/Filter/Filter'
import { fetchEvents } from '../../../utils/fetch'

export default async function Events() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <Filter events={data} />
            <div className={styles.galleries}>
               {quarterArray(data
                  .slice(0, 4 * Math.floor((data.length - 2) / 4) + 2)) // Арифметическая последовательность 6,10,14,18,22... (чтобы паралакс был красивым)
                  .map((events, index: number) => <Gallery key={index} events={events} />)}
            </div>
         </div>
      </div>
   )
}