import React from 'react'
// import Header from '../(component)/Header'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from '../(component)/Sidebar'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen bg-gray-100'>
            {/* <Header /> */}
            <SidebarProvider>
                <AppSidebar open={true} />
                <SidebarTrigger className='cursor-pointer'/>
                <main className='min-w-0 w-full px-3 pt-12 sm:px-4'>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default layout