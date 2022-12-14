import { fetchEvent } from "../../../../utils/fetch"

import eventStyle from './Event.module.scss'

export default async function Event({ params }: {
   params: { id: string }
}) {

   const { data } = await fetchEvent(params.id)

   return (
      <div>{data.title}</div>
   )
}