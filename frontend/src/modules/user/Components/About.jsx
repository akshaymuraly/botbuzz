import React, { useEffect, useRef } from 'react'
import styles from "./About.module.css"

const About = ({aboutRef}) => {
  return (
    <div className={styles.container} ref={aboutRef} id='about'>
        <h1>About</h1>
        <p>Our web app provides an intuitive platform for creating and managing Telegram bots without the need for technical expertise. Built with React on the client side and powered by Express and Node.js on the server side, the app simplifies the process of bot creation. Users can effortlessly provide their bot token and set up commands with corresponding messages, while the app takes care of the behind-the-scenes work, such as implementing the necessary webhook and server configurations. Whether you're a developer or someone with no coding experience, our app ensures that you can easily deploy and manage your Telegram bots without any hassle.</p>
    </div>
  )
}

export default About