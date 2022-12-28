'use client'

import { createContext, useState } from 'react'

interface IFilterContext {
   type: string
   changeType?: (value: string) => void
   date: string
   changeDate?: (value: string) => void
}

const defaultState = {
   type: '',
   date: '',
}

export const FilterContext = createContext<IFilterContext>(defaultState)

export default function FilterProvider({ children }: {
   children: React.ReactNode
}) {

   const [type, setType] = useState<string>(defaultState.type)
   const [date, setDate] = useState<string>(defaultState.date)

   const changeType = (value: string) => setType(value)
   const changeDate = (value: string) => setDate(value)

   return (
      <FilterContext.Provider value={{ type, changeType, date, changeDate }}>
         {children}
      </FilterContext.Provider >
   )
}