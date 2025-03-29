import Navbar from '@/shared/Navbar';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom'; // Correct import for Navigate
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/Constent/contest';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companyslice';

const CompaniCreate = () => {
  // Use the navigate hook
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyaName] = useState('')
  

  const registerCompany = async()=>{

    try {
      
      const res = await axios.post(`${COMPANY_API_END_POINT}/registerCompany`, { companyName }, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });
      console.log(res)
      if(res?.data?.success){
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const companyId = res.data.company._id
        navigate(`/admin/companySetUp/${companyId}`)
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p>What would you like to give your company name? You can change this later.</p>
        </div>

        {/* Company Name Input */}
        <Label>Company Name</Label>
        
        <Input
          type="text"
          className="my-2"
          placeholder="jobHunt, Microsoft etc."
          onChange = { (e)=>setCompanyaName(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          {/* Cancel Button */}
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          {/* Continue Button */}
          <Button   onClick={registerCompany} className="bg-black text-white">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniCreate;
