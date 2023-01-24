export default interface Event {
   _id: string
   title: string
   link: string
   type: string
   artist?: {
      name: string
      image?: string
      info?: string
   }
   dates: {
      start: Date
      end?: Date
   }
   ageRestriction: number
   place: {
      floor: number
      wing?: string
   }
   description: {
      main: string
      additional: {
         title?: string
         text: string
      }
   }
   images: {
      cover: string
      info: string
      thesis: {
         image: string
         text: string
      }
      gallery?: string[]
   }
}
