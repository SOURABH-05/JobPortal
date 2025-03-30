
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const JobsTable = () => {

  const { adminJobs } = useSelector(store => store.jobs);

  const { searchByJob } = useSelector(store => store.jobs);

  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(adminJobs);

  useEffect(() => {
    if (!searchByJob?.trim()) {
      setFilteredJobs(adminJobs); // Show all jobs when search is empty
    } else {
      const filtered = adminJobs.filter(jobs =>
        jobs?.title?.toLowerCase().includes(searchByJob.toLowerCase()) || jobs?.company?.name?.toLowerCase().includes(searchByJob.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [adminJobs, searchByJob]); // Onl
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of your recently created jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3">Company Name</TableHead>
            <TableHead className="px-6 py-3">Role</TableHead>
            <TableHead className="px-6 py-3">Date</TableHead>
            <TableHead className="px-6 py-3 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredJobs.map(adminJobs => (
            <TableRow key={adminJobs._id}>
              {/* <TableCell className="px-6 py-4">
                <Avatar>
                  <AvatarImage src={company.logo} alt={`${company.name} Logo`} className="w-12 h-12 rounded-full" />
                </Avatar>
              </TableCell> */}
              <TableCell className="px-6 py-4">{adminJobs?.company?.name}</TableCell>
              <TableCell className="px-6 py-4">{adminJobs?.title}</TableCell>
              <TableCell className="px-6 py-4">{adminJobs?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white shadow-lg rounded-lg p-2">
                    <div
                      onClick={() => navigate(`/admin/createjob${adminJobs.id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${adminJobs._id}/applicants`)}
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-gray-100 rounded px-2 py-1"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Applicants</span>
                    </div>
                  </PopoverContent>


                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;

