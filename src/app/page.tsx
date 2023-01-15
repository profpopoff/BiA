import Link from 'next/link'
import { countOff } from '../utils/divideArray'
import { fetchEvents } from '../utils/fetch'
import Gallery from './components/Gallery/Gallery'
import HomePageGalleries from './components/HomePageGalleries'
import styles from './HomePage.module.scss'

export default async function HomePage() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <HomePageGalleries events={data} />
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