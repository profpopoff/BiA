import { fetchEvent } from "../../../../utils/fetch"

import caseStyle from './Case.module.scss'

export default async function Case({ params: { id } }: {
   params: {
      id: string
   }
}) {

   const { data } = await fetchEvent(id)

   return (
      <div>{data.title}</div>
   )
}