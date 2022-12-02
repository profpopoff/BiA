// 'use client'

import Image from "next/image"
import Link from "next/link"
import React, { useRef } from "react"

import styles from './Cases.module.scss'
import { quarterArray } from "../../../utils/divideArray"
import Filter from "./components/Filter/Filter"

import Cover from '../../public/cover.jpeg'
import Gallery from "./components/Gallery/Gallery"

export default function Cases() {

   const array: { id: number, title: string, artist?: string, dates: string[] }[] = [
      { id: 1, title: 'Между светом и тенью', artist: 'Евгений Гороховский', dates: ['1.1.2021', '1.1.2022'] },
      { id: 2, title: 'Где-то рай', artist: 'Виктор Норкин', dates: ['1.1.2021', '1.1.2022'] },
      { id: 3, title: 'Выход за пределы', artist: 'MARCK', dates: ['1.1.2021', '1.1.2022'] },
      { id: 4, title: 'Блестящая эпоха', artist: 'Альберт Тибурци', dates: ['1.1.2021', '1.1.2022'] },
      { id: 5, title: 'Маленькая девочка и кот Том', artist: 'Андрей Прохоров', dates: ['1.1.2021', '1.1.2022'] },
      { id: 6, title: 'Последний титан', artist: 'Андрей Карташов', dates: ['1.1.2021', '1.1.2022'] },
      { id: 7, title: 'Арт-синергия', dates: ['1.1.2021', '1.1.2022'] },
      { id: 8, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 9, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 10, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 11, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 12, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 13, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 14, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 15, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 16, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 17, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { id: 18, title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
   ] // perfect length = 18

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <div className={styles.galleries}>
               {quarterArray(array).map((gallery, index) =>
                  <Gallery gallery={gallery} index={index} />
               )}
            </div>
         </div>
      </div>
   )

}
   // const galleryRef = useRef<Array<HTMLDivElement>>([])

   // const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent> & { target: HTMLInputElement }) => {

   //    const scrollY = e.currentTarget.scrollTop
   //    const yDecimal = scrollY / (e.target.scrollHeight - e.target.offsetHeight)

   //    for (let i: number = 0; i <= 3; i++) {
   //       const maxY = galleryRef.current[i].clientHeight - e.target.scrollHeight
   //       const panY = maxY * yDecimal
   //       galleryRef.current[i].style.transform = `translateY(${-panY}px)`
   //    }
   // }

//    return (
//       <div className="container" onScroll={scrollHandler}>
//          <div className={styles.wrapper}>
//             <Filter />
//             <div className={styles.galleries}>
//                {quarterArray(array).map((gallery, index) =>
//                   <Gallery gallery={gallery} galleryRef={galleryRef} key={index} index={index} />
//                )}
//             </div>
//          </div>
//       </div >
//    )
// }

// export const Gallery = ({ gallery, galleryRef, index }:
//    { gallery: any[], galleryRef: React.MutableRefObject<(HTMLDivElement | null)[]>, index: number }) => {
//    return (
//       <div className={styles.gallery} ref={el => galleryRef.current[index] = el}>
//          {gallery.map((item) =>
//             <Link href='/' className={styles.card} key={item.id}>
//                {/* <Image className={styles.image} src={Cover} alt="cover" /> */}
//                <div className={styles.headline}>
//                   <h2 className={styles.title}>{item.title}</h2>
//                   {!!item.artist && <span className={styles.artist}>{item.artist}</span>}
//                </div>
//             </Link>
//          )}
//       </div>
//    )
// }