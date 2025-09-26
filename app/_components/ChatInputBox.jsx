import { Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mic, Send } from 'lucide-react'
import React from 'react'
import AIMultiModel from './AIMultiModel'

const ChatInputBox = () => {
  return (
    <div className='relative min-h-screen'>

        {/*. Page Content */}
        <div>
             <AIMultiModel/>
        </div>

         {/*. Fixed Chat Input */}
        <div className=' flex fixed bottom-0 left-0 w-full justify-center px-4 pb-4'>
            <div className='w-full border rounded-xl shadow-md max-w-2xl p-4'>
                <input
                 type="text" 
                 placeholder='Ask me anything...' 
                 className='border-0 outline-none'
                 />

                 <div className='mt-3 flex justify-between items-center'>
                    <Button className='' variant="ghost" size="icon">
                        <Paperclip className='h-5 w-5'/>
                    </Button>
                    <div className='flex gap-3'>
                        <Button variant="ghost" size="icon"> <Mic/> </Button>
                        <Button className={'bg-purple-600'} size="icon"> <Send/> </Button>
                    </div>
                 </div>


            </div>
        </div>





    </div>
  )
}

export default ChatInputBox