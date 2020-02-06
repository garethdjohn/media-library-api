import mongoose from "mongoose";

export type ScanDocument = mongoose.Document & {
    inProgress: boolean;
};

export type SourceDocument = mongoose.Document & {
    name: string;
    path: string;
    scan: ScanDocument;
};

const scanSchema = new mongoose.Schema({
    inProgress: { type: Boolean, default: false },
}, { timestamps: true });

const sourceSchema = new mongoose.Schema({
    name: String,
    path: String,
    scan: { type: scanSchema, default: scanSchema }
}, { timestamps: true });

export const Source = mongoose.model<SourceDocument>("Source", sourceSchema);
