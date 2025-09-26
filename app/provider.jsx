import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'
import AppHeader from './_components/AppHeader'

function Provider({
    children, ...props
}) {
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