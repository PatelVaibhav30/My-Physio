"use server"
import { PatientVisitData } from "@/app/(component)/Calender";
import { db } from "@/utils/dbConfig";

export async function addVisit(visitData: PatientVisitData) {
    try {
        await db.visits.create({ data: visitData })
    } catch (error) {
        console.error('Error in addPatient:', error);
        throw new Error('Error while adding patient.');
    }
}

export async function getVisitsForCalendar(doctorId: string) {
    try {
        const visits = await db.visits.findMany({
            where: { doctorId },
            include: {
                patient: { select: { name: true } }, // fetch patient name
            },
            orderBy: { visitDate: "asc" },
        });

        // Map to FullCalendar format
        const events = visits.map((v) => ({
            title: v.patient.name,
            date: v.visitDate.toISOString().split("T")[0],
            id: v.id,                      
            notes: v.notes,
        }));

        return events;
    } catch (error) {
        console.error("Error fetching visits for calendar:", error);
        throw new Error("Could not fetch visits");
    }
}