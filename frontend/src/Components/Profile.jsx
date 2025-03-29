import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfile from './UpdateProfile';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/Hooks/useGetAppliedJobs';


const isResume = true;

const Profile = () => {
    const { user } = useSelector((store) => store.auth);
    const [open, setOpen] = useState(false);
    useGetAppliedJobs()

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-28 w-28">
                            <AvatarImage
                                src={user.profile.profilePhoto}
                                alt="profile"
                            />
                        </Avatar>
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-2">{user?.profile?.bio || 'No bio available'}</p>
                        </div>
                    </div>
                    <Button
                        className="text-right flex items-center gap-1"
                        variant="outline"
                        onClick={() => setOpen(true)}
                    >
                        Edit <Pen />
                    </Button>
                </div>
                <div className="my-5 space-y-3">
                    <div className="flex items-center gap-3">
                        <Mail className="text-gray-600" />
                        <span className="text-gray-800">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Contact className="text-gray-600" />
                        <span className="text-gray-800">{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className="my-5">
                    <h2 className="font-semibold text-lg text-gray-800">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills?.length
                            ? user?.profile?.skills.map((skill, index) => (
                                  <Badge key={index} className="bg-purple-200 text-purple-800">
                                      {skill}
                                  </Badge>
                              ))
                            : 'No skills available'}
                    </div>
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className="text-md font-semibold text-gray-800">Resume</Label>
                    {console.log(user?.profile?.resume)} 
                    {isResume ? (
                        <a
                            target="_blank"
                            href={user?.profile?.resume}
                            
                            className="text-blue-500 hover:underline"
                            >
                            
                           {user?.profile?.resumeOriginalName}
                        </a>
                        
                    ) : (
                        <span className="text-gray-500">No resume uploaded</span>
                    )}
                </div>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-2xl my-5 p-8 shadow-lg">
                <h2 className="font-bold text-xl text-gray-800 my-5">Applied Jobs</h2>
                <AppliedJobTable />
            </div>

            <UpdateProfile open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
