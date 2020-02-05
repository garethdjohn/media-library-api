import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";

require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
        await collection.drop(); 
    }
});

describe('/api/sources', function() {
    describe('GET /api/sources', function() {
        it('should work', async function() {
            return supertest(app)
                .get(`/api/sources`)
                .expect(404);
        });
    });
});
