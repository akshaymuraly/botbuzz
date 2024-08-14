import React, { act } from 'react'
import styles from "./Form.module.css"
import {useForm} from "react-hook-form"

const Form = ({activeLink}) => {
  const {register,handleSubmit,formState: { errors }} = useForm()
  function onSubmitHandler(data){
      // e.preventDefault()
      console.log(data)
  }
  return (
    <div className={styles.container}>
        <form action="" className={styles.from} onSubmit={handleSubmit(onSubmitHandler)}>
          {activeLink==="signup"&&
            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Name</div>
              <input type="text" className={styles.formInput} {...register("name")}/>
            </div>
          }
            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Email</div>
              <input {...register("email",{
          required: "Required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address"
          }
        })} type="text" className={styles.formInput}/>
        {errors.email&&errors.email.message}
            </div>
            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Password</div>
              <input {...register("password",{
                required:"Cant be empty",
                pattern:{
                  value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:"Password should be strong"
                }
                })} type="text" className={styles.formInput}/>
              {errors.password&&errors.password.message}
            </div>
            {activeLink==="signup"&&
              <div className={styles.formInputContainer}>
                <div className={styles.inputTag}>Confirm password</div>
                <input {...register("confirm_password")} type="text" className={styles.formInput}/>
              </div>
            }
            <button className={styles.submitBtn} type='submit'>{activeLink==="signup"?"Signup":"Login"}</button>
            <div className={styles.googleContainer}>
                <div>
                  <a href="" className={styles.linkContainer}>
                    <img src="./googleicon.svg" alt="google" className={styles.googleLogo}/>
                    <span>
                      {activeLink==="signup"?"Signup":"Login"} with Google
                      </span>
                  </a>
                </div>
                <div className={styles.redirectContainer}>
                  <span>{activeLink==="signup"?"Have account?":"No account? register "}</span>
                  <a href="" className={styles.link}>{activeLink==="signup"?"Login":"Signup"}</a>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Form