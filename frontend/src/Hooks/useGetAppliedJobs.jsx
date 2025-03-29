import { APPLICATION_API_END_POINT } from '@/Constent/contest'
import { setAppliedJobs } from '@/redux/applicationSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();
 useEffect(()=>{
  const fetchAppliedJobs = async()=>{
      try {
         const res = await axios.get(`${APPLICATION_API_END_POINT}/getappliedjobs` , {withCredentials:true})
         if(res.data.success){
   console.log(res.data.application)
              dispatch(setAppliedJobs(res.data.application))
         }
      } catch (error) {
        console.log(error)
      }
  }
   fetchAppliedJobs() ;  
 },[])
}

export default useGetAppliedJobs