import Navbar from '../shared/Navbar'
import React, { useEffect } from 'react'
import HeroSection from "../Components/HeroSection"
import CategoryCarousel from '../Components/CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from '@/shared/Footer'
import useGetAllJobs from "@/Hooks/useGetAllJobs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role === "recruiter") {

      navigate("/admin/companies")
    }

  }, []);




return (
  <>
    <Navbar />
    <HeroSection />
    <CategoryCarousel />
    <LatestJobs />
    <Footer />

  </>
)
}

export default Home