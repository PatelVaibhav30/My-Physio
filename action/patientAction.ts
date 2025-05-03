"use server";
import { PatientFormData } from "@/app/(component)/AddPatient";
import { db } from "@/utils/dbConfig";


export async function addPatient(patientData: PatientFormData) {
    try {
        await db.patients.create({ data: patientData })
    } catch (error) {
        console.error('Error in addPatient:', error);
        throw new Error('Error while adding patient.');
    }
}

export async function getPatients(doctorId: string) {
    try {
        const patients = await db.patients.findMany({
            where: { doctorId },
            orderBy: { createdAt: 'desc' },
        });
        return patients;
    } catch (error) {
        console.error('Error in getPatients:', error);
        throw new Error('Error while fetching patients.');
    }
}

export async function changePatientStatus(patientId: string, status: boolean) {
    try {
        await db.patients.update({
            where: { id: patientId },
            data: { isActive: status } as any,
        });
    } catch (error) {
        console.error('Error in changePatientStatus:', error);
        throw new Error('Error while changing patient status.');
    }
}