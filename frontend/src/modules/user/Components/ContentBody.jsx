import React, { useState } from 'react'
import styles from "./ContentBody.module.css"
import ContentNav from './ContentNav'
import Home from './Home'
import Form from './Form'
import UserLanding from './UserLanding'
import { useSelector } from 'react-redux'

const ContentBody = () => {
  const isLoggedIn = useSelector(state=>state.user.isLoggedIn)
  console.log(isLoggedIn)
  const[activeLink,setActiveLink] = useState("home")
        function changeActiveLink(e){
            setActiveLink(e.target.name)
            console.log(activeLink)
        }
  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <img src="./botlogo.png" alt="logo" />
        </div>
        {isLoggedIn?<UserLanding/>:
        <div className={styles.body}>
            <ContentNav changeActiveLink={changeActiveLink} activeLink={activeLink}/>
            {
              (activeLink==="signup"||activeLink==="login")?
              <Form activeLink={activeLink}/>:
              <Home setActiveLink={setActiveLink} activeLink={activeLink}/>
            }
        </div>
          }
    </div>
  )
}

export default ContentBody