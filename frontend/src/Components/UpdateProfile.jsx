import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/Constent/contest';
import { setLoading, setUser } from '@/redux/authslice';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const UpdateProfile = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false); // Close the dialog when the button is clicked
  };

  const {loading} = useSelector(store=>store.auth)
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth)
  const[input,setInput]=useState(
    {
        fullname:user?.fullname,
        phoneNumber:user?.phoneNumber,
        email:user?.email,
        bio:user?.profile?.bio,
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.file
    } 
  )

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
 
  const submitHandler = async(e)=>{
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("fullname", input.fullname)
    formdata.append("email", input.email)
    formdata.append("phoneNumber", input.phoneNumber)
    formdata.append("bio", input.bio)
    formdata.append("skills", input.skills)
    if (input.file) {
      formdata.append("file", input.file)
    }

    try {
        dispatch(setLoading(true))
        const res = await axios.post(`${USER_API_END_POINT}/upateprofile`, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          });
          if(res.data.success){
              
              dispatch(setUser(res.data.user))
              toast.success(res.data.message);

          }
    } catch (error) {
       toast.error(error.response.data.message);
        
    }finally{
        dispatch(setLoading(false))

    }
    setOpen(false);
      console.log(input);
  }
  
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white rounded-lg shadow-lg p-4 sm:p-5 max-w-screen-sm mx-auto">
          <DialogHeader className="border-b pb-3 mb-3">
            <DialogTitle className="text-lg font-semibold text-gray-800">Update Profile</DialogTitle>
            <DialogDescription className="text-xs text-gray-500">
              Please update your personal details below. Make sure to fill out all necessary fields.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="grid gap-3 py-2">
              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-xs font-medium text-gray-700">Name</Label>
                <Input
                  id="name"
                  name="fullname"
                  onChange={changeEventHandler}
                  value={input.fullname}
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-xs font-medium text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  onChange={changeEventHandler}
                  value={input.email}
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Bio Field */}
              <div>
                <Label htmlFor="bio" className="text-xs font-medium text-gray-700">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  onChange={changeEventHandler}
                  value={input.bio}
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <Label htmlFor="phoneNumber" className="text-xs font-medium text-gray-700">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  value={input.phoneNumber}
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Skills Field */}
              <div>
                <Label htmlFor="skills" className="text-xs font-medium text-gray-700">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  onChange={changeEventHandler}
                  value={input.skills}
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>

              {/* Resume Field */}
              <div>
                <Label htmlFor="resume" className="text-xs font-medium text-gray-700">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={changeFileHandler}
                  value={input.resume}
                  accept="application/pdf"
                  className="col-span-3 mt-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
                />
              </div>
            </div>

            {/* Dialog Footer with only the Save Changes Button */}
            <div className="mt-4">

            { 
                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</Button>  :
                 <Button type="submit" className="w-full text-sm bg-black text-white rounded-lg hover:bg-gray-800">Save Changes</Button>
                 }
              {/* <Button
                type="submit"
                className="w-full text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                >
                Save Changes
              </Button> */}
            </div>
          </form>
        </DialogContent>
                  
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
