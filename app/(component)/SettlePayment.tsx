import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { getUnsettlledDates, settlePayments } from '@/action/patientAction';
import { DateRange } from "react-day-picker"

interface SettlePaymentProps {
    patient: any;
}

const SettlePayment = ({ patient }: SettlePaymentProps) => {
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState<DateRange | undefined>()
    const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

    const fetchUnsettlledDates = async () => {
        const dates = await getUnsettlledDates(patient.id);
        const normalizedDates = dates.map(
            (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())
        )
        console.log(normalizedDates)
        setHighlightedDates(normalizedDates);
    }

    const settlePayment = async() => {
        await settlePayments(patient.id, range?.from!, range?.to!);
        setOpen(false);
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={fetchUnsettlledDates} variant="secondary" className='border-gray-600'>
                    Settle Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-3xl min-h-96">
                <DialogHeader>
                    <DialogTitle>Settle Payment for {patient.name}</DialogTitle>
                    <DialogDescription>
                        Select the date range to settle the payment.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex">
                    <Calendar
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        className="rounded-lg border"
                        modifiers={{
                            highlighted: highlightedDates,
                        }}
                        modifiersClassNames={{
                            highlighted:
                                "bg-green-200 rounded-md",
                        }}
                    />
                    <div className="text-sm">
                        <p className="font-medium">Selected Range:</p>
                        <p>
                            From: {range?.from?.toDateString() ?? "-"}
                        </p>
                        <p>
                            To: {range?.to?.toDateString() ?? "-"}
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={settlePayment}>Settle</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SettlePayment