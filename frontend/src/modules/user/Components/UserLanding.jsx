import React, { useEffect, useState } from 'react'
import styles from "./UserLanding.module.css"
import NewBot from './NewBot'

const UserLanding = () => {
    const[activeLink,setActiveLink] = useState("create")
    function activeLinkHandler(e){
        setActiveLink(e.target.id)
    }
    useEffect(()=>console.log(activeLink),[activeLink])
  return (
    <div className={styles.container}>
        <nav className={styles.navContain}>
            <ul className={styles.navigation}>
                <li className=
                {`${styles.li} ${activeLink==="create"?styles.active:""}`}><button id='create' className={styles.btn} onClick={activeLinkHandler}>New telegram bot</button></li>
                <li className=
                {`${styles.li} ${activeLink==="bots"?styles.active:""}`}><button id="bots" className={styles.btn} onClick={activeLinkHandler}>Created Bots</button></li>
                <li className=
                {`${styles.li} ${activeLink==="info"?styles.active:""}`}><button id="info" className={styles.btn} onClick={activeLinkHandler}>info</button></li>
                <li><button className={styles.btn}>logout</button></li>
            </ul>
        </nav>
        <div className={styles.userContainer}>
            <NewBot/>
        </div>
    </div>
  )
}

export default UserLanding