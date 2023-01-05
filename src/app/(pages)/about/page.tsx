import Image from 'next/image'

import Wrapper from '../(event)/event/[slug]/components/Wrapper'
import aboutStyles from './About.module.scss'

import img from '../../../public/img/about/img2.jpeg'

export default function About() {
   return (
      <div className={aboutStyles.about}>
         <Wrapper>
            <section className={aboutStyles.hero}>
               <Image
                  className={aboutStyles.image}
                  src={img}
                  fill={true}
                  sizes='100vw'
                  alt={`image`}
               />
               {/* <h2 className={aboutStyles.headline}>
               </h2> */}
            </section>
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