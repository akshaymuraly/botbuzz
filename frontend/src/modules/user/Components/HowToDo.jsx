import styles from "./HowToDo.module.css"
import React from 'react'
import style from "./Home.module.css"

const HowToDo = ({howRef,activeLink}) => {
  return (
    <div className={styles.container} ref={howRef} id="how">
        <h1>How to create the bot?</h1>
        <ul className={`${styles.list} ${activeLink==="how"?style.animateHero:""}`}>
            <li className={styles.hover}>Create the account and login.</li>
            <li className={styles.hover}>Make the api access key from Telegram BotFather.</li>
            <li className={styles.hover}>Create the bot by providing commands and actions.</li>
            <li className={styles.hover}>That's it!</li>
        </ul>
    </div>
  )
}

export default HowToDo