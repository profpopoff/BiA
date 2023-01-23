import Image, { StaticImageData } from 'next/image'

import Wrapper from '../(event)/event/[slug]/components/Wrapper'
import aboutStyles from './About.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import infoImage from '../../../public/img/about/img1.jpg'
import img2 from '../../../public/img/about/img2.jpg'
import img3 from '../../../public/img/about/img3.jpg'
import img4 from '../../../public/img/about/img4.jpg'
import img5 from '../../../public/img/about/img5.jpg'
import img6 from '../../../public/img/about/img6.jpg'
import CustomLink from '../../components/CustomLink/CustomLink'

export default function About() {
   return (
      <div className={aboutStyles.about}>
         <Wrapper>
            <Info />
            <Images images={[img2]} thesis='Название образовано из&nbsp;слов era и&nbsp;arta и&nbsp;означает &laquo;время искусства&raquo;.' />
            <AdditionalDesc />
            <Images images={[img3, img4, img5]} thesis='Миссия музея&nbsp;&mdash; находить, изучать, коллекционировать и&nbsp;популяризировать творчество талантливых художников современной России.' />
            <Events />
         </Wrapper>
      </div>
   )
}

const Info = () => (
   <section className={aboutStyles.hero}>
      <div className={aboutStyles.info}>
         <article>
            <h1>Первый и&nbsp;крупнейший музей современного искусства в&nbsp;Санкт-Петербурге</h1>
            <p>Музей открылся 30&nbsp;сентября 2010&nbsp;года, и&nbsp;с&nbsp;этого момента в&nbsp;его стенах началась интересная и&nbsp;насыщенная жизнь&nbsp;&mdash; выставки, экскурсии, театральные постановки, концерты, образовательные мероприятия и&nbsp;многое другое.</p>
            <CustomLink href='/contact'>
               <span className={aboutStyles.text}>Контакты</span>
            </CustomLink>
         </article>
         <ul>
            <li>
               <FontAwesomeIcon icon={faClock} className={aboutStyles.icon} />
               С&nbsp;10:00 до&nbsp;22:00
            </li>
            <li>
               <FontAwesomeIcon icon={faCalendarDays} className={aboutStyles.icon} />
               Ежедневно, кроме вторника
            </li>
            <li>
               <FontAwesomeIcon icon={faLocationDot} className={aboutStyles.icon} />
               Васильевский остров, 29-я линия, дом 2
            </li>
         </ul>
      </div>
      <div className={aboutStyles.image}>
         <Image
            className={aboutStyles.src}
            src={infoImage}
            fill={true}
            sizes="(max-width: 1024px) 100vw, 75vw"
            alt='image'
         />
      </div>
   </section>
)

const Images = ({ images, thesis }: { images: StaticImageData[], thesis?: String }) => (
   <section className={aboutStyles.imageThesis}>
      {images.map((image, index) =>
         <div className={aboutStyles.image} key={index}>
            <Image
               className={aboutStyles.src}
               src={image}
               fill={true}
               sizes="(max-width: 1024px) 300vw, 100vw"
               alt='thesis image'
            />
         </div>
      )}
      {thesis && <p className={aboutStyles.thesis}>
         {thesis}
      </p>}
   </section>
)

const AdditionalDesc = () => (
   <section className={aboutStyles.additionalDesc}>
      <div className={aboutStyles.additionalDescWrapper}>
         <h2>Коллекция музея</h2>
         <p>В&nbsp;собрание музея входят произведения, созданные российскими художниками во&nbsp;второй половине XX&nbsp;&mdash; начале XXI&nbsp;веков. Музей периодически пополняет свою коллекцию, сотрудничая с&nbsp;художниками, работающими в&nbsp;разных регионах России и&nbsp;представляющими разные поколения и&nbsp;направления в&nbsp;изобразительном искусстве.</p>
      </div>
   </section>
)

const Events = () => (
   <section className={aboutStyles.events}>
      <span className={aboutStyles.eventsTitle}>
         <span className={aboutStyles.text}>Афиша</span>
         <CustomLink href='/events'>
            <span className={aboutStyles.link}>перейти</span>
         </CustomLink>
      </span>
      <div className={aboutStyles.image}>
         <Image
            className={aboutStyles.src}
            src={img6}
            fill={true}
            sizes="(max-width: 1024px) 300vw, 100vw"
            alt='thesis image'
         />
      </div>
   </section>
)