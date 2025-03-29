import { createSlice } from '@reduxjs/toolkit'


 const jobSlice = createSlice({
  name: 'jobs',
  initialState:{
   alljob:[],
   singleJob:null,
   adminJobs:[],
   searchByJob: "",
   searchQuery:""
   
  },
  reducers: {
    
    setAllJob: (state, action) => {
      state.alljob = action.payload;
    },
    
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },

    setSearchByJob: (state, action) => {
      state.searchByJob = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },




  },
});

// Action creators are generated for each case reducer function
export const { setAllJob,setSingleJob,setAdminJobs,setSearchByJob,setSearchQuery} = jobSlice.actions;

export default jobSlice.reducer


