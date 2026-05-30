'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { DateRange } from "react-day-picker";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { getPatientVisitDates } from '@/action/visitAction';

interface GenerateInvoiceProps {
    patient: any;
}

export type PatientInvoiceFormData = {
    name: string;
    age: string;
    diagnosis?: string;
    advisedBy: string;
    treartmentDuration: number;
    perdayCharge: number;
    totalPayableAmount: number;
};

const GenerateInvoice = ({ patient }: GenerateInvoiceProps) => {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>();
    const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

    console.log("Patient in GenerateInvoice:", patient);

    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<PatientInvoiceFormData>({
        defaultValues: {
            name: patient.name || "",
            age: patient.age || "",
            diagnosis: "",
            advisedBy: "",
            treartmentDuration: 0,
            perdayCharge: patient.perdayCharge || 0,
            totalPayableAmount: 0,
        }
    });

    const perdayCharge = watch('perdayCharge');

    const normalizeDate = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Calculate treatment duration from date range and highlighted visit dates
    useEffect(() => {
        if (!range?.from || !range?.to) {
            setValue('treartmentDuration', 0);
            setValue('totalPayableAmount', 0);
            return;
        }

        const start = normalizeDate(range.from);
        const end = normalizeDate(range.to);
        const count = highlightedDates.filter((visitDate) => {
            const normalizedVisit = normalizeDate(visitDate);
            return normalizedVisit.getTime() >= start.getTime() && normalizedVisit.getTime() <= end.getTime();
        }).length;

        setValue('treartmentDuration', count);
        setValue('totalPayableAmount', count * perdayCharge);
    }, [range, highlightedDates, perdayCharge, setValue]);


    // Fetch invoiceable dates for patient and setHighlightedDates
    const fetchInvoiceableDates = async () => {
        try {
            const dates = await getPatientVisitDates(patient.id);
            setHighlightedDates(dates);
        } catch (error) {
            console.error('Error fetching visit dates:', error);
        }
    };

    //Generate invoice for patient for selected range
    const generateInvoice = async () => {
        const formData = watch();

        if (!range?.from || !range?.to) {
            window.alert('Please select a valid date range before generating the invoice.');
            return;
        }

        const start = normalizeDate(range.from);
        const end = normalizeDate(range.to);

        const formatDateWithSuffix = (date: Date) => {
            const day = date.getDate();
            const suffix = (d: number) => {
                const mod100 = d % 100;
                if (mod100 >= 11 && mod100 <= 13) return 'th';
                return d % 10 === 1 ? 'st' : d % 10 === 2 ? 'nd' : d % 10 === 3 ? 'rd' : 'th';
            };
            const monthYear = date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
            return `${String(day).padStart(2, '0')}${suffix(day)} ${monthYear}`;
        };

        const sessions = highlightedDates
            .map((date) => normalizeDate(date))
            .filter((visitDate) => visitDate.getTime() >= start.getTime() && visitDate.getTime() <= end.getTime())
            .sort((a, b) => a.getTime() - b.getTime())
            .map((visitDate) => ({
                date: visitDate.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                amount: Number(formData.perdayCharge || 0),
            }));

        if (sessions.length === 0) {
            window.alert('No visit dates found in the selected range. Please choose a different range.');
            return;
        }

        const invoiceData = {
            name: formData.name,
            age: formData.age,
            diagnosis: formData.diagnosis || '-',
            advisedBy: formData.advisedBy || '-',
            treatmentDuration: Number(formData.treartmentDuration || sessions.length),
            chargePerSession: Number(formData.perdayCharge || 0),
            totalPayableAmount: Number(formData.totalPayableAmount || sessions.length * Number(formData.perdayCharge || 0)),
            rangeFrom: formatDateWithSuffix(start),
            rangeTo: formatDateWithSuffix(end),
            sessions,
            generatedAt: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        };

        try {
            const response = await fetch('/api/generate-invoice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(invoiceData),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Failed to generate invoice PDF: ${response.status} ${response.statusText} - ${text}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${formData.name.replace(/\s+/g, '-')}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setOpen(false);
        } catch (error) {
            console.error('PDF generation error:', error);
            window.alert(`Unable to download invoice. ${error instanceof Error ? error.message : ''}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={fetchInvoiceableDates} variant="outline" className='ml-2'>
                    Invoice
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-3xl min-h-96">
                <DialogHeader>
                    <DialogTitle>Generate Invoice for {patient.name}</DialogTitle>
                    <DialogDescription>
                        Select the date range to generate the invoice.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-3">
                    <Calendar
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        className="rounded-lg border"
                        modifiers={{
                            highlighted: highlightedDates,
                        }}
                        modifiersClassNames={{
                            highlighted: "bg-blue-200 rounded-md",
                        }}
                    />
                    <div className="space-y-4 flex-1">
                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Name of the patient"
                                    {...register("name", { required: "Name is required" })}
                                    className="w-full mt-2"
                                    disabled
                                />
                            </div>

                            <div>
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="text"
                                    placeholder="Age of the patient"
                                    {...register("age", { required: "Age is required" })}
                                    className="w-full mt-2"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label htmlFor="diagnosis">Diagnosis</Label>
                                <Input
                                    id="diagnosis"
                                    type="text"
                                    placeholder="Diagnosis details"
                                    {...register("diagnosis")}
                                    className="w-full mt-2"
                                />
                            </div>

                            <div>
                                <Label htmlFor="advisedBy">Advised By</Label>
                                <Input
                                    id="advisedBy"
                                    type="text"
                                    placeholder="Doctor or therapist name"
                                    {...register("advisedBy")}
                                    className="w-full mt-2"
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label htmlFor="treartmentDuration">Treatment Duration (Visits)</Label>
                                <Input
                                    id="treartmentDuration"
                                    type="number"
                                    placeholder="Count of visited dates in range"
                                    {...register("treartmentDuration")}
                                    className="w-full mt-2"
                                    disabled
                                />
                            </div>

                            <div>
                                <Label htmlFor="perdayCharge">Per Day Charge</Label>
                                <Input
                                    id="perdayCharge"
                                    type="number"
                                    placeholder="Per day charge"
                                    {...register("perdayCharge")}
                                    className="w-full mt-2"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-3'>
                            <div>
                                <Label htmlFor="totalPayableAmount">Total Payable Amount</Label>
                                <Input
                                    id="totalPayableAmount"
                                    type="number"
                                    placeholder="Total amount"
                                    {...register("totalPayableAmount")}
                                    className="w-full mt-2"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <DialogFooter>
                    <Button onClick={generateInvoice}>Generate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GenerateInvoice;