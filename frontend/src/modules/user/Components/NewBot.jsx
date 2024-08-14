import React, { useEffect, useRef, useState } from 'react'
import styles from "./NewBot.module.css"
import style from "./Form.module.css"
import {useForm} from "react-hook-form"


const NewBot = () => {
    const commandRef = useRef(null)
    const messageRef = useRef(null)
    const {register,handleSubmit,formState: { errors }} = useForm()
    const [commands,setCommand] = useState([])
    // const [item,setItem] = useState({})
  function onSubmitHandler(data){
    data.user_commands = commands
      console.log(data)
  }
  function addItem(){
    if(commandRef && messageRef){
         setCommand(prev=>[...prev,{[commandRef.current.value]:messageRef.current.value}])
        //  commandRef.current.value=""
        //  messageRef.current.value=""
    }
  }
  useEffect(()=>console.log(commands),[commands])
  return (
    <div className={styles.container}>
        <form action="" className={style.from} onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Name</div>
              <input type="text" className={style.formInput} {...register("name")}/>
            </div>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Access Token</div>
              <input type="text" className={style.formInput} {...register("accesstoken")}/>
            </div>
            <div className={style.formInputContainer}>
              <div className={style.inputTag}>Commands</div>
              <div><input type="text" ref={commandRef}/></div>
              <div><input type="text" ref={messageRef}/></div>
              <button onClick={addItem} type='button'>Add</button>
              {/* <input type="text" className={style.formInput} {...register("accesstoken")}/> */}
            </div>
            <button className={style.submitBtn} type='submit'>Create</button>
        </form>
    </div>
  )
}

export default NewBot