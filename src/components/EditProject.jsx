import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../Services/baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editProjectAPI } from '../Services/allAPI';
import { editProjectResponseContext } from '../Contexts/ContextShare';

function EditProject({project}) {
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [show, setShow] = useState(false);

    const [projectDetails,setProjectDetails] = useState({
        id:project._id,
        title:project.title,languages:project.languages,overview:project.overview,github:project.github,website:project.website,projectImage:""
      })

      const [previewImg,setPreviewImg] = useState("")
 //state for holding image file when onchange the image

    const handleClose = () => {
        setShow(false);
        setProjectDetails({
            id:project._id,
            title:project.title,
            languages:project.languages,
            overview:project.overview,
            github:project.github,
            website:project.website,
            projectImage:""
          })
          setPreviewImg("")
        
      }
      const handleShow = () => setShow(true);


      useEffect(()=>{
        if(projectDetails.projectImage){
           setPreviewImg(URL.createObjectURL(projectDetails.projectImage))
        }
      },[projectDetails.projectImage])
      // console.log(preview);

      const handleUpdate = async ()=>{
        const {id,title,languages,overview,github,website,projectImage} =projectDetails
        if(!title ||!languages ||!overview ||!github|| !website) {
          toast.info("Please Fill the form completly!!!")
        }else{
          const reqBody = new FormData()
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("overview",overview)
          reqBody.append("github",github)
          reqBody.append("website", website)
          previewImg?reqBody.append("projectImage",projectImage):reqBody.append("prjectImage",project.projectImage)
          const token = sessionStorage.getItem("token")
          if(previewImg){
            const reqHeader = {
              "content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            // api call
            const result = await editProjectAPI(id,reqBody,reqHeader)
            if(result.status ===200){
              handleClose()
              // pass response to myproject
              setEditProjectResponse(result.data)
            }else{
              console.log(result);
              toast.error(result.response.data)
            }
          }else{
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
             // api call
             const result = await editProjectAPI(id,reqBody,reqHeader)
             if(result.status ===200){
               handleClose()
               // pass response to myproject
               setEditProjectResponse(result.data)

             }else{
               console.log(result);
               toast.error(result.response.data)
             }
          }
        }
      
      }
  return (
    <>
    
    <button onClick={handleShow} className='btn'><i class="fa-solid fa-pen-to-square fa-2x"></i></button>
    
    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
                <div className="col-lg-6">
                    <label>
                        <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}  />
                        <img className='img-fluid' src={previewImg?previewImg:`${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                    </label>
                </div>
                <div className="col-lg-6">
                        <div className='mb-3'><input  type="text" className="form-control" placeholder='Project Title' value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} /></div>

                        <div className='mb-3'><input type="text" className="form-control" placeholder='Languague Used' value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})}  /></div>

                        <div className='mb-3'><input type="text" className="form-control" placeholder='GitHub Link' value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})}   /></div>

                        <div className='mb-3'><input type="text" className="form-control" placeholder='Website Link' value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})}  /></div>
                </div>
                <div className="mb-3">
                <input type="text" className="form-control" placeholder='Project Overview' value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} />
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate} >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default EditProject