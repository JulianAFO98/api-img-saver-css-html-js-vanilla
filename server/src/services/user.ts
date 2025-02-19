import connectDB from "../database/database";
import { UserData } from "../types";


class UserService {
    constructor() {

    }


    static async getUserByUsername(username: string): Promise<UserData | null> {
        const client = await connectDB();
        try {
            const user = await client.query("SELECT * FROM users WHERE username=$1", [username]);
            return user.rows.length > 0 ? user.rows[0] : null;
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching user data');
        }
    }

    static async getUserByEmail(email: string): Promise<UserData | null> {
        const client = await connectDB();
        try {
            const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
            return user.rows.length > 0 ? user.rows[0] : null;
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching user data');
        }
    }

    static async createUser(username: string, email: string, password: string): Promise<string | null> {
        const client = await connectDB();
        try {
            const user = await client.query("INSERT INTO  users(username,email,password) VALUES($1,$2,$3) RETURNING id;", [username, email, password]);
            return user.rows.length > 0 ? user.rows[0].id : null;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default UserService;