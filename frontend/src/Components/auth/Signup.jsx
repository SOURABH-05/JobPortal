import Navbar from '@/shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/Constent/contest.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authslice'

import { Loader2 } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate(); 
  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formdata = new FormData();

    formdata.append("fullname", input.fullname)
    formdata.append("email", input.email)
    formdata.append("phoneNumber", input.phoneNumber)
    formdata.append("password", input.password)
    formdata.append("role", input.role)
    if (input.file) {
      formdata.append("file", input.file)
    }

    try {
       dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false))
    }


    





    setInput({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "",
      file: null
    });
  };




  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Sign Up</h1>

          <div className='my-2'>
            <Label>Full Name</Label>
            <Input
              type="text"
              onChange={changeEventHandler}
              value={input.fullname}
              name="fullname"
              placeholder="Sourabh"
            />
          </div>

          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type="email"
              onChange={changeEventHandler}
              value={input.email}
              name="email"
              placeholder="Sourabh@gmail.com"
            />
          </div>

          <div className='my-2'>
            <Label>Phone Number</Label>
            <Input
              type="text"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              name="phoneNumber"
              placeholder="1234567890"
            />
          </div>

          <div className='my-2'>
            <Label>Password</Label>
            <Input
              type="password"
              onChange={changeEventHandler}
              value={input.password}
              name="password"
              placeholder="Enter your password"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                name="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div>

            { 
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</Button>  :
            <Button type="submit" className="w-full my-4 bg-black text-white">Sign Up</Button>
            }
            <span className='text-sm'>
              Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
