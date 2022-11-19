import Image from "next/image"
import Link from "next/link"

import styles from './Cases.module.scss'
import { quarterArray } from "../../utils/divideArray"
import Filter from "./Filter"

import Cover from '../../public/cover.jpeg'

export default function Cases() {

   // const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,]
   const array = [
      { title: 'Между светом и тенью', artist: 'Евгений Гороховский', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Где-то рай', artist: 'Виктор Норкин', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Выход за пределы', artist: 'MARCK', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Блестящая эпоха', artist: 'Альберт Тибурци', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Маленькая девочка и кот Том', artist: 'Андрей Прохоров', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Последний титан', artist: 'Андрей Карташов', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Арт-синергия', dates: ['1.1.2021', '1.1.2022'] },
      { title: 'Pan-opticum', artist: 'Ван О', dates: ['1.1.2021', '1.1.2022'] },
   ]

   return (
      <div className={styles.container}>
         <Filter />
         <div className={styles.galleries}>
            {quarterArray(array).map(quarter =>
               <div className={styles.gallery}>
                  {quarter.map((item) =>
                     <Link href='/' className={styles.card}>
                        {/* <Image className={styles.image} src={Cover} alt="cover" /> */}
                        <div className={styles.headline}>
                           <h2 className={styles.title}>{item.title}</h2>
                           {!!item.artist && <span className={styles.artist}>{item.artist}</span>}
                        </div>
                     </Link>
                  )}
               </div>)}
         </div>
      </div>
   )
}