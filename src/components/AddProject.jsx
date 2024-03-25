import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';
import { useContext, useEffect, useState } from 'react';
import { addProjectResponseContext } from '../Contexts/ContextShare';
import {Button} from 'react-bootstrap'
function AddProject() {
  
  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [projectDetails,setProjectDetails] = useState({
    title:"",
    languages:"",
    overview:"",
    github:"",
    website:"",
    projectImage:""
  })
  const [previewImg,setPreviewImg] = useState("")

  const [token,setToken]  =useState("")

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreviewImg(URL.createObjectURL(projectDetails.projectImage))
    }
      },[projectDetails.projectImage])

      useEffect(()=>{
        if(sessionStorage.getItem("token")){
          setToken(sessionStorage.getItem("token"))
        }
      },[])


    const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  //  console.log(projectDetails);
  const handleClose= ()=>{
    setShow(false)
   
      setProjectDetails({
        title:"",
        languages:"",
        overview:"",
        github:"",
        website:"",
        projectImage:""
      })
      setPreviewImg("")
     
    
  }

  const handleAdd =async (e)=>{
    
    const {title,languages,overview,github,website,projectImage} = projectDetails
     if(!title ||!languages || !overview ||!github ||!website||!projectImage ){
      toast.warning("Please fill the form completly")
     }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      if(token){
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        const result = await addProjectAPI(reqBody,reqHeader)
        if(result.status === 200){
          console.log(result.data);
          handleClose()
          alert("project added")
          setAddProjectResponse(result.data)
        }else{
          console.log(result.response.data);
        }
      }
     
      
     }
  }
  return (
    <div>
        <button onClick={handleShow} className='btn btn-success'>Add Projects</button>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
                <label>
                    <input type="file" style={{display:'none'}} onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} />
                    <img style={{width:'100%'}} src={previewImg?previewImg:"https://www.independentmediators.co.uk/wp-content/uploads/2016/02/placeholder-image.jpg" }alt="" />
                    </label>
            </div>
            <div className="col-lg-6">
                <div>
                    <input type="text" className='form-control ' placeholder='Project Title' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} />
                    <input type="text" className='form-control mt-3' placeholder='Languages Used' value={projectDetails.languages} onChange={(e)=>setProjectDetails({...projectDetails,languages:e.target.value})} />
                    <input type="text" className='form-control mt-3' placeholder='Github Link' value={projectDetails.github} onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} />
                    <input type="text" className='form-control mt-3' placeholder='Website Link' value={projectDetails.website} onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})}  />
                    <input type="text" className='form-control mt-3' placeholder='Overview' value={projectDetails.overview} onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} />
                </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd}  variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-right' autoClose={2000} theme="colored" />
    </div>
  )
}

export default AddProject