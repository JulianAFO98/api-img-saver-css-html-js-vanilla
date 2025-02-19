import { z } from "zod";


const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8),
    email: z.string().email()
});

export type UserModel = z.infer<typeof userSchema>;

export const validateInfo = (data: unknown): { success: false; errors: any } | { success: true; data: UserModel } => {
    const result = userSchema.safeParse(data);
    if (!result.success) {
        return { success: false, errors: result.error.format() };
    }

    return { success: true, data: result.data };
}
