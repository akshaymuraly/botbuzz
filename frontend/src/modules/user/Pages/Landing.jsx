import React from 'react'
import styles from "./Landing.module.css"
import ContentBlock from './ContentBlock'

const Landing = () => {
  return (
    <div className={styles.container}>
        <ContentBlock/>
    </div>
  )
}

export default Landing