import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext,} from '../Contexts/ContextShare';
import EditProject from './EditProject';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function MyProjects() {
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [userProjects,setUserProjects] = useState([])
  const {editProjectResponse,setEditProjectResponse} =useContext(editProjectResponseContext)
  // const {deleteProjectResponse,setDeleteProjectResponse} =useContext(deleteProjectResponseContext)

  const getUserProjects = async ()=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem('token')
      
      const reqHeader = {
        'Content-Type':'application/json',
        "Authorization":`Bearer ${token}`
      }
      const result = await userProjectAPI(reqHeader)
      if(result.status ===200){
        setUserProjects(result.data)
      }else{
        // console.log(result);
        toast.warning(result.response.data)
      }
    }
    
  }

  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])


  const handleDelete = async (id)=>{
    const token = sessionStorage.getItem("token")
    const reqHeader = {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    const result = await deleteProjectAPI(id,reqHeader)
    console.log(result);
    if(result.status===200){
      //page reload
      getUserProjects()
      // setDeleteProjectResponse(result.data)
    }else{
      toast.error(result.response.data)
    }
  }

  // console.log(userProjects);
  return (
    <div><div className='d-flex justify-content-between '>
    <h4>My Projects</h4>
    <div><AddProject /></div>
    </div>
    <div>
      {userProjects?.length>0?userProjects.map((project)=>(
        <div className="card mt-3">
        <div className='d-flex justify-content-between p-3'>
          <h5 className='text-success'>{project.title}</h5>
          <div className='d-flex justify-content-between'>
          
          <EditProject project={project}/>
          <a href={`${project.github}`} target='_blank' className='btn text-dark'><i class="fa-brands fa-github fs-3 me-3"></i></a>
          <button onClick={(e)=>handleDelete(project._id)} className='btn text-dark'><i class="fa-solid fa-trash fs-3"></i></button>
          </div>
          </div>
      </div>
  ))
      :
      <div>
        <p className='text-danger fs-4'>No Projects Here...</p>
      </div>
      }
      
    </div>
    <ToastContainer position='top-right' autoClose={2000} theme="colored" />
    </div>
  )
}

export default MyProjects