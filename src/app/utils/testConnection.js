import { MongoClient, ServerApiVersion } from "mongodb";

export async function testConnection() {
    const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI
    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

    try {
        await client.connect();
        return { success: true, message: "Connected successfully to MongoDB!" };
    } catch (error) {
        return { success: false, message: error.message };
    } finally {
        await client.close();
    }
}
