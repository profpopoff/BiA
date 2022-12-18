'use client'

import React, { useEffect, useRef, useState } from "react"

export default function Wrapper({ children }: { children: React.ReactNode }) {

   const containerRef = useRef<HTMLDivElement>(null)

   const [scroll, setScroll] = useState(false)

   const [currentSection, setCurrentSection] = useState(0)

   const [touchStart, setTouchStart] = useState(null)
   const [touchEnd, setTouchEnd] = useState(null)

   const minSwipeDistance = 50

   useEffect(() => {
      containerRef.current?.children[currentSection].scrollIntoView({ behavior: 'smooth' })
   }, [scroll, currentSection])

   const onWheel = (e: any) => {
      if (e.nativeEvent.deltaY > 0) {
         if (currentSection < e.currentTarget.children.length - 1) {
            setCurrentSection(prevCurrentSection => prevCurrentSection + 1)
         }
      } else {
         if (currentSection > 0) {
            setCurrentSection(prevCurrentSection => prevCurrentSection - 1)
         }
      }
   }

   const onTouchStart = (e: any) => {
      setTouchEnd(null)
      setTouchStart(e.targetTouches[0].clientY)
   }

   const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY)

   const onTouchEnd = (e: any) => {
      if (!touchStart || !touchEnd) return
      const distance = touchStart - touchEnd
      if (distance > minSwipeDistance) {
         if (currentSection < e.currentTarget.children.length - 1) {
            setCurrentSection(prevCurrentSection => prevCurrentSection + 1)
         }
      } else if (distance < -minSwipeDistance) {
         if (currentSection > 0) {
            setCurrentSection(prevCurrentSection => prevCurrentSection - 1)
         }
      } else {
         setScroll(prevScroll => !prevScroll)
      }
   }

   return (
      <div className="container"
         ref={containerRef}
         onWheel={onWheel}
         onTouchStart={onTouchStart}
         onTouchMove={onTouchMove}
         onTouchEnd={onTouchEnd}
      >
         {children}
      </div >
   )
}