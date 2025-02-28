import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  const type = request.nextUrl.searchParams.get("type") || "stream"

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
    }

    // Determine content type based on the type parameter and response headers
    let contentType = response.headers.get("content-type")
    if (!contentType) {
      contentType = type === "image" ? "image/*" : "audio/mpeg"
    }

    // Create a new response with the same body and content type
    const proxyResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": type === "image" ? "public, max-age=31536000" : "no-cache",
      },
    })

    return proxyResponse
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    )
  }
}