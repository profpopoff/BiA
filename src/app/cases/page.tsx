import Image from "next/image"
import styles from './Cases.module.scss'

import Filters from "./Filters"

export default function Cases() {

   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

   const divideArray = (array: any[]) => {
      const array1 = array.slice(0, Math.floor(array.length / 2)),
         array2 = array.slice(Math.floor(array.length / 2))
      return [array1, array2]
   }

   // divideArray(array).map((half) => {
   //    divideArray(half).map(quarter => {
   //       console.log(quarter, quarter.length)
   //    })
   // })

   return (
      <div className={styles.container}>
         <Filters />
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