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
            include: {
                _count: {
                    select: {
                        Visits: {
                            where: { isSettled: false }
                        }
                    }
                }
            }
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

export async function getUnsettlledDates(patientId: string) {
    try {
        const visits = await db.visits.findMany({
            where: { patientId, isSettled: false },
            select: { visitDate: true },
        });

        const dates = visits.map(visit => visit.visitDate);
        return dates;
    } catch (error) {
        console.error('Error in getUnsettlledDates:', error);
        throw new Error('Error while fetching unsettled dates.');
    }
}

export async function settlePayments(patientId: string, fromDate: Date, toDate: Date) {
    try {
        const start = new Date(
            Date.UTC(
                fromDate.getFullYear(),
                fromDate.getMonth(),
                fromDate.getDate(),
                0, 0, 0
            )
        )

        const end = new Date(
            Date.UTC(
                toDate.getFullYear(),
                toDate.getMonth(),
                toDate.getDate(),
                23, 59, 59, 999
            )
        )
        await db.visits.updateMany({
            where: {
                patientId,
                visitDate: {
                    gte: start,
                    lte: end
                },
                isSettled: false
            },
            data: { isSettled: true }
        });
    } catch (error) {
        console.error('Error in settlePayments:', error);
        throw new Error('Error while settling payments.');
    }
}