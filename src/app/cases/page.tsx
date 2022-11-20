'use client'

import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

import styles from './Cases.module.scss'
import { quarterArray } from "../../utils/divideArray"
import Filter from "./Filter"

import Cover from '../../public/cover.jpeg'

export default function Cases() {

   const array = [
      { title: 'Между светом и тенью', artist: 'Евгений Гороховский', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Где-то рай', artist: 'Виктор Норкин', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Выход за пределы', artist: 'MARCK', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Блестящая эпоха', artist: 'Альберт Тибурци', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Маленькая девочка и кот Том', artist: 'Андрей Прохоров', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Последний титан', artist: 'Андрей Карташов', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Арт-синергия', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
   ] // perfect length = 18

   const itemsRef = useRef<Array<HTMLDivElement | null>>([])

   const [heights, setHeights] = useState<any>()

   useEffect(() => {
      itemsRef.current = itemsRef.current.slice(0, quarterArray(array).length)

      setHeights([...itemsRef.current.map((item: any) => item.clientHeight)])
   }, [])

   const scrollHandler = (e: any) => {
      for (let i: number = 0; i <= heights.length; i++) {
         if (itemsRef.current[i]) {
            const scrollY = e.currentTarget.scrollTop
            const yDecimal = scrollY / (e.target.scrollHeight - e.target.offsetHeight)
            const maxY = heights[i] - e.target.scrollHeight
            const panY = maxY * yDecimal
            itemsRef.current[i]!.style.transform = `translateY(${-panY}px)`
         }
      }
   }

   return (
      <div className="container"
         onScroll={scrollHandler}>
         <div className={styles.wrapper}>
            <Filter />
            <div className={styles.galleries}>
               {quarterArray(array).map((quarter, index) =>
                  <div className={styles.gallery} key={index}
                     ref={el => itemsRef.current[index] = el}>
                     {quarter.map((item, index) =>
                        <Link href='/' className={styles.card} key={index}>
                           {/* <Image className={styles.image} src={Cover} alt="cover" /> */}
                           <div className={styles.headline}>
                              <h2 className={styles.title}>{item.title}</h2>
                              {!!item.artist && <span className={styles.artist}>{item.artist}</span>}
                           </div>
                        </Link>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div >
   )
}