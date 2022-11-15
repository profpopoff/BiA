import { useContext } from "react"
import { InteractionContext } from "./InteractionContext"

export default function MainToggle() {

   const { nav, toggleNav, filter, toggleFilter, caseActive, toggleCase } = useContext(InteractionContext)

   const clickHandler = () => {

      if (filter) {
         toggleFilter?.()
      } else if (caseActive) {
         toggleCase?.()
      } else {
         toggleNav?.()
      }
   }

   return (
      <button
         className={`nav-toggle ${nav && "navActive"} ${filter && "filterActive"} ${caseActive && "caseActive"}`}
         onClick={clickHandler}
      >
         {nav ? 'true' : 'false'}
      </button>
   )
}