export const divideArray = (array: any[]) => ([array.slice(0, Math.floor(array.length / 2)), array.slice(Math.floor(array.length / 2))])

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