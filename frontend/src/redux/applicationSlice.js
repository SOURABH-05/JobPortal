import { createSlice } from '@reduxjs/toolkit'


 const applicationSlice = createSlice({
  name: 'application',
  initialState:{
   
   allApplicants :[],
   appliedJobs: [],

   
  },
  reducers: {
    
    
    setAllApplicants: (state, action) => {
      state.allApplicants = action.payload;
    },

    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    


  },
});

// Action creators are generated for each case reducer function
export const {setAllApplicants,setAppliedJobs} = applicationSlice.actions;

export default applicationSlice.reducer