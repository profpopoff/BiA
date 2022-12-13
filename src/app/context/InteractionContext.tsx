'use client'

import { createContext, useState } from 'react'

interface IInteractionContext {
   nav: boolean
   toggleNav?: () => void
   filterActive: boolean
   toggleFilter?: () => void
}

const defaultState = {
   nav: false,
   filterActive: false,
}

export const InteractionContext = createContext<IInteractionContext>(defaultState)

export default function ContextProvider({ children }: {
   children: React.ReactNode
}) {

   const [nav, setNav] = useState<boolean>(defaultState.nav)
   const [filterActive, setFilterActive] = useState<boolean>(defaultState.filterActive)

   const toggleNav = () => setNav(!nav)
   const toggleFilter = () => setFilterActive(!filterActive)

   return (
      <InteractionContext.Provider value={
         {
            nav, toggleNav,
            filterActive, toggleFilter,
         }
      }>
         {children}
      </InteractionContext.Provider >
   )
}