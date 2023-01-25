import Image, { StaticImageData } from "next/image"

import styles from '../style/pages/About.module.scss'

import ScrollCloser from "../components/ScrollCloser"
import Layout from "../components/layout"
import CustomLink from "../components/CustomLink/CustomLink"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import infoImage from '../img/about/img1.jpg'
import img2 from '../img/about/img2.jpg'
import img3 from '../img/about/img3.jpg'
import img4 from '../img/about/img4.jpg'
import img5 from '../img/about/img5.jpg'
import img6 from '../img/about/img6.jpg'

function About() {
   return (
      <Layout title="О Музее">
         <ScrollCloser>
            <div className={styles.aboutContainer}>
               <Info />
               <Images images={[img2]} thesis='Название образовано из&nbsp;слов era и&nbsp;arta и&nbsp;означает &laquo;время искусства&raquo;.' />
               <AdditionalDesc />
               <Images images={[img3, img4, img5]} thesis='Миссия музея&nbsp;&mdash; находить, изучать, коллекционировать и&nbsp;популяризировать творчество талантливых художников современной России.' />
               <Events />
            </div>
         </ScrollCloser>
      </Layout>
   )
}

const Info = () => (
   <section className={styles.hero}>
      <div className={styles.info}>
         <article>
            <h1>Первый и&nbsp;крупнейший музей современного искусства в&nbsp;Санкт-Петербурге</h1>
            <p>Музей открылся 30&nbsp;сентября 2010&nbsp;года, и&nbsp;с&nbsp;этого момента в&nbsp;его стенах началась интересная и&nbsp;насыщенная жизнь&nbsp;&mdash; выставки, экскурсии, театральные постановки, концерты, образовательные мероприятия и&nbsp;многое другое.</p>
            <CustomLink href='/contact'>
               <span className={styles.text}>Контакты</span>
            </CustomLink>
         </article>
         <ul>
            <li>
               <FontAwesomeIcon icon={faClock} className={styles.icon} />
               С&nbsp;10:00 до&nbsp;22:00
            </li>
            <li>
               <FontAwesomeIcon icon={faCalendarDays} className={styles.icon} />
               Ежедневно, кроме вторника
            </li>
            <li>
               <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
               Васильевский остров, 29-я линия, дом 2
            </li>
         </ul>
      </div>
      <div className={styles.image}>
         <Image
            className={styles.src}
            src={infoImage}
            fill
            priority
            alt='image'
         />
      </div>
   </section>
)

const Images = ({ images, thesis }: { images: StaticImageData[], thesis?: String }) => (
   <section className={styles.imageThesis}>
      {images.map((image, index) =>
         <div className={styles.image} key={index}>
            <Image
               className={styles.src}
               src={image}
               fill
               priority
               sizes="(max-width: 1024px) 300vw, auto"
               alt='thesis image'
            />
         </div>
      )}
      {thesis && <p className={styles.thesis}>
         {thesis}
      </p>}
   </section>
)

const AdditionalDesc = () => (
   <section className={styles.additionalDesc}>
      <div className={styles.additionalDescWrapper}>
         <h2>Коллекция музея</h2>
         <p>В&nbsp;собрание музея входят произведения, созданные российскими художниками во&nbsp;второй половине XX&nbsp;&mdash; начале XXI&nbsp;веков. Музей периодически пополняет свою коллекцию, сотрудничая с&nbsp;художниками, работающими в&nbsp;разных регионах России и&nbsp;представляющими разные поколения и&nbsp;направления в&nbsp;изобразительном искусстве.</p>
      </div>
   </section>
)

const Events = () => (
   <section className={styles.events}>
      <span className={styles.eventsTitle}>
         <span className={styles.text}>Афиша</span>
         <CustomLink href='/events'>
            <span className={styles.link}>перейти</span>
         </CustomLink>
      </span>
      <div className={styles.image}>
         <Image
            className={styles.src}
            src={img6}
            fill
            priority
            sizes="(max-width: 1024px) 300vw, 100vw"
            alt='thesis image'
         />
      </div>
   </section>
)

export default About