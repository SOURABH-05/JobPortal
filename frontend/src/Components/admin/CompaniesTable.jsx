

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies = [], searchCompanyByText } = useSelector(store => store.company);
  const navigate = useNavigate();
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  useEffect(() => {
    if (!searchCompanyByText?.trim()) {
      setFilteredCompanies(companies); // If search is empty, show all companies
    } else {
      const filtered = companies.filter(company =>
        company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [companies, searchCompanyByText]); // Re-run when `companies` or `searchCompanyByText` changes

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableCaption>A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-3">Logo</TableHead>
            <TableHead className="px-6 py-3">Name</TableHead>
            <TableHead className="px-6 py-3">Date</TableHead>
            <TableHead className="px-6 py-3 text-end">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCompanies.map(company => (
            <TableRow key={company._id}>
              <TableCell className="px-6 py-4">
                <Avatar>
                  <AvatarImage src={company.logo} alt={`${company.name} Logo`} className="w-12 h-12 rounded-full" />
                </Avatar>
              </TableCell>
              <TableCell className="px-6 py-4">{company.name}</TableCell>
              <TableCell className="px-6 py-4">{company.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="px-6 py-4 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white shadow-lg rounded-lg p-2">
                    <div 
                      onClick={() => navigate(`/admin/companySetUp/${company._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded px-2 py-1"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Edit</span>
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

export default CompaniesTable;

