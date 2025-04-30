"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Frown, SquarePlus } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createNote, deleteNote, getNotes } from '@/action/noteAction'
import { colors } from '@/utils/commonFunctions'
import toast from 'react-hot-toast'
import StickyNoteCard from './StickyNoteCard'

interface NoteProps {
    userid: string;
    userAddedNotes?: any[]
}


const Notes = ({ userid }: NoteProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [userAddedNotes, setUserAddedNotes] = useState<any[]>([]);


    useEffect(() => {
        if (!open) {
            fetchNotes();
        }
    }, [open]);

    const fetchNotes = async () => {
        setLoading(true);
        const notes = await getNotes(userid);
        setUserAddedNotes(notes);
        setLoading(false);
    };

    const handleColorClick = (color: string) => {
        setSelectedColor(color);
    };

    const handleSave = async () => {
        if (!title || !description || !selectedColor) {
            toast.error('Please fill title and description');
            return;
        }

        try {
            await createNote(title, description, selectedColor, userid);
            setOpen(false);
            setTitle("");
            setDescription("");
            setSelectedColor("");

            // TODO: Optionally, refresh the list of notes
            toast.success("Note added");
        } catch (error) {
            console.error(error);
            toast.error("Error occurred while adding note");
        }
    };

    const removeNote = async (id: string) => {
        try {
            await deleteNote(id);
            toast.success("Note deleted");
            fetchNotes();

        } catch (error) {
            console.error(error);
            toast.error("Error occurred while deleting note");
        }

    }

    return (
        <div className='mt-4 p-4 h-80 w-full shadow-md border-2 rounded-lg flex flex-col relative'>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className={`absolute right-4 w-32 h-32 bg-gray-100 rounded-md shadow-md flex flex-col items-center justify-start cursor-pointer hover:bg-gray-300 transition duration-200 ease-in-out ${userAddedNotes.length === 5 ? "pointer-events-none" : ""}`}>
                        <h2 className="font-semibold text-md mt-2 text-center">{userAddedNotes.length === 5 ? "Limit reached! " : "Add note"}</h2>
                        <Frown size={50} className={`text-gray-400 ${userAddedNotes.length !== 5 ? "hidden" : ""}`} />
                        <span className={`${userAddedNotes.length === 5 ? "hidden" : ""} text-sm text-gray-800`}>{5 - userAddedNotes.length} remaining</span>
                        <SquarePlus size={50} className={`text-gray-400 ${userAddedNotes.length === 5 ? "hidden" : ""}`} />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Note</DialogTitle>
                        <DialogDescription>
                            Select your favorite color
                            <div className="flex flex-wrap gap-2 py-4">
                                {colors.map((color) => (
                                    <div
                                        key={color}
                                        className={`w-10 h-10 rounded-full cursor-pointer border-2 ${selectedColor === color ? 'border-black' : 'border-transparent'}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorClick(color)}
                                    />
                                ))}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSave}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className='mt-12 flex items-center justify-start gap-4'>

                {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <StickyNoteCard.Skeleton key={i} />
                    ))
                ) : userAddedNotes.length > 0 ? (
                    userAddedNotes.map((note) => (
                        <StickyNoteCard
                            key={note.id}
                            id={note.id}
                            color={note.color}
                            title={note.title}
                            content={note.content}
                            createdAt={note.createdAt}
                            removeNote={removeNote}
                        />
                    ))
                ) : (
                    <div className='text-xl font-semibold absolute left-[20%] top-[50%]'>
                        <p >Add notes for quick reminders!</p>
                        <p className='text-gray-300'>Add upto 5 notes</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Notes