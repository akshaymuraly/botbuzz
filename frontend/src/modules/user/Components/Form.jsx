import React, { act, useEffect } from 'react'
import styles from "./Form.module.css"
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '../../../store'
import axios from "axios"



const Form = ({activeLink}) => {
  const isLoggedIn = useSelector((state)=>state.user.isLoggedIn);
  const dispatch = useDispatch();
  const {register,handleSubmit,formState: { errors }} = useForm()
  async function onSubmitHandler(data){
    console.log(data)
    const url = activeLink==="signup"?"/api/user/signup":"/api/user/login"
    try{
      const res = await axios.post(url,data);
      if(res.data.status){
        if(activeLink==="signup"){
          console.log(res.data)
        }else{
          console.log(res.data)
          dispatch(userActions.userLogin())
        }
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    console.log(isLoggedIn)
  },[isLoggedIn])

  return (
    <div className={styles.container}>
        <form action="" className={styles.from} onSubmit={handleSubmit(onSubmitHandler)}>
          {activeLink==="signup"&&
            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Name</div>
              <input type="text" className={styles.formInput} {...register("Name")}/>
            </div>
          }
            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Email</div>
              <input {...register("Email",{
                      required: "Email can not be empty!",
                      pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "invalid email address"
                    }
        })} type="text" className={styles.formInput}/>
        {errors.Email&&<span className={styles.errorContainer}>{errors.Email.message}</span>}
            </div>

            <div className={styles.formInputContainer}>
              <div className={styles.inputTag}>Password</div>
              <input {...register("Password",{
                required:"Cant be empty",
                ...(activeLink==="signup"
                    ? {
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message: "Password should be strong",
                        },
                      }
                    : {})
                })
                } type="text" className={styles.formInput}/>
              {errors.Password&&<span className={styles.errorContainer}>{errors.Password.message}</span>}
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