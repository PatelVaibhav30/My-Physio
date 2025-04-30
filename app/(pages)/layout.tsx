import React from 'react'
import Sidebar from '../(component)/Sidebar'
import Header from '../(component)/Header'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Sidebar open={true} />
            <Header />
            <main className='pl-64 pt-5'>
                {children}
            </main>
        </div>
    )
}

export default layout