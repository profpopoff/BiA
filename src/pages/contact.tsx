import { useRef } from "react"

import { countOff } from "../utils/divideArray"
import images from '../img/contacts/contactsImages'

import styles from '../style/pages/Contact.module.scss'

import Layout from "../components/layout"
import Gallery from "../components/Gallery/Gallery"

function Contact() {

   const containerRef = useRef<HTMLDivElement>(null)

   return (
      <Layout title="Контакты">
         <div className='container' ref={containerRef}>
            <div className={styles.contactContainer}>
               <div className={styles.galleries}>
                  {countOff(images, 2).map((images: string[], index: number) =>
                     <Gallery key={index} array={images} galleryIndex={index} container={containerRef} />)}
               </div>
               <Contacts />
            </div>
         </div>
      </Layout>
   )
}

const Contacts = () => (
   <div className={styles.contacts}>
      <h1>Cвяжитесь с&nbsp;нами</h1>
      <div className={styles.links}>
         <div>
            <h2>Посетите</h2>
            <a href="https://yandex.ru/maps/-/CCUrfEWi3B" target="_blank" className={styles.link}>
               <span className={styles.dot}></span>
               <span className={styles.text}>Васильевский остров, 29-я линия, дом 2&nbsp;| 199106 Санкт-Петербург</span>
            </a>
         </div>
         <div>
            <h2>Напишите</h2>
            <a href="mailto:info@erarta.com" target="_blank" className={styles.link}>
               <span className={styles.dot}></span>
               <span className={styles.text}>info@erarta.com</span>
            </a>
         </div>
         <div>
            <h2>Позвоните</h2>
            <a href="tel:+7 (812) 324 08 09" target="_blank" className={styles.link}>
               <span className={styles.dot}></span>
               <span className={styles.text}>+7 (812) 324 08&nbsp;09</span>
            </a>
         </div>
         <div>
            <h2>Следите за новостями</h2>
            <div className={styles.socials}>
               <a href="https://vk.com/erarta" target="_blank" className={styles.link}>
                  <span className={styles.dot}></span>
                  <span className={styles.text}>Вконтакте</span>
               </a>
               <a href="https://t.me/erarta_museum" target="_blank" className={styles.link}>
                  <span className={styles.dot}></span>
                  <span className={styles.text}>Телеграм</span>
               </a>
               <a href="https://www.youtube.com/user/Erartamuseum" target="_blank" className={styles.link}>
                  <span className={styles.dot}></span>
                  <span className={styles.text}>YouTube</span>
               </a>
            </div>
         </div>
      </div>
   </div>
)

export default Contact