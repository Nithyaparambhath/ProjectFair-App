import React, { useState } from 'react'
import Designer from '../Assets/designer.png'
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../Services/baseurl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose= ()=>{
    setShow(false)
   
      
     
    
  }
  return (
    <>
{project &&<div onClick={handleShow}  className='card shadow text-center mt-3'>
        <img style={{height:'200px'}}   src={project?`${BASE_URL}/uploads/${project?.projectImage}` :Designer} alt="pic" />
        <h5 className='m-3'>{project.title}</h5>


    </div>}

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
                
                    <img style={{width:'100%'}} src={project?`${BASE_URL}/uploads/${project?.projectImage}` :Designer} alt="project-pic" />
                    
            </div>
            <div className="col-lg-6">
                <div>
                    <h2 className='fs-4 fw-bolder'>{project?.title}</h2>
                    <p className='fw-lighter'>{project?.overview}</p>
                    <p>Language Used: <span className='fw-bolder text-danger'>{project.languages}</span> </p>
                    <div className='mt-3'>
                      <a href={project?.github} style={{fontSize:'15px'}} target='_blank'  className='me-2 '><i class="fa-brands fa-github fa-2x"></i></a>
                      <a style={{fontSize:'15px'}} href={project?.website} target='_blank'> <i class="fa-solid fa-link fa-2x"></i></a>
                    </div>
                </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button  variant="primary">Add</Button>
        </Modal.Footer> */}
      </Modal>
    </>
    
  )
}

export default ProjectCard