import { getPatientCount, getSettledEarning, getUnsettledEarning } from '@/action/dashboardAction';
import { createUser } from '@/action/userAction';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import DashboardClient from '@/app/mobile-views/DashboardClient';
import React from 'react'

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
    const user = await createUser(session?.user?.name || "Anonymous", session?.user?.email || "anonymous@example.com", "");


    const patientCount = await getPatientCount(session?.user?.email);
    const settledEarning = await getSettledEarning(session?.user?.email);
    const unsettledEarning = await getUnsettledEarning(session?.user?.email);

    return <DashboardClient
        displayName={user.name}
        patientCount={patientCount}
        settledEarning={settledEarning}
        unsettledEarning={unsettledEarning}
        userId={user.id}
    />;
}
