import React, { useEffect, useState } from 'react'
import Designer from '../Assets/designer.png'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header';
import { homeProjectAPI } from '../Services/allAPI'

function Home() {

    const [isLogedin,setIsLogedin] =useState(false)
    const [homeProjects,setHomeProjects] =useState([])

    const getAllProjects = async ()=>{
        const result = await homeProjectAPI()
        if(result.status ===200){
            setHomeProjects(result.data)
        }else{
            console.log(result);
        }
    }

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsLogedin(true)
        }else{
            setIsLogedin(false)
    }

    //api-all
    getAllProjects()
    },[])
    console.log(homeProjects);
    
  return (
    <>
     <Header />
        <div className='p-5  w-100 bg-success'>
            <Row className='d-flex align-items-center justify-content-center'>
                <Col sm={12} md={6}>
                    <div className='text-light'>
                        <h1>Project Fair</h1>
                        <p className='fw-lighter'>One stop destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website...What are you waiting for!!!</p>
                        {isLogedin?
                        
                        <Link to={'/dashboard'} className="btn btn-dark">Manage Your Projects</Link>:
                        <Link to={'/login'} className="btn btn-dark">Start to Explore</Link>
  }
                    </div>
                </Col>
                <Col sm={12} md={6}>
                    <div>
                        <img src={Designer} alt="" />
                    </div>
                </Col>
            </Row>
        </div>

        <div className='m-5'>
            <div className="heading text-center mb-5">
                <h1>Explore Our Projects</h1>
            </div>
            <marquee scrollAmount={15}>
                <Row>
                   { homeProjects.length>0 ? homeProjects.map((project)=>(
                   
                         <Col sm={12} md={4} >
                         <ProjectCard project={project}/>
                        </Col>
                     
                   )) :null}
                    
                   
                </Row>
            </marquee>

            <div className='text-center mt-5'>
                {
                isLogedin ? <Link to={'/projects'} className='btn btn-dark'>View More Projects</Link>:<Link to={'/login'} className='btn btn-dark'>View More Projects</Link>
}
            </div>
        </div>
    </>
  )
}

export default Home