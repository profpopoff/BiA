import { countOff } from '../../../utils/divideArray'
import { fetchEvents } from '../../../utils/fetch'
import Gallery from '../../components/Gallery/Gallery'
import contactStyle from './Contact.module.scss'


export default async function Contact() {

   const { data } = await fetchEvents()

   return (
      <div className="container">
         <div className={contactStyle.wrapper}>
            <div className={contactStyle.galleries}>
               {countOff(
                  data.map((el: any) => el.images.cover) // images toot
                  , 2).map((images: string[], index: number) =>
                     <Gallery key={index} array={images} />)}
            </div>
            <Contacts />
         </div>
      </div>
   )
}

const Contacts = () => {
   return (
      <div className={contactStyle.info}>contacts</div>
   )
}