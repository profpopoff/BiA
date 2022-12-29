'use client'

import React, { useRef, useState } from "react"

export default function Wrapper({ children }: { children: React.ReactNode }) {

   const containerRef = useRef<HTMLDivElement>(null)

   var timer: any = null
   const [scrollY, setScrollY] = useState(0)

   const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

      if (timer !== null) {
         clearTimeout(timer)
      }

      timer = setTimeout(function () {

         const container = e.target as HTMLInputElement
         const { scrollTop, clientHeight } = container
         const scrollHeight = scrollY - scrollTop
         const scrollTo = (scrollTop - clientHeight * .25) / clientHeight

         if (scrollHeight >= clientHeight * .25) {
            container.scrollTo({
               top: Math.round(scrollTo) * clientHeight,
               behavior: 'smooth'
            })
         } else if (scrollHeight <= -clientHeight * .25) {
            container.scrollTo({
               top: Math.ceil(scrollTo) * clientHeight,
               behavior: 'smooth'
            })
         } else {
            container.scrollTo({
               top: (Math.floor(scrollTo) + 1) * clientHeight,
               behavior: 'smooth'
            })
         }

         setScrollY(scrollTop)
      }, 150)
   }

   return (
      <div className="container"
         ref={containerRef}
         onScroll={onScroll}
      >
         {children}
      </div >
   )
}