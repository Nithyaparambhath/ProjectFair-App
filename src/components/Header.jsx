import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../Contexts/TokenAuth';

function Header() {
  const {isAuthorized,setIsAuthorized} =useContext(tokenAuthContext)

  const [isLogedin,setIsLogedin] =useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
if(sessionStorage.getItem("token")){
  setIsLogedin(true)
}else{
  setIsLogedin(false)
}
  },[])

  const logout =(e)=>{
    e.preventDefault()
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    setIsAuthorized(false)
    setIsLogedin(false)
    navigate('/')
  }
  return (
    <div>
         <Navbar collapseOnSelect expand="lg" className="bg-dark ">
      <Container>
        <Navbar.Brand className='fw-bolder fs-3 text-success'><i class="fa-brands fa-stack-overflow fa-bounce"></i><Link to={'/'} style={{textDecoration:'none'}} className='text-success'> PROJECT FAIR</Link></Navbar.Brand>
        <Navbar.Toggle className='bg-success' style={{color:'#ffffff'}} aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center ">
            <Link style={{textDecoration:'none'}} to={'/'} className='text-light me-3'>Home</Link>
            <div>
           {isLogedin?
            <Link onClick={logout} className='btn btn-outline-success ms-3'>LOG OUT</Link>:
            <Link to={'/login'} className='btn btn-outline-success ms-3'>LOG IN</Link>
           }
        </div>
          </Nav>

        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    </div>
  )
}

export default Header