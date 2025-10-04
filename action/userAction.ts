import { db } from "@/utils/dbConfig"

export async function createUser(name: string, email: string, password?: string) {
    try {
        const existingUser = await db.users.findUnique({
            where: {email},
        });

        if (existingUser) {
            return existingUser; // ✅ If exists, return
        }

        const newUser = await db.users.create({
            data: {
                name,
                email,
                password,
            },
        });
        return newUser; // ✅ Return the newly created user
    } catch (error) {
        console.error('Error in createUser:', error);
        throw new Error('Error while creating user.');
    }
}

export async function getUserByEmail(email: string) {
    try {
        const user = await db.users.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        throw new Error('Error while fetching user by email.');
    }
}
