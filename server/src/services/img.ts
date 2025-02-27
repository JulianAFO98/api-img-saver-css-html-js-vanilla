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
            const imgData = await client.query("SELECT id,description,img_url FROM images");

            if (imgData.rows.length === 0) {
                return null;
            }

            const result: ImgData[] = imgData.rows.map(row => ({
                id: row.id,
                description: row.description,
                img_url: row.img_url,
            }));

            return result;
        } catch (err) {
            console.log(err);
            throw new Error('Error fetching image data');
        }
    }
}

export default ImgService;