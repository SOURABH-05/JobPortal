import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/Constent/contest";
import { toast } from "sonner";

const ApplicantsTable = () => {
    const {allApplicants} = useSelector(store=>store.application)

    
  const shortListingStatus = [
    {
      label: "Accepted",
      color: "bg-green-500 hover:bg-green-600 text-white",
      icon: <CheckCircle className="w-4 h-4 mr-2" />,
    },
    {
      label: "Rejected",
      color: "bg-red-500 hover:bg-red-600 text-white",
      icon: <XCircle className="w-4 h-4 mr-2" />,
    },
  ];


  const statusChangeHandler = async(status,id)=>{
           try {
            const res = await axios.put(`${APPLICATION_API_END_POINT}/updatestatus/${id}`, {status},{withCredentials:true})
            
            if(res.data.success){
                
              toast.success(res.data.message)
            }
           } catch (error) {
             toast.error(error.response.data.message)
           }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of your recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {
            allApplicants.applications.map((item)=>{
         return(

          <TableRow key={item._id}>
            <TableCell>{item?.applicant?.fullname}</TableCell>
            <TableCell>{item?.applicant?.email}</TableCell>
            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
            <TableCell>
              <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline cursor-pointer">
              {item?.applicant?.profile?.resumeOriginalName}
              </a>
            </TableCell>
            <TableCell>{item?.applicant?.createdAt.split("T")[0]}</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-36 p-2">
                  {shortListingStatus.map((status, index) => (
                    <Button
                      key={index}
                      className={`w-full flex items-center justify-start my-1 ${status.color}`}
                      onClick={() => statusChangeHandler(status.label, item._id)}

                    >
                      {status.icon}
                      {status.label}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
         )
            })
        }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
