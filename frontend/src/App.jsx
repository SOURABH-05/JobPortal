
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import  Home  from './Components/Home'
import Login from './Components/auth/Login'
import Singhup from './Components/auth/Signup'
import Jobs from './Components/Jobs'
import Browse from './Components/Browse'
import Profile from './Components/Profile'
import Jobdescription from './Components/Jobdescription'
import Companies from './Components/admin/Companies'
import CompaniCreate from './Components/admin/CompaniCreate'
import CompanySetUp from './Components/admin/CompanySetUp'
import AdminJobs from './Components/admin/AdminJobs'
import CreateNewJob from './Components/admin/CreateNewJob'
import Applicants from './Components/admin/Applicants'
import ProtectedRoute from './Components/admin/ProtectiveRoutes'

function App() {
const appRouter = createBrowserRouter([
{
  path:'/',
  element: <Home/>
},

{
  path:'/login',
  element:<Login/>
},

{
  path:'/signup',
  element:<Singhup/>
},

{
  path:'/jobs',
  element:<Jobs/>
},

{
  path:'/browse',
  element:<Browse/>
},
{
  path:'/profile',
  element:<Profile/>
},
{
  path:'/Jobdescription/:id',
  element:<Jobdescription/>
},



{
  path:'/admin/companies',
  element:<ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:'/admin/createcompany',
  element:<ProtectedRoute><CompaniCreate/></ProtectedRoute> 
},
{
  path:'/admin/jobs',
  element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
},


{
  path:'/admin/companySetUp/:id',
  element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
},
{
  path:'/admin/createjob',
  element:<ProtectedRoute><CreateNewJob/></ProtectedRoute>
},
{
  path:'/admin/jobs/:id/applicants',
  element:<ProtectedRoute><Applicants/></ProtectedRoute>
},






])

  return (
    <>
    <RouterProvider router={appRouter}/>
     
    </>
  )
} 

export default App
