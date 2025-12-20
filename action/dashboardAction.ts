import { db } from "@/utils/dbConfig";

export async function getPatientCount(doctorEmail: string) {
    try {
        const doctor = await db.users.findUnique({
            where: {
            email: doctorEmail,
            },
        });

        if (!doctor) {
            throw new Error("Doctor not found");
        }

        const patientCount = await db.patients.count({
            where: {
            doctorId: doctor.id,
            isActive: true,
            },
        });
        return patientCount;
    }
    catch (error) {
        console.error("Error fetching patients count:", error);
        throw new Error("Could not fetch patients count");
    }
}

// Get total settled earning for a doctor
export async function getSettledEarning(doctorEmail: string) {
    try {
        const doctor = await db.users.findUnique({
            where: { email: doctorEmail },
        });
        if (!doctor) throw new Error("Doctor not found");
        // Find all visits for this doctor that are settled, join with patient for perdayCharge
        const visits = await db.visits.findMany({
            where: { doctorId: doctor.id, isSettled: true },
            include: { patient: true },
        });
        // Sum perdayCharge for each visit
        const total = visits.reduce((sum, v) => sum + (v.patient?.perdayCharge || 0), 0);
        return total;
    } catch (error) {
        console.error("Error fetching settled earning:", error);
        throw new Error("Could not fetch settled earning");
    }
}

// Get total unsettled earning for a doctor
export async function getUnsettledEarning(doctorEmail: string) {
    try {
        const doctor = await db.users.findUnique({
            where: { email: doctorEmail },
        });
        if (!doctor) throw new Error("Doctor not found");
        // Find all visits for this doctor that are unsettled, join with patient for perdayCharge
        const visits = await db.visits.findMany({
            where: { doctorId: doctor.id, isSettled: false },
            include: { patient: true },
        });
        // Sum perdayCharge for each visit
        const total = visits.reduce((sum, v) => sum + (v.patient?.perdayCharge || 0), 0);
        return total;
    } catch (error) {
        console.error("Error fetching unsettled earning:", error);
        throw new Error("Could not fetch unsettled earning");
    }
}