import Image from "next/image"
import { decode } from 'html-entities'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCakeCandles, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import { fetchEvent } from "../../../../utils/fetch"

import eventStyle from './Event.module.scss'

export default async function Event({ params }: {
   params: { id: string }
}) {

   const { data } = await fetchEvent(params.id)

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
      <div className={eventStyle.container}>
         <section className={eventStyle.hero}>
            <Image
               className={eventStyle.image}
               src={data.images[0]}
               fill={true}
               sizes='auto'
               alt={`${data.title} image`}
            />
            <h2 className={eventStyle.headline}>
               <span className={eventStyle.title}>{data.title}</span>
               {!!data.artist && <span className={eventStyle.artist}>{data.artist}</span>}
            </h2>
         </section>
         <section className={eventStyle.info}>
            <div className={eventStyle.infoWrapper}>
               <article>
                  <h2 className={eventStyle.type}>Временная выставка</h2>
                  <p className={eventStyle.description}>
                     <span className={eventStyle.textWrapper}>
                        {decode(data.description)}
                     </span>
                  </p>
               </article>
               <div className={eventStyle.stats}>
                  <div className={eventStyle.stat}>
                     <FontAwesomeIcon icon={faCalendarDays} className={eventStyle.icon} />
                     {`${new Date(data.dates.start).toLocaleDateString()} - ${new Date(data.dates.end).toLocaleDateString()}`}
                  </div>
                  <ul className={eventStyle.statsList}>
                     <li className={eventStyle.stat}>
                        <FontAwesomeIcon icon={faLocationDot} className={eventStyle.icon} />
                        {`${zoneToRus(data.place.zone)}, ${data.place.floor} этаж`}
                     </li>
                     <li className={eventStyle.stat}>
                        <FontAwesomeIcon icon={faCakeCandles} className={eventStyle.icon} />
                        {data.ageRestriction}+
                     </li>
                  </ul>
               </div>
            </div>
            <div className={eventStyle.src}>
               <Image
                  className={eventStyle.image}
                  src={data.images[1]}
                  fill={true}
                  sizes='auto'
                  alt={`${data.title} image`}
               />
            </div>
         </section>
      </div>
   )
}