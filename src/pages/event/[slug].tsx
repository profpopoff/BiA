import { GetServerSideProps } from "next"
import Image from "next/image"

import { getEvents } from "../api/events"
import { getEvent } from "../api/events/[slug]"
import Event from "../../interfaces/Event"
import FilterProvider from "../../context/FilterContext"

import styles from '../../style/pages/Event.module.scss'

import CustomLink from "../../components/CustomLink/CustomLink"
import Layout from "../../components/layout"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { jsonParser } from "../../utils/jsonParser"
import { decode } from "html-entities"

import ScrollCloser from "../../components/ScrollCloser"

interface NextEvent { title: string, image: string, link: string }

function Event({ event, nextEvent }: { event: Event, nextEvent: NextEvent }) {

   return (
      <Layout title={event.title}>
         <FilterProvider>
            <ScrollCloser>
               <div className={styles.eventContainer}>
                  <Hero title={event.title} artist={event.artist?.name} image={event.images.cover} />
                  <Info type={event.type} description={event.description.main} dates={event.dates} place={event.place} ageRestriction={event.ageRestriction} image={event.images.info} />
                  {!!event.artist?.info && <Artist name={event.artist.name} image={event.artist.image} info={event.artist.info} />}
                  <ImageThesis image={event.images.thesis.image} thesis={event.images.thesis.text} />
                  <AdditionalDesc description={event.description.additional.text} title={event.description.additional.title} />
                  {!!event.images.gallery && <ImageSections gallery={event.images.gallery} />}
                  <Next title={nextEvent.title} image={nextEvent.image} link={nextEvent.link} />
               </div>
            </ScrollCloser>
         </FilterProvider>
      </Layout>
   )
}

const Hero = ({ title, artist, image }: { title: string, artist?: string, image: string }) => (
   <section className={styles.hero}>
      <Image
         className={styles.image}
         src={image}
         fill
         priority
         sizes="(max-width: 1024px) 300vw, 100vw"
         alt={`${decode(title)} image`}
      />
      <h2 className={styles.headline}>
         <span className={styles.title}>{decode(title)}</span>
         {!!artist && <span className={styles.artistName}>{artist}</span>}
      </h2>
   </section>
)

const Info = ({ type, description, dates, place, ageRestriction, image }:
   { type: string, description: string, dates: { start: Date, end?: Date }, place: { floor: number, wing?: string }, ageRestriction: number, image: string }) => {

   const wingToRus = (wing: string) => {
      switch (wing) {
         case 'exhibition':
            return 'Выставочное крыло'
         case 'museum':
            return 'Музейное крыло'
         case 'stage':
            return 'Сцена'
         default:
            return 'Выставочное крыло'
      }
   }

   const typeToRus = (type: string) => {
      switch (type) {
         case 'stage':
            return 'Выступление на&nbsp;сцене'
         default:
            return 'Временная выставка'
      }
   }

   return (
      <section className={styles.info}>
         <div className={styles.text}>
            <article>
               <h2 className={styles.type}>{decode(typeToRus(type))}</h2>
               <p className={styles.description}>
                  {decode(description)}
               </p>
            </article>
            <div className={styles.stats}>
               <div className={styles.ageRestriction}>
                  <span>{ageRestriction}+</span>
               </div>
               <ul className={styles.statsList}>
                  <li className={styles.stat}>
                     <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
                     {new Date(dates.start).toLocaleDateString("en-GB")}{!!dates.end && ` - ${new Date(dates.end).toLocaleDateString("en-GB")}`}
                  </li>
                  <li className={styles.stat}>
                     <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
                     {`${wingToRus(!!place.wing ? place.wing : type)}, ${place.floor} этаж`}
                  </li>
               </ul>
            </div>
         </div>
         <div className={styles.image}>
            <Image
               className={styles.src}
               src={image}
               fill
               priority
               alt='description image'
            />
         </div>
      </section>
   )
}

const Artist = ({ name, image, info }: { name: string, image?: string, info?: string }) => (
   <section className={styles.artist}>
      <div className={styles.artistInfo}>
         {!!image && <div className={styles.image}>
            <Image
               className={styles.src}
               src={image}
               fill
               priority
               alt={`${name}`}
            />
         </div>}
         <div className={styles.text}>
            <h2>об авторе</h2>
            <p>{decode(info)}</p>
         </div>
      </div>
   </section>
)

const ImageThesis = ({ image, thesis }: { image: string, thesis: string }) => (
   <section className={styles.imageThesis}>
      <div className={styles.image}>
         <Image
            className={styles.src}
            src={image}
            fill
            priority
            sizes="(max-width: 1024px) 300vw, 100vw"
            alt='thesis image'
         />
      </div>
      <p className={styles.thesis}>{decode(thesis)}</p>
   </section>
)

const AdditionalDesc = ({ description, title }: { description: string, title?: string }) => (
   <section className={styles.additionalDesc}>
      <div className={styles.additionalDescWrapper}>
         {!!title && <h2>{decode(title)}</h2>}
         <p>{decode(description)}</p>
      </div>
   </section>
)

const ImageSections = ({ gallery }: { gallery: string[] }) => {

   const imageSections = gallery.reduce(function (rows: any[], key: string, index: number) {
      return (index % 3 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows
   }, [])

   return (
      <>
         {imageSections.map((section, index: number) => section.length > 1 && (
            <section key={index} className={styles.imageSection} >
               {section.map((image: string, index: number) => (
                  <div className={styles.image} key={index}>
                     <Image
                        className={styles.src}
                        src={image}
                        fill
                        priority
                        alt='thesis image'
                     />
                  </div>
               ))}
            </section>
         ))}
      </>
   )
}

const Next = ({ title, image, link }: { title: string, image: string, link: string }) => (
   <section className={styles.next}>
      <Image
         className={styles.image}
         src={image}
         fill
         priority
         sizes="(max-width: 1024px) 300vw, 100vw"
         alt={`${decode(title)} image`}
      />
      <div className={styles.nextEvent}>
         <span className={styles.nextTitle}>{decode(title)}</span>
         <CustomLink href={`/event/${link}`}>
            <span className={styles.nextLink}>перейти</span>
         </CustomLink>
      </div>
   </section>
)

export const getServerSideProps: GetServerSideProps = async (context) => {

   const event = await getEvent(context.query.slug)

   const events = await getEvents().then(res => jsonParser(res))

   let nextEvent: NextEvent = { title: '', image: '', link: '' }

   events.map((event: Event, index: number) => {
      if (event.link === context.query.slug) {
         if (index + 1 < events.length) {
            nextEvent = {
               link: events[index + 1].link,
               title: events[index + 1].title,
               image: events[index + 1].images.cover,
            }
         } else {
            nextEvent = {
               link: events[0].link,
               title: events[0].title,
               image: events[0].images.cover,
            }
         }
      }
   })

   return {
      props: { event: jsonParser(event), nextEvent }
   }
}

export default Event