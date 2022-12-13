'use client'

import { createContext, useState } from 'react'

interface IInteractionContext {
   nav: boolean
   toggleNav?: () => void
   filterActive: boolean
   toggleFilter?: () => void
   eventActive: boolean
   toggleEvent?: () => void
}

const defaultState = {
   nav: false,
   filterActive: false,
   eventActive: false,
}

export const InteractionContext = createContext<IInteractionContext>(defaultState)

export default function ContextProvider({ children }: {
   children: React.ReactNode
}) {

   const [nav, setNav] = useState<boolean>(defaultState.nav)
   const [filterActive, setFilterActive] = useState<boolean>(defaultState.filterActive)
   const [eventActive, setEventActive] = useState<boolean>(defaultState.eventActive)

   const toggleNav = () => setNav(!nav)
   const toggleFilter = () => setFilterActive(!filterActive)
   const toggleEvent = () => setEventActive(!eventActive)

   return (
      <InteractionContext.Provider value={
         {
            nav, toggleNav,
            filterActive, toggleFilter,
            eventActive, toggleEvent,
         }
      }>
         {children}
      </InteractionContext.Provider >
   )
}