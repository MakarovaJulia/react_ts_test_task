import React from "react"
import styles from './index.module.sass'
import {Button} from "../Button";

const Pagination = ({itemsPerPage, totalItems, paginate, current}: any) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const isActive = (key:number) => key == current

  return (
    <div>
      <ul className={styles.pagination}>
        {
          pageNumbers.map(number => (
              <li className={styles.page_item} key={number}>
                <Button onClick={() => paginate(number)} title={number} active={isActive(number)}/>
              </li>
            )
          )
        }
      </ul>
    </div>
  )
}

export default Pagination
