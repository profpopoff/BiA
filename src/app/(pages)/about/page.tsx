import Image from 'next/image'

import Wrapper from '../(event)/event/[slug]/components/Wrapper'
import aboutStyles from './About.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faClock, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import img from '../../../public/img/about/img7.jpg'
import CustomLink from '../../components/CustomLink/CustomLink'

export default function About() {
   return (
      <div className={aboutStyles.about}>
         <Wrapper>
            <Info />
            <section>
               <h1>section 2</h1>
            </section>
            <section>
               <h1>section 3</h1>
            </section>
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
               Васильевский остров, 29-я линия, дом 2&nbsp;| 199106 Санкт-Петербург
            </li>
         </ul>
      </div>
      <div className={aboutStyles.image}>
         <Image
            className={aboutStyles.src}
            src={img}
            fill={true}
            sizes='100vw'
            alt='image'
         />
      </div>
   </section>
)