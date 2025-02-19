import connectDB from "../database/database";
import { ImgData } from "../types";

class ImgService {
    constructor() {

    }

    static async getOne(id: string) {
        const client = await connectDB();
        try {
            const imgData = await client.query("SELECT * FROM images WHERE id=$1", [id]);
            if (imgData.rows.length === 0) {
                return null;
            }
            return imgData.rows[0];
        } catch (err) {
            console.log(err);
            throw new Error('Error fetching image data');
        }
    }

    static async getAll(): Promise<ImgData[] | null> {
        const client = await connectDB();

        try {
            const imgData = await client.query("SELECT * FROM images");

            if (imgData.rows.length === 0) {
                return null;
            }

            const result: ImgData[] = imgData.rows.map(row => ({
                id: row.id,
                user_id: row.user_id,
                description: row.description,
                img_data: row.img_data,
            }));

            return result;
        } catch (err) {
            console.log(err);
            throw new Error('Error fetching image data');
        }
    }
}

export default ImgService;