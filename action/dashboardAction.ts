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