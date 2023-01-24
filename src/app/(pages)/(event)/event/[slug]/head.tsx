import DefaultTags from "../../../../components/DefaultTags"

import { decode } from "html-entities"

async function fetchEvent(slug: string) {

   const URL = process.env.URL

   const eventResponse = await fetch(`${URL}/api/events/${slug}`, { cache: "no-store" })
      .then(eventResponse => eventResponse.json())

   return eventResponse.data
}

export default async function Head({ params }: {
   params: { slug: string }
}) {

   const event = await fetchEvent(params.slug)

   return (
      <>
         <DefaultTags />
         <title>{`${decode(event.title)} | Erarta`}</title>
      </>
   )
}