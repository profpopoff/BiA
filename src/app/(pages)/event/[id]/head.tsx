import { fetchEvent } from "../../../../utils/fetch"

export default async function Head({ params: { id } }: {
   params: {
      id: string
   }
}) {

   const { data } = await fetchEvent(id)

   return (
      <>
         <title>{`${data.title} | Erarta`}</title>
      </>
   )
}