import React, { useEffect, useState } from 'react'

import { Loader } from '../ui/loader'

export const Step3 = ({ formData, setFormData }) => {
  const [displayInfo, setDisplayInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFetch = async () => {
    const response = await fetch("https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/dev/url")
    return response.json()
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await handleFetch()
        setDisplayInfo(data)
        console.log(data)
      } catch (err) {
        console.error("Error fetching data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Loader loading={isLoading} text="Fetching lecture information..." />
      <h1 className='font-medium text-lg text-center uppercase mb-4'>Course details</h1>
      <div className='border-2 p-4 mx-auto border-gray-700 rounded-md text-center'>
        <h1 className='font-medium text-lg'>{displayInfo?.term_display}</h1>
        <h1 className='font-medium text-lg'>{displayInfo?.subject_class}, {displayInfo?.section_title}</h1>
        <h1 className="font-medium text-lg">
            {displayInfo?.instructors?.join(', ')}
        </h1>


        <p className='font-normal text-lg'>{displayInfo?.status_text}, {displayInfo?.waitlist_text}</p>

      </div>
    </>
  )
}
