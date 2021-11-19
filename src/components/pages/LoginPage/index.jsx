import './styles.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const LoginPage = () => {
    
    const [mode, setMode] = useState("login");

    const {register, handleSubmit} = useForm();

    const loginUser = (formVals) => {
        console.log("Login submitted", formVals);
    }

    const signUpUser = (formVals) => {
        console.log("Sign up submitted", formVals);
    }


    return(
        <div className="pets-page">
            {
                mode === "login" && (
                    <form className="form-layout" onSubmit={handleSubmit(loginUser)}>
                        <h2>Welcome back, please sign in</h2> <br/>
                        
                        <label htmlFor="user">Username</label>
                        <input type="email" required name="user"/>

                        <label htmlFor="password">Password</label> 
                        <input type="password" name="password" required/>

                        <input type="submit" value="Login"/>
                        <br/>
                        <p>Don't have an account yet? Create a new account</p>
                        <button onClick={()=> setMode("signup")}>Sign Up</button>
                    </form>
                )
            }

            {
                mode === "signup" && (
                    <form className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                        <h2>Create an account</h2> <br/>
                        
                        <label htmlFor="user">Username</label>
                        <input type="email" required name="user" {...register('user')} />

                        <label htmlFor="password">Password</label> 
                        <input type="password" name="password" required {...register('password')}/>
                        
                        <label htmlFor="passwordConfirm">Confirm Password</label> 
                        <input type="password" name="passwordConfirm" required/>

                        <input type="submit" value="Sign Up"/>
                        <br/>
                        <p>Already have an account?</p>
                        <button onClick={()=> setMode("login")}>Log In</button>
                    </form>
                )
            }
        </div>
    )
}