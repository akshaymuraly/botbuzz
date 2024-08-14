import React from 'react'
import styles from "./ContentBlock.module.css"
import ContentBody from '../Components/ContentBody'

const ContentBlock = () => {
  return (
    <div className={styles.container}>
        <ContentBody/>
    </div>
  )
}

export default ContentBlock