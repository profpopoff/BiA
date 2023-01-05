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
                  .slice(0, 2 * Math.floor((data.length - 3) / 2) + 3), 2)
                  .map((events: any[], index: number) => <Gallery key={index} array={events} />)}
            </div>
            <Article />
         </div>
      </div>
   )
}

const Article = () => (
   <article className={styles.article}>
      <span className={styles.showOff}>Первый и&nbsp;крупнейший музей современного искусства <span>Санкт-Петербурга</span></span>
      <h1 className={styles.slogan}>
         <span className={styles.marginLeft}>мир велик</span>
         <span>и никто</span>
         <span className={styles.marginLeft}>в нем</span>
         <span>не лишний</span>
      </h1>
      <div className={styles.mission}>
         <p className={styles.missionDesc}>Наша задача&nbsp;&mdash; сделать все для того, чтобы человек, придя к&nbsp;нам, увидел, что современное искусство&nbsp;&mdash; о&nbsp;нем и&nbsp;для него.</p>
         <Link href="/about" className={styles.missionLink}>Подробнее</Link>
      </div>
   </article>
)