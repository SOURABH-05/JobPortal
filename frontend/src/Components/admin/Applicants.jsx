import Navbar from '@/shared/Navbar'
import React, { useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { APPLICATION_API_END_POINT } from '@/Constent/contest'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
     const params = useParams();
     const dispatch = useDispatch();
     const {allApplicants} = useSelector(store=>store.application)
    
     useEffect(()=>{
        const fetchAllApplicants = async()=>{

            try {
              const res = await axios.get(`${APPLICATION_API_END_POINT}/getapplicant/${params.id}` , {withCredentials:true})
              if(res.data.success){
               dispatch(setAllApplicants(res.data.job))   
              }
           } catch (error) {
              console.log(error)
           }
            
        }
        fetchAllApplicants();

    },[])
 
  return (
    <>
    <Navbar/>
    <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-5'>Applicants ({allApplicants?.applications?.length})</h1>
      <ApplicantsTable/>
    </div>
    </>
  )
}

export default Applicants