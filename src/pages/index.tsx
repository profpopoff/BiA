import { GetServerSideProps } from "next"
import { useRef, useState } from "react"

import { getEvents } from "./api/events"
import Event from "../interfaces/Event"
import { jsonParser } from "../utils/jsonParser"
import { countOff } from "../utils/divideArray"

import styles from '../style/pages/HomePage.module.scss'

import Layout from "../components/layout"
import CustomLink from "../components/CustomLink/CustomLink"
import Gallery from "../components/Gallery/Gallery"

function HomePage({ events }: { events: Event[] }) {

   const containerRef = useRef<HTMLDivElement>(null)

   const [selectedGallery, setSelectedGallery] = useState(0)

   return (
      <Layout>
         <div className={`container ${styles.homeContainer}`} ref={containerRef}>
            <div className={styles.galleries}>
               {countOff(events.slice(0, 9), 2)
                  .map((events: Event[], index: number) =>
                     <Gallery key={index} array={events} galleryIndex={index} container={containerRef} selectedGallery={selectedGallery} setSelectedGallery={setSelectedGallery} />)}
            </div>
            <Article />
         </div>
      </Layout>
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

export const getServerSideProps: GetServerSideProps = async () => {

   const events = await getEvents()

   return {
      props: { events: jsonParser(events) }
   }
}

export default HomePage
