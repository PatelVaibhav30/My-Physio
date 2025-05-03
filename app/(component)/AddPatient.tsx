"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from "react-hook-form";
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';
import { addPatient } from '@/action/patientAction';

export type PatientFormData = {
    doctorId: string;
    name: string;
    age: string;
    gender: "M" | "F" | "";
    email: string;
    address: string;
    phone: string;
    medicalHistory: string;
};

const AddPatient = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<PatientFormData>({
        defaultValues: {
            doctorId: "",
            name: "",
            age: "",
            gender: "",
            email: "",
            address: "",
            phone: "",
            medicalHistory: ""
        }
    });
    const gender = watch("gender");


    const onSubmit = async (data: PatientFormData) => {
        const phoneWithPrefix = `+91-${data.phone}`;
        const updatedData = { ...data, phone: phoneWithPrefix, doctorId: localStorage.getItem("userId") || "" };

        try {
            await addPatient(updatedData);
            reset();
            setOpen(false);
            toast.success("Patient added");
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while adding patient.");
        }

    };

    const handleGenderSelect = (gender: "Male" | "Female") => {
        setValue("gender", gender === "Male" ? "M" : "F");
    };

    return (
        <div className='flex items-center justify-end'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className='border-gray-600'>
                        Add patient
                    </Button>
                </DialogTrigger>
                <DialogContent className="min-w-5xl">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add Patient</DialogTitle>
                            <DialogDescription>
                                Register a new patient by filling the form below.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <input type="hidden" {...register("doctorId")} />
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Name of the patient"
                                        {...register("name", { required: "Name is required" })}
                                        className="w-full mt-2"
                                    />
                                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        placeholder="Age"
                                        {...register("age", {
                                            required: "Age is required",
                                            pattern: { value: /^\d+$/, message: "Age must be a number" },
                                        })}
                                        className="w-full mt-2"
                                    />
                                    {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
                                </div>

                                <div className="flex-1">
                                    <Label>Gender</Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full mt-2">
                                                {gender === "M" ? "Male" : gender === "F" ? "Female" : "Gender"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Select gender</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => handleGenderSelect("Male")}>Male</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleGenderSelect("Female")}>Female</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <input type="hidden" {...register("gender", { required: "Gender is required" })} />
                                    {errors.gender && <span className="text-red-500 text-xs">{errors.gender.message}</span>}
                                </div>
                            </div>
                            <div className='flex items-start justify-between gap-4'>
                                <div className="flex-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Enter a valid email"
                                            }
                                        })}
                                        className="w-full mt-2"
                                    />
                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                </div>

                                <div className="flex-1">
                                    <Label htmlFor="contact">Contact</Label>
                                    <div className="flex items-center mt-2">
                                        <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-sm text-gray-700">
                                            +91
                                        </span>
                                        <Input
                                            placeholder="Phone number"
                                            id="contact"
                                            maxLength={10}
                                            {...register("phone", {
                                                required: "Phone number is required",
                                                maxLength: {
                                                    value: 10,
                                                    message: "Phone number must be 10 digits"
                                                },
                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message: "Phone number must be a 10-digit number"
                                                }
                                            })}
                                            className="w-full rounded-l-none"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <span className="text-red-500 text-xs">{errors.phone.message}</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid flex-col">
                                <Label htmlFor="address">Address</Label>
                                <Textarea
                                    id='address'
                                    placeholder='Address'
                                    {...register("address")}
                                    className='col-span-3 mt-2'
                                />
                                {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                            </div>

                            <div className="grid flex-col">
                                <Label htmlFor="medicalhistory">Medical history</Label>
                                <Textarea
                                    id='medicalhistory'
                                    placeholder='Medical history of patient if any'
                                    {...register("medicalHistory")}
                                    className='col-span-3 mt-2'
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddPatient;
