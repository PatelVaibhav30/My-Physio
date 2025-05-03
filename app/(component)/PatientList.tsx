"use client";
import { changePatientStatus, getPatients } from '@/action/patientAction';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { formatDate } from '@/utils/commonFunctions';
import { CircleSmall, Mail, MapPin, PhoneCall, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import SelectedPatientCard from './SelectedPatientCard';

const PatientList = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [masterPatients, setMasterPatients] = useState<any[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<any>(null);

    useEffect(() => {
        const fetchPatients = async () => {
            const doctorId = localStorage.getItem('userId');
            try {
                const patients = await getPatients(doctorId || "");
                console.log(patients)
                setPatients(patients);
                setMasterPatients(patients); // Store the original list of patients
            }
            catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        fetchPatients();
    }, [])

    const toggleActive = async (patientId: string, status: boolean) => {
        try {
            await changePatientStatus(patientId, status);
            setPatients((prev) =>
                prev.map((patient) =>
                    patient.id === patientId ? { ...patient, isActive: status } : patient
                )
            );
            toast.success(`Patient status changed to ${status ? "Active" : "Inactive"}`);

        } catch (error) {
            console.error('Error toggling patient status:', error);
            toast.error("Error occured while changing patient status.");

        }
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        let masterCopy = [...masterPatients];
        if (searchTerm === '') {
            setPatients(masterCopy);
            return;
        }

        const filteredPatients = masterCopy.filter((patient) =>
            patient.name.toLowerCase().includes(searchTerm)
        );

        setPatients(filteredPatients);
    }

    const clearSelectedPatient = () => {
        setSelectedPatient(null)
    }


    return (
        <div className={`grid ${selectedPatient ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
            <div className='max-h-[400px] overflow-y-auto hide-scrollbar'>
                <div className='w-full flex items-center justify-end gap-1 my-4'>
                    <Search className='text-green-400' size={20} />
                    <Input
                        type="text"
                        placeholder="Search patient..."
                        onChange={handleSearch}
                        className='w-1/3 border-gray-600'
                    />
                </div>
                {patients && patients.length > 0 ?
                    patients.map((patient) => (
                        <div onClick={() => setSelectedPatient(patient)} className='overflow-x-auto mb-2 bg-gray-100 hover:bg-gray-300/50 p-2 flex items-start justify-between rounded-md'>
                            <div className='fex flex-col'>
                                <p className='font-bold'>{patient.name}</p>
                                <span className='text-sm italic font-stretch-50% text-gray-600'>{`${patient.gender === "M" ? "Male" : "Female"} ${patient.age}`}</span>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-2'>
                                    <PhoneCall className='text-green-400' size={15} />
                                    <span className='font-semibold'>{patient.phone}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm italic font-stretch-50% text-gray-600'>
                                    <Mail className='text-blue-400' size={15} />
                                    <span>{patient.email}</span>
                                </div>
                                <div className='flex items-center gap-2 text-sm italic font-stretch-50% text-gray-600'>
                                    <MapPin className='text-red-400' size={15} />
                                    <span className='text-gray-800 text-xs'>{patient.address}</span>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>

                                <Label htmlFor="patient-status">
                                    <CircleSmall className={`${patient.isActive ? "text-green-400" : "text-red-400"}`} size={25} />
                                    {patient.isActive ? "Active" : "Inactive"}
                                </Label>
                                <Switch checked={patient.isActive} onCheckedChange={(checked) => toggleActive(patient.id, checked)} id="patient-status" />
                                <span className='text-sm italic font-stretch-50% text-gray-600'>{formatDate(patient.createdAt, "time")}</span>
                            </div>
                        </div>
                    ))
                    :
                    (
                        <div>

                        </div>
                    )

                }
            </div>

            {selectedPatient && (
                <div className=''>
                    <SelectedPatientCard {...(selectedPatient as any)} clearSelectedPatient={clearSelectedPatient} />
                </div>
            )}
        </div>
    )
}

export default PatientList