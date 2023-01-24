import Image from "next/image"

import eventStyle from './Event.module.scss'
import CustomLink from "../../../../components/CustomLink/CustomLink"
import Wrapper from "./components/Wrapper"

import { decode } from 'html-entities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const URL = process.env.URL

async function fetchEvent(slug: string) {
   const eventResponse = await fetch(`${URL}/api/events/${slug}`, { cache: "no-store" })
      .then(eventResponse => eventResponse.json())

   return eventResponse.data
}

async function fetchNextEvent(slug: string) {
   const events = await fetch(URL + "/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   let nextEvent: { title: string, image: string, link: string } = { title: '', image: '', link: '' }

   events.data.map((event: any, index: number) => {
      if (event.link === slug) {
         if (index + 1 < events.data.length) {
            nextEvent = {
               link: events.data[index + 1].link,
               title: events.data[index + 1].title,
               image: events.data[index + 1].images.cover,
            }
         } else {
            nextEvent = {
               link: events.data[0].link,
               title: events.data[0].title,
               image: events.data[0].images.cover,
            }
         }
      }
   })

   return nextEvent
}


export default async function Event({ params }: {
   params: { slug: string }
}) {

   const eventData = fetchEvent(params.slug)
   const nextData = fetchNextEvent(params.slug)

   const [event, nextEvent] = await Promise.all([eventData, nextData])

   return (
      <div className={eventStyle.event}>
         <Wrapper>
            <Hero title={event.title} artist={event.artist?.name} image={event.images.cover} />
            <Info type={event.type} description={event.description.main} dates={event.dates} place={event.place} ageRestriction={event.ageRestriction} image={event.images.info} />
            {!!event.artist?.info && <Artist artist={event.artist} image={event.artist.image} info={event.artist.info} />}
            <ImageThesis image={event.images.thesis.image} thesis={event.images.thesis.text} />
            <AdditionalDesc description={event.description.additional.text} title={event.description.additional.title} />
            {event.images.gallery.length > 1 && <ImageSections gallery={event.images.gallery} />}
            <Next title={nextEvent.title} image={nextEvent.image} link={nextEvent.link} />
         </Wrapper>
      </div>
   )
}

const Hero = ({ title, artist, image }: { title: string, artist: string, image: string }) => (
   <section className={eventStyle.hero}>
      <Image
         className={eventStyle.image}
         src={image}
         fill={true}
         sizes="(max-width: 1024px) 300vw, 100vw"
         alt={`${decode(title)} image`}
      />
      <h2 className={eventStyle.headline}>
         <span className={eventStyle.title}>{decode(title)}</span>
         {!!artist && <span className={eventStyle.artistName}>{artist}</span>}
      </h2>
   </section>
)

const Info = ({ type, description, dates, place, ageRestriction, image }:
   { type: string, description: string, dates: { start: Date, end: Date }, place: { floor: number, wing: string }, ageRestriction: number, image: string }) => {

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
      <section className={eventStyle.info}>
         <div className={eventStyle.text}>
            <article>
               <h2 className={eventStyle.type}>{decode(typeToRus(type))}</h2>
               <p className={eventStyle.description}>
                  {decode(description)}
               </p>
            </article>
            <div className={eventStyle.stats}>
               <div className={eventStyle.ageRestriction}>
                  <span>{ageRestriction}+</span>
               </div>
               <ul className={eventStyle.statsList}>
                  <li className={eventStyle.stat}>
                     <FontAwesomeIcon icon={faCalendarDays} className={eventStyle.icon} />
                     {new Date(dates.start).toLocaleDateString()}{!!dates.end && ` - ${new Date(dates.end).toLocaleDateString()}`}
                  </li>
                  <li className={eventStyle.stat}>
                     <FontAwesomeIcon icon={faLocationDot} className={eventStyle.icon} />
                     {`${wingToRus(!!place.wing ? place.wing : type)}, ${place.floor} этаж`}
                  </li>
               </ul>
            </div>
         </div>
         <div className={eventStyle.image}>
            <Image
               className={eventStyle.src}
               src={image}
               fill
               sizes="(max-width: 1024px) 100vw, 75vw"
               alt='description image'
            />
         </div>
      </section>
   )
}

const Artist = ({ artist, image, info }: { artist: string, image: string, info: string }) => (
   <section className={eventStyle.artist}>
      <div className={eventStyle.artistInfo}>
         {!!image && <div className={eventStyle.image}>
            <Image
               className={eventStyle.src}
               src={image}
               fill
               sizes="(max-width: 1024px) 100vw, 50vw"
               alt={`${artist}`}
            />
         </div>}
         <div className={eventStyle.text}>
            <h2>об авторе</h2>
            <p>{decode(info)}</p>
         </div>
      </div>
   </section>
)

const ImageThesis = ({ image, thesis }: { image: string, thesis: string }) => (
   <section className={eventStyle.imageThesis}>
      <div className={eventStyle.image}>
         <Image
            className={eventStyle.src}
            src={image}
            fill
            sizes="(max-width: 1024px) 300vw, 100vw"
            alt='thesis image'
         />
      </div>
      <p className={eventStyle.thesis}>{decode(thesis)}</p>
   </section>
)

const AdditionalDesc = ({ description, title }: { description: string, title: string }) => (
   <section className={eventStyle.additionalDesc}>
      <div className={eventStyle.additionalDescWrapper}>
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
            <section key={index} className={eventStyle.imageSection} >
               {section.map((image: string, index: number) => (
                  <div className={eventStyle.image} key={index}>
                     <Image
                        className={eventStyle.src}
                        src={image}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
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
   <section className={eventStyle.next}>
      <Image
         className={eventStyle.image}
         src={image}
         fill
         sizes="(max-width: 1024px) 300vw, 100vw"
         alt={`${decode(title)} image`}
      />
      <div className={eventStyle.nextEvent}>
         <span className={eventStyle.nextTitle}>{decode(title)}</span>
         <CustomLink href={`/event/${link}`}>
            <span className={eventStyle.nextLink}>перейти</span>
         </CustomLink>
      </div>
   </section>
)