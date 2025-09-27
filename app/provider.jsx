"use client"
import React, { use } from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'
import { useUser } from '@clerk/nextjs'
import { setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { doc } from 'firebase/firestore'

function Provider({
    children, ...props
}) {
  
  const { user } = useUser();
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
        <SidebarProvider>
            <AppSidebar/>
            
              <div className='w-full'>
                  <AppHeader/>
                   {children}
              </div>
        </SidebarProvider>
   
    </NextThemesProvider>
    
  )
}

export default Provider