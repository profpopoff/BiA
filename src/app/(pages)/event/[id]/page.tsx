import { fetchEvent } from "../../../../utils/fetch"

import eventStyle from './Event.module.scss'

export default async function Event({ params: { id } }: {
   params: {
      id: string
   }
}) {

   const { data } = await fetchEvent(id)

   return (
      <div>{data.title}</div>
   )
}