import Image from "next/image"
import { fetchEvent } from "../../../../utils/fetch"

import eventStyle from './Event.module.scss'

export default async function Event({ params }: {
   params: { id: string }
}) {

   const { data } = await fetchEvent(params.id)

   return (
      <div className={eventStyle.container}>
         <div className={eventStyle.hero}>
            <Image
               className={eventStyle.image}
               src={data.images[0]}
               fill={true}
               sizes='auto'
               alt="cover"
            />
            <h2 className={eventStyle.headline}>
               <span className={eventStyle.title}>{data.title}</span>
               {!!data.artist && <span className={eventStyle.artist}>{data.artist}</span>}
            </h2>
         </div>
      </div>
   )
}