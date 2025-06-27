import { NextRequest, NextResponse } from "next/server";
import { firestore } from "firebase-admin";

import { serverDB } from "@/lib/firebase-admin";
import cloudinary from "@/lib/cloudinary";
import { getTokenFromHeaders } from "@/utils/get-token";
import { verifyFirebaseToken } from "@/lib/verify-firebase-token";
import type { UploadApiResponse } from "cloudinary";

export const POST = async (req: NextRequest) => {
  const form = await req.formData();
  const file = form.get("file") as File;
  const folderId = form.get("folderId") as string;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const token = getTokenFromHeaders(req.headers);
    const userId = await verifyFirebaseToken(token!);

    const uploaded = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: `drive/${userId}` },
          (err, result) => {
            if (err || !result) {
              console.dir(err);
              return reject(err || new Error("Upload failed"));
            }
            resolve(result);
          }
        )
        .end(buffer);
    });

    const fileDoc = {
      name: uploaded.original_filename,
      url: uploaded.secure_url,
      type: uploaded.resource_type,
      size: uploaded.bytes,
      ownerId: userId,
      folderId: folderId,
      createdAt: firestore.Timestamp.now(),
    };

    await serverDB.collection("files").add(fileDoc);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.dir({ error });
    return NextResponse.json({ error: true }, { status: 500 });
  }
};
