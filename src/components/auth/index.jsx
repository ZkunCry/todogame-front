import React from "react"
import Login from "pages/Login"
import Register from "pages/Register"
import { Navigate, useLocation,useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
import { loginUser, registerUser } from "store/thunk/auth"

const AuthRootComponent = ()=>{

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((state)=>state.auth.isLoading)
  const logged = useSelector((state)=>state.auth.isLogged)
  const user = useSelector((state)=>state.auth.user)
  console.log("User: ",user);

  //TODO: Добавить логику имитицаии загрузки при нажатии кнопки регистрации или же логина
  const {
    register,
    formState:{
      errors
    },handleSubmit
  } = useForm()

  const handleSubmitForm = async(data)=>{
    if(location.pathname ==="/auth/signin")
    {      
      dispatch(loginUser(data))
      navigate('/main')
    }
    else {
      if(data.password ===data.repeatPassword)
      {
      const userData  = {
        login:data.login,
        email:data.email,
        password:data.password,

      }
      try {
        dispatch(registerUser(userData))
        navigate('/main')
      } catch (error) {
          return error
      }
    }
    else{
      return new Error("Error repeat password does not match the password")
    }
  }
    //TODO: Решить, будет ли токен или нет
};

  return (
      logged? <Navigate to={"/main"}></Navigate>:
    
      location.pathname === "/auth/signin" ? 
      <Login 
      login = {register}
      errors = {errors}
      sendData = {handleSubmit(handleSubmitForm)}  />:location.pathname ==="/auth/signup"?
      <Register 
      errors = {errors}
      register={register}
      sendData = {handleSubmit(handleSubmitForm)}/>:
      null
 
   )
}
export default AuthRootComponent;