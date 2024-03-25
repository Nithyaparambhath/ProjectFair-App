import React, { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from '../Contexts/TokenAuth';

function Auth({register}) {
    const {isAuthorized,setIsAuthorized} =useContext(tokenAuthContext)

    const [userData,setUserData] = useState({
        username:"",
        email:"",
        password:""
    })
    const navigate = useNavigate()

    const handleRegister = async (e)=>{
        e.preventDefault()
        const {username,email,password} =userData
        if(!username || !email ||!password){
            toast.info("Please Fill the form Completely")
        }else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status === 200){
                toast.success(`${result.data.username} has registered successfully`)
                setUserData({
                    username:"",email:"",password:""
                })
                navigate('/login')
            }
                
                else{
                    toast.error(result.response.data)
                    console.log(result);
                }
            
        }
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
            const {email,password} =userData
            if(!email ||!password){
                toast.info("Please Fill the form Completely")
            }else{
                const result = await loginAPI(userData)
                if(result.status ===200){
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                    email:"",password:""
                })
                navigate('/')

            }else{
                toast.error(result.response.data)
                console.log(result);
            }
        }
    }
    const isRegisterForm = register?true:false
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
      
       <div className="w-75 card border rounded bg-success p-5">
       
        <div className="row align-items-center ">
            
            <div className="col-lg-6">
            <div className='text-left mb-2'><Link className='text-light btn btn-dark ms-auto' style={{textDecoration:'none'}} to={'/'}><i class="fa-solid fa-arrow-left"></i> Back To Home</Link></div>
                <img style={{width:'400px',borderRadius:'20px'}} src="https://th.bing.com/th/id/OIP.4RbPjRm8kUQrJO32AR5ByQHaEK?w=777&h=437&rs=1&pid=ImgDetMain" alt="" />
            </div>
            <div className="col-lg-6 text-center">
            <h1 className='text-light'><i class="fa-brands fa-stack-overflow fa-bounce"></i> Project Fair</h1>
            <h6 className='text-light mb-4'>
                {isRegisterForm ? 'Sign Up your Account' : 'Sign In your Account'}
            </h6>
            <Form>
                { isRegisterForm ?
                    <Form.Group className="mb-3 rounded" controlId="formBasicEmail">
                   
                    <Form.Control type="text" placeholder="Enter User Name" value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} />
                   
                </Form.Group>:''
                
             }
              <Form.Group className="mb-3 rounded" controlId="formBasicEmail">
                   
                   <Form.Control type="email" placeholder="Enter Email" value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} />
                  
               </Form.Group>
               <Form.Group className="mb-3 rounded" controlId="formBasicEmail">
                   
                   <Form.Control type="password" placeholder="Enter Password" value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} />
                  
               </Form.Group>
              <div className='d-grid'> {isRegisterForm?<Button onClick={handleRegister} type="submit" className='btn btn-dark'>Register</Button>:<Button onClick={handleLogin} type="submit" className='btn btn-dark'>Login</Button>}</div>
              {isRegisterForm? <p className='text-start text-light'>Already have an Account? <Link to={'/login'} style={{textDecoration:'none'}} className='text-warning'>Login</Link></p>: <p className='text-start text-light'>New User ? <Link  to={'/register'} style={{textDecoration:'none'}}  className='text-warning'>Register</Link></p> }
            </Form>
            </div>
           
        </div>
       </div>
       <ToastContainer position='top-right' autoClose={2000} theme="colored" />
    </div>
  )
}

export default Auth