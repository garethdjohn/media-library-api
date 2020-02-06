import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../src/app";
import chai from "chai";
import 'dotenv/config';

const expect = chai.expect;

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
                .expect(200, []);
        });
    });

    describe('GET /api/sources/:sourceId', function() {
        it('should return a 404 if the sourceId is syntactically valid but does not match a document', async function() {
            return supertest(app)
                .get(`/api/sources/5e39d59888fad249e10bdc1a`)
                .expect(404);
        });

        it('should return a 500 if the sourceId is syntactically invalid', async function() {
            return supertest(app)
                .get(`/api/sources/synctactically-invalid-source-id`)
                .expect(500);
        });
    });

    describe('POST /api/sources', function() {
        it('should create a new source document', async function() {
            return supertest(app)
                .post(`/api/sources`)
                .send({
                    name: 'Source 1',
                    path: '/path/to/source/1'
                })
                .expect(201)
                .expect(res => {
                    expect(res.body).to.include({
                        name: 'Source 1',
                        path: '/path/to/source/1'
                    });
                });

        });
    });
});
