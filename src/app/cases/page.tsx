import Image from "next/image"
import styles from './Cases.module.scss'

import Filter from "./Filter"

export default function Cases() {

   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

   const divideArray = (array: any[]) =>
      ([array.slice(0, Math.floor(array.length / 2)), array.slice(Math.floor(array.length / 2))])

   return (
      <div className={styles.container}>
         <Filter />
         <div className={styles.galleries}>
            {divideArray(array).map((half) =>
               divideArray(half).map(quarter =>
                  <div className={styles.gallery}>
                     {quarter.map((item: number) => <span>{item}</span>)}
                  </div>
               )
            )}
         </div>
      </div>
   )
}