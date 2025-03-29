import Navbar from '@/shared/Navbar'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '@/Constent/contest'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authslice'
import useGetCompanyByid from '@/Hooks/useGetCompanyByid'
import { setCompanies } from '@/redux/companyslice'

const CompanySetUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const companyId = params.id
    const {loading} = useSelector(store=>store.auth)
    useGetCompanyByid(companyId)
    const {singleCompany} = useSelector(store=>store.company)
    


    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null


    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };
    
    const sumbitHandler = async(e) => {
        e.preventDefault()
        console.log(input)

        const formdata = new FormData();

        formdata.append("name", input.name)
        formdata.append("description", input.description)
        formdata.append("website", input.website)
        formdata.append("location", input.location)

        if (input.file) {
            formdata.append("file", input.file)
        }
        
        try {
            dispatch(setLoading(true));
              const res = await axios.put(`${COMPANY_API_END_POINT}/companyupdate/${companyId}` ,formdata,{
                headers: {
                    "Content-Type": 'multipart/form-data'
                  },
                  withCredentials: true
                });
              
            

            if(res.data.success){
                toast.success(res.data.message)
                navigate("/admin/companies")
            }
        } catch (error) {
           console.log(error)  
        }finally{

            dispatch(setLoading(false));
        }
    }


    useEffect(() => {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null 
      })
      }, []);
      


    return (
        <>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form onSubmit={sumbitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button type="submit" variant="outline" className="flex itme-center bg-black text-white gap-2  font-semibold"
                        onClick = {()=>navigate("/admin/companies")}
                        >
                           
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                            />

                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                            />

                        </div>

                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                            />

                        </div>

                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                            />

                        </div>

                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}

                            />

                        </div>





                    </div>

                    { 
                 loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait...</Button>  :
             
                    <Button type="submit" className="w-full mt-10 bg-black text-white">Update</Button>
                 }


                </form>

            </div>

        </>
    )
}

export default CompanySetUp