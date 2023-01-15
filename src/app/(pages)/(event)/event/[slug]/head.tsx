import { decode } from "html-entities"
import { fetchEvent } from "../../../../../utils/fetch"
import DefaultTags from "../../../../components/DefaultTags"

export default async function Head({ params }: {
   params: { slug: string }
}) {

   const { data } = await fetchEvent(params.slug)

   return (
      <>
         <DefaultTags />
         <title>{`${decode(data.title)} | Erarta`}</title>
      </>
   )
}