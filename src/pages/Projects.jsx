import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { allProjectsAPI } from '../Services/allAPI'
import ProjectCard from '../components/ProjectCard'
import { Col, Row } from 'react-bootstrap'

function Projects() {
  const [allProjects,setAllProjects] = useState([])
  const [searchKey,setSearchKey] = useState("")
  const getAllProjects = async (req,res)=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        'Content-Type':'application/json',
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectsAPI(searchKey,reqHeader)
      if(result.status ===200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
  }

  useEffect(()=>{
getAllProjects()
  },[searchKey])
  return (
    

    <div>
      <Header />
     <div   className='m-5'>
       <h1 className='text-center mt-4'>All Projects</h1>
       <div className='d-flex justify-content-center align-items-center m-5 flex-column w-100'>
        <div className='d-flex border w-50 rounded'>
          <input type="text" className='form-control' placeholder='Serch Projects by Technologies used' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)}/>
          <i style={{marginLeft:'-50px'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
          </div>
       </div>
      
       <Row style={{margin:'0px auto'}}  >
                   { allProjects.length>0 ? allProjects.map((project)=>(
                   
                         <Col sm={12} md={4} >
                         <ProjectCard project={project}/>
                        </Col>
                     
                   )) :null}
                    
                   
                </Row>
                </div>
    </div>
  )
}

export default Projects