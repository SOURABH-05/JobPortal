import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { LogOut, User2 } from "lucide-react";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/Constent/contest";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";

const Navbar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async() =>{
   try {
    const res = await axios.post(`${USER_API_END_POINT}/Logout`,  {
     
      withCredentials: true,
      
    });
    
    if (res.data.success) {
      dispatch(setUser(null));
      navigate("/");
      toast.success(res.data.message)
      
    }
   } catch (error) {
    console.log(error)
   }

  }

  const {user} = useSelector(store=>store.auth)
  return (
    <div className="bg-white shadow-md   sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 h-16">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium text-gray-700 items-center gap-6">
     
        {
          user && user.role === "recruiter" ?
          (
            <>
            <Link to="/admin/companies"> <li className="hover:text-[#F83002] transition cursor-pointer">companies</li> </Link> 
            <Link  to="/admin/jobs"><li className="hover:text-[#F83002] transition cursor-pointer">Jobs</li></Link>
            </>
          ):
          (
            <>
        <Link to="/"> <li className="hover:text-[#F83002] transition cursor-pointer">Home</li> </Link> 
        <Link  to="/jobs"><li className="hover:text-[#F83002] transition cursor-pointer">Jobs</li></Link> 
        <Link to="/browse"><li className="hover:text-[#F83002] transition cursor-pointer">Browse</li></Link>
            </>
          )
        }
         

          </ul>

          { 
          !user ? (

            <div className="flex items-center gap-2">
              <Link to="/login" > <Button variant='outline' >Login</Button></Link>
                 <Link to="/signup"><Button className ="text-white bg-[#6A38C2] hover:bg-[#5b30a6]">Singhup</Button></Link>

              </div>
          ) : (


          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="w-11 h-11 overflow-hidden rounded-full cursor-pointer border-2 border-gray-200 hover:border-[#F83002] transition">
                <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4 rounded-lg shadow-lg bg-white border">
              <div className="flex gap-3 items-center border-b pb-3">
                <Avatar className="w-12 h-12 overflow-hidden rounded-full border">
                  <AvatarImage src={user.profile.profilePhoto} alt="@shadcn" />
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-800">{user.fullname}</h4>
                  <p className="text-sm text-gray-500">{user.profile.bio}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-3">

        {
            user && user.role === "student" && (

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <User2 className="text-gray-600" />
                  <Button variant="link" className="text-gray-700"><Link to="/profile">View Profile</Link></Button>
                </div>

            )
        }


                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  <LogOut className="text-red-600" />

                  <Button variant="link" className="text-red-600" onClick={handleClick}>Log Out</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          )
          
          }
            
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;
