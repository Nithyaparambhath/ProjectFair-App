import React, { useEffect, useState } from 'react'
import Collapse from 'react-bootstrap/Collapse';
import { BASE_URL } from '../Services/baseurl';
import { editUserAPI } from '../Services/allAPI';

function Profile() {
    const [open, setOpen] = useState(false);
    const [userProfile,setUserProfile]  =useState({
      username:"",
        email:"",
        password:"",
        profile:"",
        github:"",
        linkedin:""
    })
    const [existingImage,setExistingImage]  =useState("") //alredy have an prof pic that hold in existingImage
    const [previewImg,setPreviewImg]  =useState("") //updated data converted in url that store previewImg

    useEffect(()=>{
      const user = JSON.parse(sessionStorage.getItem('existingUser'))

      // if(user.profile!==""){
      //   setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedIn:user.linkedIn})
      //   setExistingImage(user.profile)
      // }else{
      //   setExistingImage("https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain")
      // }
      setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,profile:"",github:user.github,linkedin:user.linkedin})
      setExistingImage(user.profile)
    },[open])

    useEffect(()=>{
      if(userProfile.profile){
        setPreviewImg(URL.createObjectURL(userProfile.profile))

      }else{
        setPreviewImg("")
      }
    },[userProfile.profile])

    const handleProfileUpdate = async ()=>{
      const {username,email,password,profile,github,linkedin} = userProfile
   
      if(!github ||!linkedin){
        alert("Please fill the form completely!")
      }else{
          const reqBody = new FormData()
          reqBody.append("username",username)
          reqBody.append("email",email)
          reqBody.append("password",password)
          reqBody.append("github",github)
          reqBody.append("linkedin",linkedin)
          previewImg?reqBody.append("profileImage",profile):reqBody.append("profileImage",existingImage)
          const token = sessionStorage.getItem("token")
          if(previewImg){
            const reqHeader = {
              "content-Type":"multipart/form-data",
              "Authorization":`Bearer ${token}`
            }
            const res = await editUserAPI(reqBody,reqHeader)
            if(res.status===200){
              setOpen(!open)
              sessionStorage.setItem("existingUser",JSON.stringify(res.data))
            }else{
              setOpen(!open)
              console.log(res);
              console.log(res.response.data);

            }
          }else{
            const reqHeader = {
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`
            }
          }
         
      }
    }

    
  return (
    <div>
          <div  className='d-flex justify-content-center align-items-center flex-column border shadow rounded p-3' >
                  <div className='d-flex justify-content-between w-100'>
                    <h2>Profile</h2>
                    <button onClick={() => setOpen(!open)} className='btn btn-outline-success border'><i class="fa-solid fa-chevron-down fa-beat-fade"></i></button>
                    </div>
                  <Collapse in={open}>
                      <div>
                          <div className='d-flex justify-content-center'>
                              <label >
                                <input type="file" style={{display:'none'}} onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})}/>
                            {existingImage!==""?

                                <img style={{width:'130px'}} src={previewImg?previewImg:`${BASE_URL}/uploads/${existingImage}`} alt="pic" />
                                :
                                <img style={{width:'130px'}} src={previewImg?previewImg:"https://th.bing.com/th/id/OIP.Gfp0lwE6h7139625a-r3aAHaHa?rs=1&pid=ImgDetMain"} alt="pic" />
                            }
                              </label>
                          </div>
                          <div>
                            <input type="text" placeholder='Github' className='form-control rounded' value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} />
                          </div>
                          <div>
                            <input type="text" placeholder='Linkedin' className='form-control rounded' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
                          </div>
                          {/* <div>
                            <input type="text" placeholder='LinkedIn' className='form-control rounded mt-2' value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} />
                          </div> */}
                          <div>
                            <input onClick={handleProfileUpdate} type="btn" value='Update' className='btn btn-dark mt-2 ' />
                          </div>
                      </div>
                  </Collapse>
                </div>
    </div>
  )
}

export default Profile