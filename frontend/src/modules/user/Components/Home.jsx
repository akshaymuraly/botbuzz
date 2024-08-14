import React, { useEffect, useRef } from 'react'
import styles from "./Home.module.css"
import About from './About'
import HowToDo from './HowToDo'


const Home = ({setActiveLink,activeLink}) => {
    const homeRef = useRef(null)
    const aboutRef = useRef(null)
    const howRef = useRef(null)
    useEffect(()=>{
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    setActiveLink(entry.target.id)
                }
            })
        },{
            threshold:0.7
        })
        if(homeRef.current){
            observer.observe(homeRef.current)
        }
        if(aboutRef.current){
            observer.observe(aboutRef.current)
        }
        if(howRef.current){
            observer.observe(howRef.current)
        }
        return()=>{
            if(homeRef.current){
                observer.unobserve(homeRef.current)
            }
            if(aboutRef.current){
            observer.unobserve(aboutRef.current)
            }
            if(howRef.current){
            observer.unobserve(howRef.current)
            }
        }
    },[])
  return (
    <div className={styles.container}>
        <div id='home' ref={homeRef} className={styles.home}>
                <div className={styles.detailsBlock}><h1>Hello ,</h1> 
                    Our website provides a user-friendly platform for creating and managing your own Telegram bots. After registering and logging in, users can seamlessly generate a unique bot token ID through BotFather, which is essential for integrating with the Telegram API. Once the bot token is obtained, users can configure their bot by adding specific commands and setting up personalized responses for each command. This allows for tailored interactions and automated responses within Telegram chats. The intuitive interface ensures that both novice and experienced users can efficiently set up and manage their bots, enhancing their Telegram experience with custom functionalities.
                </div>
                <img src="./robohero1.png" alt="robohero1" className={`${styles.homeHero} ${activeLink==="home"?styles.animateHero:""}`}/>
        </div>
        <About setActiveLink={setActiveLink} aboutRef={aboutRef}/>
        <HowToDo howRef={howRef} activeLink={activeLink}/>
    </div>
  )
}

export default Home