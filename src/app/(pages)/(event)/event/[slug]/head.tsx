import DefaultTags from "../../../../components/DefaultTags"

import { fetchEvent } from "../../../../../utils/fetch"
import { decode } from "html-entities"

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