'use server';
import { db } from "@/utils/dbConfig"

export async function createNote(title: string, content: string, color: string, userId: string) {
    try {
        // Count existing notes for the user
        const userNoteCount = await db.notes.count({
            where: { userId },
        });

        if (userNoteCount >= 5) {
            throw new Error('Note limit reached. You can only add up to 5 notes.');
        }

        // Proceed to create the note
        const note = await db.notes.create({
            data: {
                title,
                content,
                color,
                userId,
            },
        });

        return note;
    } catch (error) {
        console.error('Error in createNote:', error);
        throw new Error('Error while creating note.');
    }
}

export async function getNotes(userId: string) {
    try {
        const notes = await db.notes.findMany({
            where: {
                userId,
            },
        });
        return notes;
    } catch (error) {
        console.error('Error in getNotes:', error);
        throw new Error('Error while fetching notes.');
    }
}

export async function deleteNote(noteId: string) {
    try {
        const note = await db.notes.delete({
            where: {
                id: noteId,
            },
        });
        return note;
    } catch (error) {
        console.error('Error in deleteNote:', error);
        throw new Error('Error while deleting note.');
    }
}
