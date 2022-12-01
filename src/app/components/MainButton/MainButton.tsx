'use client'

import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faArrowRotateBack } from '@fortawesome/free-solid-svg-icons'

import { InteractionContext } from "../../context/InteractionContext"

import mainButton from './MainButton.module.scss'

export default function MainButton() {

   const { nav, toggleNav, filterActive, toggleFilter, caseActive, toggleCase } = useContext(InteractionContext)

   const clickHandler = () => {
      if (filterActive) {
         toggleFilter?.()
      } else if (caseActive) {
         toggleCase?.()
      } else {
         toggleNav?.()
      }
   }

   return (
      <button
         className={(nav || filterActive || caseActive) ? `${mainButton.button} ${mainButton.active}` : mainButton.button}
         onClick={clickHandler}
      >
         {(nav || filterActive || caseActive) ?
            <FontAwesomeIcon icon={faArrowRotateBack} className={mainButton.icon} /> :
            <FontAwesomeIcon icon={faBarsStaggered} className={mainButton.icon} />}
      </button>
   )
}