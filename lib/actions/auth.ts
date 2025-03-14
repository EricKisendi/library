'use server'

import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import { users } from "@/database/schema";

export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params;

    try {
        const result = await signIn("credentials",{
            email,
            password,
            redirect: false
        });

        if (result?.error) {
            return {
                success: false, error: result.error
            }
        }

        return {
            success: true,
        }
        
    } catch (error) {
        console.log(error, "Sign in error");
        return {
            message: "Invalid email or password",
        };
        
    }
}

export const signUp = async (params: AuthCredentials) => {
    const { fullName, email, universityId, password, universityCard } = params;

    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return {
            message: "Email already exists",
        }
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            password: hashedPassword,
            universityCard,
        });

    await signInWithCredentials({ email, password });

    return {
            message: "Sign up successful",
        };
        
    } catch (error) {
        console.log(error, "Sign up error");
        return {
            message: "Sign up failed",
    }
    }
};