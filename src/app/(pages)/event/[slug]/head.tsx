import { fetchEvent } from "../../../../utils/fetch"

export default async function Head({ params }: {
   params: { slug: string }
}) {

   const { data } = await fetchEvent(params.slug)

   return (
      <>
         <title>{`${data.title} | Erarta`}</title>
      </>
   )
}