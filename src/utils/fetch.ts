export async function fetchEvents() {
   const events = await fetch("http://localhost:3000/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   return events
}

export async function fetchEvent(id: string) {
   const eventResponse = await fetch(`http://localhost:3000/api/events/${id}`, { cache: "no-store" })

   return eventResponse.json()
}

export async function fetchNextEvent(id: string) {
   const events = await fetch("http://localhost:3000/api/events", { cache: "no-store" })
      .then(eventsResponse => eventsResponse.json())

   let nextEvent: { title: string, image: string, id: string } = { title: '', image: '', id: '' }

   events.data.map((event: any, index: number) => {
      if (event._id === id) {
         if (index + 1 < events.data.length) {
            nextEvent = {
               id: events.data[index + 1]._id,
               title: events.data[index + 1].title,
               image: events.data[index + 1].images.cover,
            }
         } else {
            nextEvent = {
               id: events.data[0]._id,
               title: events.data[0].title,
               image: events.data[0].images.cover,
            }
         }
      }
   })

   return nextEvent
}
