import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

import MyProjects from '../components/MyProjects'
import Profile from '../components/Profile'

function Dashboard() {
  const [username,setUsername] = useState("")
 useEffect(()=>{
  if(sessionStorage.getItem("existingUser")){
    
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  }
 },[])
  return (
    <>
    <Header />
      <div className='dashboard m-5'>
        <div className="container">
            <div className="row">
            <h2>Welcome <span className='text-success'>{username}</span></h2>
              <div className="col-lg-7 border shadow rounded p-3 mt-3 ">
               
                  <MyProjects />
              </div>
              <div className="col-lg-1">
  
              </div>
              <div className="col-lg-4 ">
                
              <Profile />
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard