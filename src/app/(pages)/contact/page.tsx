import { countOff } from '../../../utils/divideArray'
import Gallery from '../../components/Gallery/Gallery'
import contactStyle from './Contact.module.scss'
import images from '../../../public/img/contacts/contactsImages'


export default function Contact() {

   return (
      <div className="container">
         <div className={contactStyle.wrapper}>
            <div className={contactStyle.galleries}>
               {countOff(images, 2).map((images: string[], index: number) =>
                  <Gallery key={index} array={images} galleryIndex={index} />)}
            </div>
            <Contacts />
         </div>
      </div>
   )
}

const Contacts = () => (
   <div className={contactStyle.contacts}>
      <h1>Cвяжитесь с&nbsp;нами</h1>
      <div className={contactStyle.links}>
         <div>
            <h2>Посетите</h2>
            <a href="https://yandex.ru/maps/-/CCUrfEWi3B" target="_blank" className={contactStyle.link}>
               <span className={contactStyle.dot}></span>
               <span className={contactStyle.text}>Васильевский остров, 29-я линия, дом 2&nbsp;| 199106 Санкт-Петербург</span>
            </a>
         </div>
         <div>
            <h2>Напишите</h2>
            <a href="mailto:info@erarta.com" target="_blank" className={contactStyle.link}>
               <span className={contactStyle.dot}></span>
               <span className={contactStyle.text}>info@erarta.com</span>
            </a>
         </div>
         <div>
            <h2>Позвоните</h2>
            <a href="tel:+7 (812) 324 08 09" target="_blank" className={contactStyle.link}>
               <span className={contactStyle.dot}></span>
               <span className={contactStyle.text}>+7 (812) 324 08&nbsp;09</span>
            </a>
         </div>
         <div>
            <h2>Следите за новостями</h2>
            <div className={contactStyle.socials}>
               <a href="https://vk.com/erarta" target="_blank" className={contactStyle.link}>
                  <span className={contactStyle.dot}></span>
                  <span className={contactStyle.text}>Вконтакте</span>
               </a>
               <a href="https://t.me/erarta_museum" target="_blank" className={contactStyle.link}>
                  <span className={contactStyle.dot}></span>
                  <span className={contactStyle.text}>Телеграм</span>
               </a>
               <a href="https://www.youtube.com/user/Erartamuseum" target="_blank" className={contactStyle.link}>
                  <span className={contactStyle.dot}></span>
                  <span className={contactStyle.text}>YouTube</span>
               </a>
            </div>
         </div>
      </div>
   </div>
)