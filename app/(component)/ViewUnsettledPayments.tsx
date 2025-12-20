"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';


const ViewUnsettledPayments = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className='flex items-center justify-end'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" className='border-gray-600'>
                        View unsettled payments
                    </Button>
                </DialogTrigger>
                <DialogContent className="min-w-5xl">
                    {/* Table here */}
                    
                </DialogContent>
            </Dialog>
        </div>
  )
}

export default ViewUnsettledPayments