import Link from 'next/link'
import { countOff } from '../utils/divideArray'
import { fetchEvents } from '../utils/fetch'
import Gallery from './components/Gallery/Gallery'
import styles from './HomePage.module.scss'

export default async function HomePage() {

   const events = await fetchEvents()

   // console.log(events)

   const array: { id: number, title: string, artist?: string, dates: string[] }[] = [
      { id: 1, title: 'Между светом и тенью', artist: 'Евгений Гороховский', dates: ['1.1.2021', '1.1.2022'] },
      { id: 2, title: 'Где-то рай', artist: 'Виктор Норкин', dates: ['1.1.2021', '1.1.2022'] },
      { id: 3, title: 'Выход за пределы', artist: 'MARCK', dates: ['1.1.2021', '1.1.2022'] },
      { id: 4, title: 'Блестящая эпоха', artist: 'Альберт Тибурци', dates: ['1.1.2021', '1.1.2022'] },
      { id: 5, title: 'Маленькая девочка и кот Том', artist: 'Андрей Прохоров', dates: ['1.1.2021', '1.1.2022'] },
      { id: 6, title: 'Последний титан', artist: 'Андрей Карташов', dates: ['1.1.2021', '1.1.2022'] },
      { id: 7, title: 'Арт-синергия', dates: ['1.1.2021', '1.1.2022'] },
      { id: 8, title: 'Pan-opticum', artist: 'Ван 8', dates: ['1.1.2021', '1.1.2022'] },
      { id: 9, title: 'Pan-opticum', artist: 'Ван 9', dates: ['1.1.2021', '1.1.2022'] },
      { id: 10, title: 'Pan-opticum', artist: 'Ван 10', dates: ['1.1.2021', '1.1.2022'] },
      { id: 11, title: 'Pan-opticum', artist: 'Ван 11', dates: ['1.1.2021', '1.1.2022'] },
      { id: 12, title: 'Pan-opticum', artist: 'Ван 12', dates: ['1.1.2021', '1.1.2022'] },
      { id: 13, title: 'Pan-opticum', artist: 'Ван 13', dates: ['1.1.2021', '1.1.2022'] },
      { id: 14, title: 'Pan-opticum', artist: 'Ван 14', dates: ['1.1.2021', '1.1.2022'] },
      { id: 15, title: 'Pan-opticum', artist: 'Ван 15', dates: ['1.1.2021', '1.1.2022'] },
      { id: 16, title: 'Pan-opticum', artist: 'Ван 16', dates: ['1.1.2021', '1.1.2022'] },
      { id: 17, title: 'Pan-opticum', artist: 'Ван 17', dates: ['1.1.2021', '1.1.2022'] },
      { id: 18, title: 'Pan-opticum', artist: 'Ван 18', dates: ['1.1.2021', '1.1.2022'] },
      { id: 19, title: 'Pan-opticum', artist: 'Ван 19', dates: ['1.1.2021', '1.1.2022'] },
      { id: 20, title: 'Pan-opticum', artist: 'Ван 20', dates: ['1.1.2021', '1.1.2022'] },
      { id: 21, title: 'Pan-opticum', artist: 'Ван 21', dates: ['1.1.2021', '1.1.2022'] },
      { id: 22, title: 'Pan-opticum', artist: 'Ван 22', dates: ['1.1.2021', '1.1.2022'] },
      { id: 23, title: 'Pan-opticum', artist: 'Ван 23', dates: ['1.1.2021', '1.1.2022'] },
      { id: 24, title: 'Pan-opticum', artist: 'Ван 24', dates: ['1.1.2021', '1.1.2022'] },
      // { id: 25, title: 'Pan-opticum', artist: 'Ван 25', dates: ['1.1.2021', '1.1.2022'] },
      // { id: 26, title: 'Pan-opticum', artist: 'Ван 26', dates: ['1.1.2021', '1.1.2022'] },
   ] // perfect length = 18

   return (
      <div className="container">
         <div className={styles.wrapper}>
            <div className={styles.galleries}>
               {countOff(array
                  .slice(0, 2 * Math.floor((array.length - 3) / 2) + 3), 2) // Арифметическая последовательность 1,3,5,7,9... (чтобы паралакс был красивым (стабильным))
                  .map((events: any[]) => <Gallery events={events} />)}
            </div>
            <Article />
         </div>
      </div>
   )
}

export const Article = () => (
   <article className={styles.article}>
      <h1 className={styles.slogan}>
         <span className={styles.marginLeft}>мир велик</span>
         <span>и никто</span>
         <span className={styles.marginLeft}>в нем</span>
         <span>не лишний</span>
      </h1>
      <div className={styles.mission}>
         <p className={styles.missionDesc}>Наша задача — сделать все для того, чтобы человек, придя к нам, увидел, что современное искусство — о нем и для него.</p>
         <Link href="/about" className={styles.missionLink}>Подробнее</Link>
      </div>
   </article>
)