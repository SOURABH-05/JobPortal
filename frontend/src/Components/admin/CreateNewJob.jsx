import Navbar from '@/shared/Navbar';
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { JOB_API_END_POINT } from '@/Constent/contest';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '@/redux/authslice';
import { Loader2 } from 'lucide-react';
import { Select,SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue, } from '@radix-ui/react-select';



const CreateNewJob = () => {
    const { companies } = useSelector(store => store.company);
    const {loading} = useSelector(store=>store.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId : ""
    })

    const onChangeEventHandler = (e) => {
       
        setInput({ ...input, [e.target.name]: e.target.value });

    }

    const changeSelectHandler = (value)=>{
          const selectCompany = companies.find((company) => company.name.toLowerCase() === value)
          setInput({...input, companyId:selectCompany._id})
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${JOB_API_END_POINT}/jobpost`,input,{withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })

            if(res.data.success){
                navigate("/admin/jobs")
                 toast.success(res.data.message)
            }
            
        } catch (error) {
            toast.error(error.response.error.message)
        }finally{
            dispatch(setLoading(false))
        }
        
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center mt-20">
                <form onSubmit={onSubmitHandler} className="relative p-6 max-w-2xl w-full border border-gray-300 shadow-lg rounded-lg bg-white h-auto max-h-[85vh] overflow-y-auto">
                    <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                        Create New Job
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Title</Label>
                            <Input type="text"
                                name="title"
                                value={input.title}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Location</Label>
                            <Input type="text"
                                name="location" className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black"
                                
                            value={input.location}
                            onChange = {onChangeEventHandler}
                                />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Salary</Label>
                            <Input type="text"
                                name="salary"
                                value={input.salary}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Requirements</Label>
                            <Input type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Job Type</Label>
                            <Input type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">Experience Level</Label>
                            <Input type="text"
                                name="experience"
                                value={input.experience}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div>
                            <Label className="text-gray-700 text-sm font-medium">No. of Positions</Label>
                            <Input type="number"
                                name="position"
                                value={input.position}
                                onChange={onChangeEventHandler}
                                className="border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black" />
                        </div>
                        <div className="col-span-2 relative">
                            <Label className="text-gray-700 text-sm font-medium">Select Company</Label>
                            <Select onValueChange={changeSelectHandler}>
                                <SelectTrigger  className="w-full border border-gray-600 rounded-md text-sm py-1 focus:ring-0 focus:border-black">
                                    <SelectValue placeholder="Select a Company" />
                                </SelectTrigger>
                                <SelectContent className="absolute z-50 top-[100%] left-0 w-full bg-white shadow-md rounded-md border border-gray-300">
                                    <SelectGroup>
                                        {companies.length > 0 ? (
                                            companies.map(company => (
                                                <SelectItem key={company.id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                No Companies Available
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    { 
                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</Button>  :
               
                    <Button className="w-full mt-4 bg-black hover:bg-gray-900 text-white font-medium py-1.5 text-sm rounded-md transition duration-300">
                        Post New Job
                    </Button>
                 }
                </form>
            </div>
        </>
    );
};

export default CreateNewJob;
