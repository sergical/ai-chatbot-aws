import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { z } from "zod";
import { Resource } from "sst";

import { auth } from "@/app/(auth)/auth";

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be less than 5MB",
    })
    // Update the file type based on the kind of files you want to accept
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "File type should be JPEG or PNG",
    }),
});

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.body === null) {
    return new Response("Request body is empty", { status: 400 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(", ");

      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    if (!session.user?.id) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const key = crypto.randomUUID();
    const command = new PutObjectCommand({
      Bucket: Resource.AIChatbotAWSBucket.name,
      Key: key,
    });

    try {
      const signedUrl = await getSignedUrl(new S3Client({}), command);

      const response = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
      }

      // Get the public URL for the uploaded file
      const publicUrl = `https://${Resource.AIChatbotAWSBucket.name}.s3.amazonaws.com/${key}`;
      console.log("publicUrl", publicUrl);

      return NextResponse.json({
        url: publicUrl,
        pathname: key,
        contentType: file.type,
      });
    } catch (error) {
      console.error("Failed to generate signed URL:", error);
      return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
