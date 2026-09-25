import { handleCommercialPost } from "@/lib/commercial-handler";

export async function POST(request: Request) {
  return handleCommercialPost(request);
}
