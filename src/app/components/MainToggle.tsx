'use client'

import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'

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
         className={`nav-toggle ${(nav || filter || caseActive) && "toggle-active"}`}
         onClick={clickHandler}
      >
         {(nav || filter || caseActive) ?
            <FontAwesomeIcon icon={faArrowRotateBack} className="icon" /> :
            <FontAwesomeIcon icon={faBarsStaggered} className="icon" />}
      </button>
   )
}