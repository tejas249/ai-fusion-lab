import React from 'react'
import { Progress } from "@/components/ui/progress"

const UsageCreditProgress = () => {
  return (
    <div className='p-3 border rounded-md mb-5 bg-muted'>
        
        <h2 className='font-bold text-xl '> Free Plan </h2>
        <p className='text-gray-400 flex-col gap-2'> 1/5 Messages Used </p>
        <Progress value={20} />
    </div>
  )
}

export default UsageCreditProgress