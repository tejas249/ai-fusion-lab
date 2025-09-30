import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { model, msg, parentId } = await req.json();

  const response = await axios.post(
    "https://kravixstudio.com/api/v1/chat",
    {
      message: msg,           // Use messages from request
      aiModel: model,         // Use model from request
      parentId: parentId,     // Pass parentId if needed
      outputType: "text"
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.KRAVIXSTUDIO_API_KEY, // Space after Bearer
      }
    }
  );

  console.log(response.data);

  return NextResponse.json({
    ...response.data,
    model,
  });
}