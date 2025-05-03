import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import React from 'react'


interface PatientCardProps {
    id: string;
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    address: string;
    isActive: boolean;
    medicalHistory: string;
    clearSelectedPatient: () => {}

}

const SelectedPatientCard = ({ id, name, age, gender, phone, email, address, isActive, medicalHistory, clearSelectedPatient }: PatientCardProps) => {
    return (
        <div className='border-l h-full p-2 shadow-lg flex flex-col items-end animate-pulse transition ease-in-out duration-700'>
            <Button className='w-10' onClick={clearSelectedPatient}>
                <X />
            </Button>
            <div className='flex flex-col'>
                <div className={`w-18 border-3 p-2 font-semibold rounded mt-3 text-gray-900 text-center ${isActive 
                        ? "bg-gradient-to-r from-gray-300 to-green-400 border-green-400"
                        : "bg-gradient-to-r from-gray-300 to-red-400 border-red-400"}`}>{isActive ? "Active" : "Inactive"}</div>
            </div>
        </div>
    )
}

export default SelectedPatientCard