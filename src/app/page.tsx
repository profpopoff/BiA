import Link from 'next/link'
import { countOff } from '../utils/divideArray'
import { fetchEvents } from '../utils/fetch'
import Gallery from './components/Gallery/Gallery'
import styles from './HomePage.module.scss'

export default async function HomePage() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <div className={styles.galleries}>
               {countOff(data
                  .slice(0, 2 * Math.floor((data.length - 3) / 2) + 3), 2) // Арифметическая последовательность 1,3,5,7,9... (чтобы паралакс был красивым (стабильным))
                  .map((events: any[], index: number) => <Gallery key={index} events={events} />)}
            </div>
            <Article />
         </div>
      </div>
   )
}

export const Article = () => (
   <article className={styles.article}>
      <h1 className={styles.slogan}>
         <span className={styles.marginLeft}>мир велик</span>
         <span>и никто</span>
         <span className={styles.marginLeft}>в нем</span>
         <span>не лишний</span>
      </h1>
      <div className={styles.mission}>
         <p className={styles.missionDesc}>Наша задача — сделать все для того, чтобы человек, придя к нам, увидел, что современное искусство — о нем и для него.</p>
         <Link href="/about" className={styles.missionLink}>Подробнее</Link>
      </div>
   </article>
)