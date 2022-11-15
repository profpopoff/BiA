import { useContext } from "react"
import { InteractionContext } from "./InteractionContext"

export default function Main({
   children,
}: {
   children: React.ReactNode
}) {

   const { nav } = useContext(InteractionContext)
   return (
      <main className={nav ? 'navActive' : ''}>
         {children}
      </main>
   )
}