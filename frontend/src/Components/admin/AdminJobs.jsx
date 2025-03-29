import Navbar from '@/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companyslice'
import JobsTable from './JobsTable'
import useGetAdminJobs from '@/Hooks/useGetAdminJobs'
import { setSearchByJob } from '@/redux/jobslice'

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  

  useGetAdminJobs();
const [input,setInput] = useState("")

   
   useEffect(()=>{
       dispatch(setSearchByJob(input))
    },[input])

  return (
    <>
    <Navbar/>
    <div className='max-w-6xl mx-auto my-10'>

      <div className='flex items-center justify-between'>
          <Input
          className="w-fit"
          placeholder= "filter by name and role"
          onChange = {(e)=>setInput(e.target.value)}
        
          />
          <Button onClick={()=> navigate("/admin/createjob")} className="bg-black text-white" >New Job +</Button>
      </div>
      <div className='mt-5'>
         <JobsTable/>

      </div>
    </div>
    
    </>
  )
}

export default Companies