import Navbar from '@/shared/Navbar'
import { Label } from '@radix-ui/react-label'
import { Input } from "@/components/ui/input"
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/Constent/contest.js'
import React, { useState } from 'react'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from '@/redux/authslice'

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector(store=>store.auth)
    const [input, setInput] = useState({
        
        email: "",
        password: "",
        role: "",
       
      });
    
      const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
    const handleSubmit = async(e) => {
        e.preventDefault();
       
        setInput({
         
          email: "",
          password: "",
          role: "",
          
         
        });
        try {
   dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/login`,input, {
            headers: { "Content-Type":"application/json" },
            withCredentials: true,
          });
    
          if (res.data.success) {
            dispatch(setUser(res.data.user));
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          toast.error(error.response?.data?.message);
        }finally{
              dispatch(setLoading(false))
            }
      };


  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto'>

        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          

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
            <Label>Password</Label>
            <Input
              type="password"
              onChange={changeEventHandler}
              value={input.password}
              name="password"
              placeholder="abc@1234a"
            />
          </div>

          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" checked={input.role === "student"}
                  onChange={changeEventHandler} value="student" className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" checked={input.role === "recruiter"}
                  onChange={changeEventHandler} value="recruiter" className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>

            </RadioGroup>
            
          </div>
    <div>
     { 
                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</Button>  :
                 <Button type="submit" className="w-full my-4 bg-black text-white">Sign Up</Button>
                 }
      <span className='text-sm'>Dont't have an account? <Link to="/signup" className="text-blue-600">signup</Link></span>
    </div>
        </form>


      </div>
    </>
  )
}

export default Login



