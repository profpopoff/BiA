'use client'

import React, { useEffect, useRef, useState } from "react"

export default function Wrapper({ children }: { children: React.ReactNode }) {

   const containerRef = useRef<HTMLDivElement>(null)

   const [scrollTrigger, setScrollTrigger] = useState(false)

   const [nextSection, setNextSection] = useState(0)

   const [touchStart, setTouchStart] = useState(null)
   const [touchEnd, setTouchEnd] = useState(null)

   const minSwipeDistance = 50

   useEffect(() => {
      containerRef.current?.children[nextSection].scrollIntoView({ behavior: 'smooth' })
   }, [scrollTrigger])

   const onWheel = (e: any) => {

      const { scrollTop, clientHeight } = containerRef.current!

      if (e.nativeEvent.deltaY > 0) {
         if (scrollTop > clientHeight * nextSection - clientHeight * .5 &&
            nextSection < e.currentTarget.children.length - 1) {
            setNextSection(currentSection => currentSection + 1)
            setScrollTrigger(prevScroll => !prevScroll)
         } else {
            setScrollTrigger(prevScroll => !prevScroll)
         }
      } else {
         if (scrollTop < clientHeight * nextSection + clientHeight * .5 &&
            nextSection > 0) {
            setNextSection(currentSection => currentSection - 1)
            setScrollTrigger(prevScroll => !prevScroll)
         } else {
            setScrollTrigger(prevScroll => !prevScroll)
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
         if (nextSection < e.currentTarget.children.length - 1) {
            setNextSection(currentSection => currentSection + 1)
            setScrollTrigger(prevScroll => !prevScroll)
         }
      } else if (distance < -minSwipeDistance) {
         if (nextSection > 0) {
            setNextSection(currentSection => currentSection - 1)
            setScrollTrigger(prevScroll => !prevScroll)
         }
      } else {
         setScrollTrigger(prevScroll => !prevScroll)
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