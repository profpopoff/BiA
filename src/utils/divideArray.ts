export const countOff = (array: any[], count: number) => array.reduce((accumulator, value, index) => {
   accumulator[index % count].push(value)

   return accumulator
}, Array.from({ length: count }, () => []))

export const quarterArray = (array: any[]) => {

   let counter = 0
   let array1 = [], array2 = [], array3 = [], array4 = []

   for (let i of array) {

      switch (counter) {
         case 0:
            array2.push(i)
            break
         case 1:
            array3.push(i)
            break
         case 2:
            array4.push(i)
            break
         case 3:
            array1.push(i)
            break
      }

      counter === 3 ? counter = 0 : ++counter
   }

   return [array1, array2, array3, array4]
}