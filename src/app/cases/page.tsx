import Image from "next/image"

import styles from './Cases.module.scss'
import { quarterArray } from "../../utils/divideArray"
import Filter from "./Filter"

export default function Cases() {

   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,]

   return (
      <div className={styles.container}>
         <Filter />
         <div className={styles.galleries}>
            {quarterArray(array).map(quarter =>
               <div className={styles.gallery}>
                  {quarter.map((item: number) => <span>{item}</span>)}
               </div>)}
         </div>
      </div>
   )
}