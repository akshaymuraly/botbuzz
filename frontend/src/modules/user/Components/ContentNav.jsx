import React, { useEffect, useState } from 'react'
import styles from "./ContentNav.module.css"
const ContentNav = ({changeActiveLink,activeLink}) => {
  return (
    <nav className={styles.container}>
         <ul>
            <li ><a href='#home' className={`${styles.atag} ${activeLink==="home"?styles.active:""}` } name={"home"} onClick={changeActiveLink}>Home</a>
            <div className={styles.underline}>
              <div></div>
            </div>
            </li>
            <li><a href="#about" className={`${styles.atag} ${activeLink==="about"?styles.active:""}`} name={"about"} onClick={changeActiveLink}>About</a></li>
            <li><a href='#signup' className={`${styles.atag} ${activeLink==="signup"?styles.active:""}`} name={"signup"} onClick={changeActiveLink}>Signup</a></li>
            <li><a href='#login' className={`${styles.atag} ${activeLink==="login"?styles.active:""}`} name={"login"} onClick={changeActiveLink}>Login</a></li>
            <li><a href="#how" className={`${styles.atag} ${activeLink==="how"?styles.active:""}`} name={"how"} onClick={changeActiveLink}>How?</a></li>
         </ul>
    </nav>
  )
}

export default ContentNav