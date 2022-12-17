'use client'

import { useEffect, useRef, useState } from "react"

export default function Wrapper({ children }: { children: React.ReactNode }) {

   const containerRef = useRef<HTMLDivElement>(null)
   const [currentSection, setCurrentSection] = useState(0)

   const [y, setY] = useState<number>(0)

   useEffect(() => {
      containerRef.current?.children[currentSection].scrollIntoView({ behavior: 'smooth'})
   }, [currentSection])

   return (
      <div className="container"
         ref={containerRef}
         onWheel={e => {
            if (e.nativeEvent.deltaY > 0) {
               console.log('scroll down')
               if (currentSection < e.currentTarget.children.length - 1) {
                  setCurrentSection(prevCurrentSection => prevCurrentSection + 1)
               }
            } else {
               console.log('scroll up')
               if (currentSection > 0) {
                  setCurrentSection(prevCurrentSection => prevCurrentSection - 1)
               }
            }
         }}

      // onScroll={e => {
      //    // console.log(currentSection, e.currentTarget.scrollTop, y, containerRef.current!.clientHeight * (currentSection + 1), ((e.currentTarget.scrollTop === containerRef.current!.clientHeight * (currentSection + 1)) && (currentSection < e.currentTarget.children.length - 1)))
      //    if (e.currentTarget.scrollTop > y + 99) {
      //       console.log('scroll down')
      //       containerRef.current?.scrollTo({
      //          top: containerRef.current?.clientHeight * (currentSection + 1),
      //          // behavior: 'smooth'
      //       })
      //       if (
      //          // (e.currentTarget.scrollTop === containerRef.current!.clientHeight * (currentSection + 1)) &&
      //           (currentSection < e.currentTarget.children.length - 1)) {
      //          setCurrentSection(prevCurrentSection => prevCurrentSection + 1)
      //       }
      //       setY(e.currentTarget.scrollTop)

      //    } else if (e.currentTarget.scrollTop < y - 99) {
      //       console.log('scroll up')
      //       containerRef.current?.scrollTo({
      //          top: containerRef.current?.clientHeight * (currentSection - 1),
      //          // behavior: 'smooth'
      //       })
      //       if (
      //          // (e.currentTarget.scrollTop === containerRef.current!.clientHeight * (currentSection - 1)) && 
      //          (currentSection > 0)) {
      //          setCurrentSection(prevCurrentSection => prevCurrentSection - 1)
      //       }
      //       setY(e.currentTarget.scrollTop)
      //    }
      //    // setY(e.currentTarget.scrollTop)

      // }}
      >
         {children}
      </div >
   )
}