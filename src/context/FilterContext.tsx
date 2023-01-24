'use client'

import { createContext, useState } from 'react'

interface IFilterContext {
   filter: string
   changeFilter?: (value: string) => void
}

const defaultState = {
   filter: '',
}

export const FilterContext = createContext<IFilterContext>(defaultState)

export default function FilterProvider({ children }: {
   children: React.ReactNode
}) {

   const [filter, setFilter] = useState<string>(defaultState.filter)

   const changeFilter = (value: string) => setFilter(value)

   return (
      <FilterContext.Provider value={{ filter, changeFilter }}>
         {children}
      </FilterContext.Provider >
   )
}