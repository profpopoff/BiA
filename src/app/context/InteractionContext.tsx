'use client'

import { createContext, useState } from 'react'

interface IInteractionContext {
   nav: boolean
   toggleNav?: () => void
   filterActive: boolean
   toggleFilter?: () => void
   caseActive: boolean
   toggleCase?: () => void
}

const defaultState = {
   nav: false,
   filterActive: false,
   caseActive: false,
}

export const InteractionContext = createContext<IInteractionContext>(defaultState)

export default function ContextProvider({ children }: {
   children: React.ReactNode
}) {

   const [nav, setNav] = useState<boolean>(defaultState.nav)
   const [filterActive, setFilterActive] = useState<boolean>(defaultState.filterActive)
   const [caseActive, setCaseActive] = useState<boolean>(defaultState.caseActive)

   const toggleNav = () => setNav(!nav)
   const toggleFilter = () => setFilterActive(!filterActive)
   const toggleCase = () => setCaseActive(!caseActive)

   return (
      <InteractionContext.Provider value={
         {
            nav, toggleNav,
            filterActive, toggleFilter,
            caseActive, toggleCase,
         }
      }>
         {children}
      </InteractionContext.Provider >
   )
}