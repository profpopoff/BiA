import { fetchEvent } from "../../../../utils/fetch"

export default async function Head({ params }: {
   params: { id: string }
}) {

   const { data } = await fetchEvent(params.id)

   return (
      <>
         <title>{`${data.title} | Erarta`}</title>
      </>
   )
}