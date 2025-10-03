import { Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mic, Send } from 'lucide-react'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import AIMultiModel from './AIMultiModel'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import AIModelList from '@/shared/AIModelList'
import axios from 'axios'

const ChatInputBox = () => {
    const[userInput, setUserInput] = useState("");
    const{messages, aiSelectedModels, setAiSelectedModels,setMessages} = useContext(AiSelectedModelContext);
    const premiumModels = useMemo(() => new Set(AIModelList.filter(m => m.premium).map(m => m.model)), []);
 
 const handleSend = async () => {
   if (!userInput || !userInput.trim()) return;

   // 1️⃣ Add user message to all enabled models
   setMessages((prev) => {
     const updated = { ...prev };
     Object.keys(aiSelectedModels).forEach((modelKey) => {
       updated[modelKey] = [
         ...(updated[modelKey] ?? []),
         { role: "user", content: userInput },
       ];
     });
     return updated;
   });

   const currentInput = userInput; // capture before reset
   setUserInput("");

    //2️⃣ Fetch response from each enabled model
   Object.entries(aiSelectedModels).forEach(
     async ([parentModel, modelInfo]) => {
       if (!modelInfo.modelId) return;

       if (premiumModels.has(parentModel)) {
         // Show upgrade message instead of calling API
         setMessages((prev) => ({
           ...prev,
           [parentModel]: [
             ...(prev[parentModel] ?? []),
             {
               role: "assistant",
               content: "This is a premium model. Upgrade to unlock responses.",
               model: parentModel,
               loading: false,
               locked: true,
             },
           ],
         }));
         return;
       }

       // Add loading placeholder before API call
       setMessages((prev) => ({
         ...prev,
         [parentModel]: [
           ...(prev[parentModel] ?? []),
           {
             role: "assistant",
             content: "Thinking...",
             model: parentModel,
             loading: true,
           },
         ],
       }));

       try {
         const result = await axios.post("/api/ai-multi-model", {
           model: modelInfo.modelId,
           msg: [{ role: "user", content: currentInput }],
           parentModel,
         });

         const { aiResponse, model } = result.data;

         // 3️⃣ Add AI response to that model’s messages
         setMessages((prev) => {
           const updated = [...(prev[parentModel] ?? [])];
           const loadingIndex = updated.findIndex((m) => m.loading);

           if (loadingIndex !== -1) {
             updated[loadingIndex] = {
               role: "assistant",
               content: aiResponse,
               model,
               loading: false,
             };
           } else {
             // fallback if no loading msg found
             updated.push({
               role: "assistant",
               content: aiResponse,
               model,
               loading: false,
             });
           }

           return { ...prev, [parentModel]: updated };
         });
       } catch (err) {
         console.error(err);
         setMessages((prev) => ({
           ...prev,
           [parentModel]: [
             ...(prev[parentModel] ?? []),
             { role: "assistant", content: "⚠️ Error fetching response." },
           ],
         }));
       }
     }
   );
 };

   useEffect(()=>{
     console.log(messages);
   },[messages]);
 
 
    return (
    <div className='relative min-h-screen pb-28'>

        {/* Page Content */}
        <div>
             <AIMultiModel/>
        </div>

         {/* Fixed Chat Input */}
        <div className='fixed bottom-0 left-0 w-full z-50'>
          <div className='flex justify-center px-4 py-4'>
            <div className='w-full max-w-3xl rounded-2xl border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg p-3'>
              <div className='flex items-center gap-2'>
                <Button className='' variant="ghost" size="icon">
                  <Paperclip className='h-5 w-5'/>
                </Button>
                <input
                  type="text" 
                  placeholder='Ask me anything...'
                  className='flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground'
                  value={userInput}
                  onChange={(event)=> setUserInput(event.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
                />
                <div className='flex gap-1'>
                  <Button variant="ghost" size="icon"> <Mic/> </Button>
                  <Button className='bg-purple-600 text-white hover:bg-purple-700' size="icon" onClick={handleSend}> <Send/> </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default ChatInputBox