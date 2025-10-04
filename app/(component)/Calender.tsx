"use client";
import React, { useState, useMemo, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { set, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getPatients } from "@/action/patientAction";
import { toast } from "react-hot-toast";
import { addVisit, getVisitsForCalendar } from "@/action/visitAction";

export type PatientVisitData = {
    patientId: string;
    doctorId: string;
    visitDate: Date | string;
    notes: string;
};


const Calender = () => {

    const gradientStops = ["#22577a", "#38a3a5", "#57cc99", "#80ed99", "#9ef01a", "#c7f9cc"];
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [title, setTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [patients, setPatients] = useState<any[]>([]);
    const [masterPatients, setMasterPatients] = useState<any[]>([]);
    const [visits, setVisits] = useState<any[]>([]);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<PatientVisitData>({
        defaultValues: {
            patientId: "",
            doctorId: "",
            visitDate: selectedDate || new Date(),
            notes: "",
        }
    });
    const patientId = watch("patientId");

    const handlePatientSelect = (patient: string) => {
        setValue("patientId", patient);
    };

    const handleDateClick = (info: any) => {
        setSelectedDate(info.date);
        setTitle("");
        setIsModalOpen(true);
    };

    useEffect(() => {
        const doctorId = localStorage.getItem('userId');
        const fetchPatients = async () => {
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

        const fetchVisits = async () => {
            const visits = await getVisitsForCalendar(doctorId || "");
            setVisits(visits);
        }
        fetchPatients();
        fetchVisits();
    }, [])

    // const onSubmit = async (data: PatientVisitData) => {
    //     debugger
    //     const updatedData = { ...data, visitDate: new Date(data.visitDate), doctorId: localStorage.getItem("userId") || "" };

    //     try {
    //         await addVisit(updatedData);
    //         reset();
    //         console.log(patients.find((patient) => patient.id === updatedData.patientId)?.name)
    //         console.log(selectedDate?.toISOString().split("T")[0])
    //         setVisits([
    //             ...visits,
    //             {
    //                 title: patients.find((p) => p.id === updatedData.patientId)?.name || "Unknown",
    //                 date: selectedDate ? selectedDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
    //             },
    //         ]);
    //         setIsModalOpen(false);
    //         toast.success("Patient visit added");
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Error occurred while adding patient.");
    //     }

    // };

    function formatLocalDate(date: Date) {
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const d = date.getDate().toString().padStart(2, "0");
        return `${y}-${m}-${d}`; // "YYYY-MM-DD" in local time
    }

    const onSubmit = async (data: PatientVisitData) => {
        debugger;
        try {
            if (!selectedDate) return;

            // Convert selectedDate to YYYY-MM-DD string (all-day)
            const visitDateStr = formatLocalDate(selectedDate);

            const updatedData = {
                ...data,
                doctorId: localStorage.getItem("userId") || "",
                // convert to JS Date at UTC midnight
                visitDate: new Date(visitDateStr + "T23:00:00"),
            };

            await addVisit(updatedData);
            reset();

            setVisits([
                ...visits,
                {
                    title: patients.find((p) => p.id === updatedData.patientId)?.name || "Unknown",
                    date: visitDateStr, // local YYYY-MM-DD
                },
            ]);

            setIsModalOpen(false);
            toast.success("Patient visit added");
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while adding patient.");
        }
    };


    // Build mapping: date → list of event titles (for consistent index lookup)
    const visitsByDate = useMemo<Record<string, string[]>>(() => {
        const map: Record<string, string[]> = {};
        visits.forEach((ev) => {
            if (!map[ev.date]) map[ev.date] = [];
            map[ev.date].push(ev.title); // store by title to check index later
        });
        return map;
    }, [visits]);

    function renderEventContent(eventInfo: any) {
        const date = eventInfo.event.startStr.split("T")[0];
        const visitsForDate = visitsByDate[date] || [];

        const total = visitsForDate.length;
        const index = visitsForDate.indexOf(eventInfo.event.title);

        // pick stops only up to the number of events
        const stops = gradientStops.slice(0, total);

        // if only one event -> solid color
        const gradient =
            total === 1
                ? stops[0]
                : `linear-gradient(to bottom, ${stops.join(", ")})`;

        // each event gets its slice of the gradient
        const sliceStart = (index / total) * 100;
        const sliceEnd = ((index + 1) / total) * 100;

        return (
            <div
                className="px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold shadow-md text-white"
                style={{
                    background: gradient,
                    backgroundSize: `100% ${total * 100}%`,
                    backgroundPosition: `0 ${sliceStart}%`,
                    backgroundClip: "padding-box",
                }}
            >
                {eventInfo.event.title}
            </div>
        );
    }

    return (
        <div className="p-3 sm:p-6">
            {/* Calendar Wrapper */}
            <div className="overflow-x-auto max-w-full">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={visits}
                    dateClick={handleDateClick}
                    eventContent={renderEventContent}
                    height="auto"
                />
            </div>

            {/* Modal */}
            <div className='relative m-auto flex items-center justify-center mt-4'>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild className="hidden">
                        <Button variant="outline" className='border-gray-600'>
                            Add visit
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-xl">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Add Visit</DialogTitle>
                                <DialogDescription>
                                    {selectedDate ? selectedDate.toDateString() : ""}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                                <div className="flex-1">
                                    <Label>Patient</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full mt-2">
                                                {patients.find((patient) => patient.id === patientId)?.name || "Select Patient"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Select Patient</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {patients.map((patient) => (
                                                <DropdownMenuItem key={patient.id} onClick={() => handlePatientSelect(patient.id)}>
                                                    {patient.name}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <input type="hidden" {...register("patientId", { required: "Patient is required" })} />
                                    {errors.patientId && <span className="text-red-500 text-xs">{errors.patientId.message}</span>}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default Calender