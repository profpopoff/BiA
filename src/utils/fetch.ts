export async function fetchEvents() {
   const eventsResponse = await fetch("http://localhost:3000/api/events", {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
   })

   return eventsResponse.json()
}

export async function fetchEvent(id: string) {
   const eventResponse = await fetch(`http://localhost:3000/api/events/${id}`, { cache: "no-store" })

   return eventResponse.json()
}