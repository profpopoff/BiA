import styles from './HomePage.module.scss'
import HomePageGalleries from './components/HomePageGalleries'
import CustomLink from './components/CustomLink/CustomLink'

async function fetchEvents() {

   const URL = process.env.URL

   const events = await fetch(URL + "/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   return events.data
}

export default async function HomePage() {

   const events = await fetchEvents()

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <HomePageGalleries events={events} />
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
         <CustomLink href="/about">
            <span className={styles.missionLink}>Подробнее</span>
         </CustomLink>
      </div>
   </article>
)