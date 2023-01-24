import React, { useEffect, useRef, useState } from "react"

export default function ScrollCloser({ children }: { children: React.ReactNode }) {
   useEffect(() => {
      containerRef.current!.scrollTo({ top: 0 })
   }, [children])

   const containerRef = useRef<HTMLDivElement>(null)

   var timer: any = null
   const [scrollY, setScrollY] = useState(0)

   const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

      if (timer !== null) {
         clearTimeout(timer)
      }

      timer = setTimeout(() => {

         const container = e.target as HTMLInputElement
         const { scrollTop, clientHeight } = container
         const scrollHeight = scrollY - scrollTop
         const clientHeightDif = .25
         const scrollUp = Math.ceil(((scrollTop - clientHeight * (1 - clientHeightDif)) / clientHeight)) * clientHeight
         const scrollDown = Math.ceil(((scrollTop - clientHeight * clientHeightDif) / clientHeight)) * clientHeight

         if (scrollHeight >= clientHeight * clientHeightDif) {
            container.scrollTo({
               top: scrollUp,
               behavior: 'smooth'
            })
         } else {
            container.scrollTo({
               top: scrollDown,
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