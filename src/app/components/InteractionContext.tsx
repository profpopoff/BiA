'use client'

import { createContext, useState } from 'react'

interface IInteractionContext {
   nav: boolean
   toggleNav?: () => void
   filter: boolean
   toggleFilter?: () => void
   caseActive: boolean
   toggleCase?: () => void
}

const defaultState = {
   nav: false,
   filter: false,
   caseActive: false,
}

export const InteractionContext = createContext<IInteractionContext>(defaultState)

export default function ContextProvider({ children }: {
   children: React.ReactNode
}) {

   const [nav, setNav] = useState<boolean>(defaultState.nav)
   const [filter, setFilter] = useState<boolean>(defaultState.filter)
   const [caseActive, setCaseActive] = useState<boolean>(defaultState.caseActive)

   const toggleNav = () => setNav(!nav)
   const toggleFilter = () => setFilter(!filter)
   const toggleCase = () => setCaseActive(!caseActive)

   return (
      <InteractionContext.Provider value={
         {
            nav, toggleNav,
            filter, toggleFilter,
            caseActive, toggleCase,
         }
      }>
         {children}
      </InteractionContext.Provider >
   )
}