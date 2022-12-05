import styles from './Cases.module.scss'
import { quarterArray } from "../../../utils/divideArray"
import Gallery from "../../components/Gallery/Gallery"
import Filter from './components/Filter/Filter'

async function fetchEvents() {
   const eventsResponse = await fetch("http://localhost:3000/api/events", {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
   })

   return eventsResponse.json()
}

export default async function Cases() {

   const events = await fetchEvents()

   console.log(events)

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
            <Filter />
            <div className={styles.galleries}>
               {quarterArray(array).map((gallery) =>
                  <Gallery gallery={gallery} />
               )}
            </div>
         </div>
      </div>
   )
}