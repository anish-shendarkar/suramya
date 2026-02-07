import 'dotenv/config';
import mongoose, { Schema, Document } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
console.log("MONGODB_URI =", process.env.MONGODB_URI);


// =====================
// Cloudinary Config
// =====================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// =====================
// Outfit Model (TS interface)
// =====================
interface OutfitDocument extends Document {
    name: string;
    description: string;
    type: string;
    size: string;
    color: string;
    gender: string;
    price: number;
    coverImage: string;
    images: string[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
}

const OutfitSchema = new Schema<OutfitDocument>(
    {
        name: String,
        description: String,
        type: String,
        size: String,
        color: String,
        gender: String,
        price: Number,
        coverImage: String,
        images: [String],
        views: Number,
    },
    { timestamps: true },
);

const Outfit = mongoose.model<OutfitDocument>('Outfit', OutfitSchema);

// =====================
// Upload Function
// =====================
async function uploadToCloudinary(localPath: string, cloudFolder = 'suramya/outfits') {
    try {
        const result = await cloudinary.uploader.upload(localPath, { folder: cloudFolder });
        return result.secure_url;
    } catch (err) {
        console.error(`❌ Cloudinary upload failed for ${localPath}`, err);
        return null;
    }
}

// =====================
// Main Migration Function
// =====================
async function migrate() {
    const uploadsFolder = path.join('uploads', 'outfits');

    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✔ Connected to MongoDB');

    const outfits = await Outfit.find();

    for (const outfit of outfits) {
        console.log(`\n🔄 Migrating: ${outfit.name}`);

        // ---- COVER IMAGE ----
        if (outfit.coverImage) {
            const localCover = path.join(uploadsFolder, outfit.coverImage);

            if (fs.existsSync(localCover)) {
                const uploadedCover = await uploadToCloudinary(localCover);

                if (uploadedCover) {
                    outfit.coverImage = uploadedCover;
                    console.log('✔ Cover image uploaded:', uploadedCover);
                }
            } else {
                console.log('⚠ Cover image missing:', localCover);
            }
        }

        // ---- MULTIPLE IMAGES ----
        const newImageUrls: string[] = [];

        for (const img of outfit.images) {
            const localImg = path.join(uploadsFolder, img);

            if (fs.existsSync(localImg)) {
                const uploadedImg = await uploadToCloudinary(localImg);

                if (uploadedImg) {
                    newImageUrls.push(uploadedImg);
                    console.log('✔ Image uploaded:', uploadedImg);
                }
            } else {
                console.log('⚠ Missing image:', localImg);
            }
        }

        outfit.images = newImageUrls;

        await outfit.save();
        console.log('✔ MongoDB updated for:', outfit._id);
    }

    console.log('\n🎉 Migration Complete!');
    mongoose.disconnect();
}

migrate();
