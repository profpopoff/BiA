import Image from "next/image"
import { decode } from 'html-entities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCakeCandles, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import { fetchEvent } from "../../../../utils/fetch"

import eventStyle from './Event.module.scss'
import Wrapper from "./components/Wrapper"

export default async function Event({ params }: {
   params: { id: string }
}) {

   const { data } = await fetchEvent(params.id)

   // console.log(data.images.slice(2))

   return (
      <div className={eventStyle.event}>
         <Wrapper>
            <Hero title={data.title} artist={data.artist} image={data.images[0]} />
            <Info title={data.title} description={data.description} dates={data.dates}
               place={data.place} ageRestriction={data.ageRestriction} image={data.images[1]} />
            {!!data.artistInfo && <Artist artist={data.artist} image={data.artistImage} info={data.artistInfo} />}
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
         sizes='30rem'
         alt={`${title} image`}
      />
      <h2 className={eventStyle.headline}>
         <span className={eventStyle.title}>{title}</span>
         {!!artist && <span className={eventStyle.artistName}>{artist}</span>}
      </h2>
   </section>
)

const Info = ({ title, description, dates, place, ageRestriction, image }:
   { title: string, description: string, dates: { start: Date, end: Date }, place: { floor: number, zone: string }, ageRestriction: number, image: string }) => {

   const zoneToRus = (zone: string) => {
      switch (zone) {
         case 'exposition':
            return 'Выставочное крыло'
         case 'museum':
            return 'Музейнок крыло'
         case 'stage':
            return 'Сцена'
      }
   }

   return (
      <section className={eventStyle.info}>
         <div className={eventStyle.infoWrapper}>
            <article>
               <h2 className={eventStyle.type}>Временная выставка</h2>
               <p className={eventStyle.description}>
                  <span className={eventStyle.textWrapper}>
                     {decode(description)}
                  </span>
               </p>
            </article>
            <div className={eventStyle.stats}>
               <div className={eventStyle.stat}>
                  <FontAwesomeIcon icon={faCalendarDays} className={eventStyle.icon} />
                  {`${new Date(dates.start).toLocaleDateString()} - ${new Date(dates.end).toLocaleDateString()}`}
               </div>
               <ul className={eventStyle.statsList}>
                  <li className={eventStyle.stat}>
                     <FontAwesomeIcon icon={faLocationDot} className={eventStyle.icon} />
                     {`${zoneToRus(place.zone)}, ${place.floor} этаж`}
                  </li>
                  <li className={eventStyle.stat}>
                     <FontAwesomeIcon icon={faCakeCandles} className={eventStyle.icon} />
                     {ageRestriction}+
                  </li>
               </ul>
            </div>
         </div>
         <div className={eventStyle.image}>
            <Image
               className={eventStyle.src}
               src={image}
               fill={true}
               sizes='auto'
               alt='description image'
            />
         </div>
      </section>
   )
}

const Artist = ({ artist, image, info }: { artist: string, image: string, info: string }) => (
   <section className={eventStyle.artist}>
      {!!image && <div className={eventStyle.image}>
         <Image
            className={eventStyle.src}
            src={image}
            fill={true}
            sizes='auto'
            alt={`${artist}`}
         />
      </div>}
      <div className={eventStyle.artistInfo}>
         <h2>об авторе</h2>
         <p>{info}</p>
      </div>
   </section>
)