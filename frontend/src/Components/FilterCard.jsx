
import React, { useEffect, useState } from 'react'
import { RadioGroupItem, RadioGroup } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobslice'


const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai","karnal"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer" ,"frontend"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]
 
          

const FilterCard = () => {
    const dispatch = useDispatch();
      const [selectedValue,setSelectedValue] = useState("")
 
      const changeRadioHandler = (value)=>{
          setSelectedValue(value)
      }

      useEffect(()=>{
          dispatch(setSearchQuery(selectedValue))
      },[selectedValue])

  return (
    <div className='w-full bg-white p-3 rounded-md'>
        <h1 className='font-bold text-lg'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value = {selectedValue}  onValueChange={changeRadioHandler}>
            {
                filterData.map((data,index)=>(
                    <div>

                        <h1 className='font-bold text-lg'>{data.filterType}</h1>
                        {
                         data.array.map((item,idx)=>{
                            const itemId = `id${idx}-${index}`
                            return(
                                <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item} id={itemId}/>
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            )
                         })   
                        }
                    </div>
                ))
            } 
        </RadioGroup>
    </div>
  )
}

export default FilterCard