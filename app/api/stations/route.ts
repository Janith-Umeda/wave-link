import { NextResponse } from "next/server"
import stationsData from "@/data/stations.json"

export async function GET() {
  return NextResponse.json(stationsData)
}

