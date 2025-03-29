import React from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector(store => store.application);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'accepted':
        return 'bg-green-500 text-white';
      case 'rejected':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div>
      {appliedJobs.length > 0 ? (
        <Table>
          <TableCaption>A list of your applied jobs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.job.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item.job.title}</TableCell>
                <TableCell>{item.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-6 text-gray-500">
          No jobs have been applied yet.
        </div>
      )}
    </div>
  );
};

export default AppliedJobTable;
