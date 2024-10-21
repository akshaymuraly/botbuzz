import React, { useEffect, useRef, useState } from 'react'
import styles from "./NewBot.module.css"
import style from "./Form.module.css"
import {useForm} from "react-hook-form"
import axios from 'axios'
axios.defaults.withCredentials = true


const NewBot = () => {
    const commandRef = useRef(null)
    const messageRef = useRef(null)
    const {register,handleSubmit,formState: { errors }} = useForm()
    const [commands,setCommand] = useState({})
    // const [item,setItem] = useState({})
  async function onSubmitHandler(data){
    data["commands"] = commands
    try{
      const res = await axios.post("/api/bot/newbot",data,{withCredentials:true})
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }
  function addItem(){
    if(commandRef && messageRef){
         setCommand(prev=>({...prev,[commandRef.current.value]:messageRef.current.value}))
    }
  }
  useEffect(()=>console.log(commands),[commands])
  return (
    <div className={styles.container}>
        <form action="" className={style.from} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Name</div>
              <input type="text" className={style.formInput} {...register("Bot_Name")}/>
            </div>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Access Token</div>
              <input type="text" className={style.formInput} {...register("token")}/>
            </div>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Commands</div>
              <div className={styles.inpuContainer}>
                <div><input type="text" ref={commandRef}/></div>
                <div><input type="text" ref={messageRef}/></div>
                <button onClick={addItem} type='button'>Add</button>
              </div>
              <div className={styles.commandContainer}>
                {
                  Object.values(commands).length>0?(
                    Object.keys(commands).map(item=>{
                        return <div className={styles.command}>
                    <div className={styles.commandString}>{item}</div>
                    <div className={styles.message}><p>{commands[item]}</p><button onClick={()=>{
                      setCommand(prev=>{
                        const updated = {...prev}
                        delete updated[item]
                        return updated
                      })
                    }}>X</button></div>
                </div>  
                    })
                  ):<h1>No commands</h1>
              }
              </div>
            </div>
            <button className={style.submitBtn} type='submit'>Create</button>
        </form>
    </div>
  )
}

export default NewBot