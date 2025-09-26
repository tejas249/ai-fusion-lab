import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
const AppHeader = () => {
  return (
    <div className='p-3 w-full shadow-md flex justify-between items-center'>
        <SidebarTrigger/>
        <Button> Sign IN</Button>
    </div>
  )
}

export default AppHeader