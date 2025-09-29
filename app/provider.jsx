"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'
import React, { useState, useEffect } from "react";import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { setDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { AiSelectedModelContext } from '@/context/AiSelectedModelContext'
import { DefaultModel } from '@/shared/AiModelsShared'

function Provider({
    children, ...props
}) {
  
const { user } = useUser();
const { db } = require("../config/FirebaseConfig");  const[aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);

 
  useEffect(()=>{

    if(user){
      createNewUser();
    }
},[user]);

  const createNewUser = async () => {
    
    
    const userRef = doc(db,"users",user?.primaryEmailAddress?.emailAddress);
    const userSnap = await getDoc(userRef);
    
    if(userSnap.exists()){
      console.log("User already exists" );
    }
    else{
      const userData = {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        createdAt: new Date(),
        updatedAt: new Date(),
        remainingMsg: 5,
        credits:1000,
        plan:'Free',

      }
      await setDoc(userRef,userData);
      console.log("New user created");

    }
  }
  return (
    <NextThemesProvider  {...props}
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>

       <AiSelectedModelContext.Provider value={{aiSelectedModels, setAiSelectedModels}}>        
        <SidebarProvider>
            <AppSidebar/>
            
              <div className='w-full'>
                  <AppHeader/>
                   {children}
              </div>
        </SidebarProvider>
        </AiSelectedModelContext.Provider>
   
    </NextThemesProvider>
    
  )
}

export default Provider