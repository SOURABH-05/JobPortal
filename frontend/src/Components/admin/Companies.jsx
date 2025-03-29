import Navbar from '@/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '@/Hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companyslice'

const Companies = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompany();

  const [input,setInput] = useState(" ")
        
  useEffect(()=>{
         dispatch(setSearchCompanyByText(input))
  },[input])

  return (
    <>
    <Navbar/>
    <div className='max-w-6xl mx-auto my-10'>

      <div className='flex items-center justify-between'>
          <Input
          className="w-fit"
          placeholder= "filter by name"
          onChange = {(e)=>setInput(e.target.value)}
          />
          <Button onClick={()=> navigate("/admin/createcompany")} className="bg-black text-white" >New Company</Button>
      </div>
      <div className='mt-5'>
         <CompaniesTable/>

      </div>
    </div>
    
    </>
  )
}

export default Companies