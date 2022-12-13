import { fetchEvent } from "../../../../utils/fetch"

export default async function Case({ params: { id } }: {
   params: {
      id: string
   }
}): Promise<JSX.Element> {

   const { data } = await fetchEvent(id)

   return (
      <div>{data.title}</div>
   )
}