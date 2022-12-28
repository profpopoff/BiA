import FilterProvider from "./context/FilterContext"

export default function EventLayout({ children }: {
   children: React.ReactNode
}) {

   return (
      <section>
         <FilterProvider>
            {children}
         </FilterProvider>
      </section>
   )
}
