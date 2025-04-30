import { deleteNote } from '@/action/noteAction';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/utils/commonFunctions';
import { Pin, Trash2 } from 'lucide-react';
import React from 'react'

interface StickyNoteProps {
    id: string;
    color: string;
    title: string;
    content: string;
    createdAt: string;
    removeNote: (id: string) => void;
}

const StickyNoteCard = ({ id, color, title, content, createdAt, removeNote }: StickyNoteProps) => {


    return (
        <div
            style={{ backgroundColor: color }}
            key={id}
            className="p-3 w-48 h-48 rounded-md shadow-md rotate-4 relative transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-xl hover:rotate-2"
        >
            <Button className="absolute top-2 right-2" variant="ghost" size="icon" onClick={() => removeNote(id)}>
                <Trash2 size={15} />
            </Button>
            <Pin className="absolute top-2 left-2 rotate-45 text-yellow-500" size={24} />
            <h2 className="font-bold text-lg mb-2 mt-6 text-center">{title}</h2>
            <p className="text-gray-700 text-sm text-center px-2">{content}</p>
            <span className="absolute bottom-2 right-3 text-xs text-gray-500">{formatDate(createdAt)}</span>
        </div>
    )
}

export default StickyNoteCard


StickyNoteCard.Skeleton = function SkeletonStickyNoteCard() {
    return (
        <div className="animate-pulse p-3 w-48 h-48 rounded-md shadow-md bg-muted rotate-4 relative flex flex-col justify-between">
            <Skeleton className="h-5 w-3/4 mx-auto mt-6" />
            <Skeleton className="h-4 w-5/6 mx-auto mt-4" />
            <Skeleton className="h-4 w-2/3 mx-auto mt-2" />
            <Skeleton className="h-3 w-1/2 mx-auto mt-6 mb-2" />
        </div>
    )
}