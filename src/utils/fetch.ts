export async function fetchEvents() {
   const events = await fetch("http://localhost:3000/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   return events
}

export async function fetchEvent(slug: string) {
   const eventResponse = await fetch(`http://localhost:3000/api/events/${slug}`, { cache: "no-store" })

   return eventResponse.json()
}

export async function fetchNextEvent(slug: string) {
   const events = await fetch("http://localhost:3000/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   let nextEvent: { title: string, image: string, link: string } = { title: '', image: '', link: '' }

   events.data.map((event: any, index: number) => {
      if (event.link === slug) {
         if (index + 1 < events.data.length) {
            nextEvent = {
               link: events.data[index + 1].link,
               title: events.data[index + 1].title,
               image: events.data[index + 1].images.cover,
            }
         } else {
            nextEvent = {
               link: events.data[0].link,
               title: events.data[0].title,
               image: events.data[0].images.cover,
            }
         }
      }
   })

   return nextEvent
}
