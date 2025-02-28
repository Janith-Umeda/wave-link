import { NextResponse } from "next/server"
import stationsData from "@/data/stations.json"
import { proxyUrl } from "@/lib/utils"

export const processStation = (station: any) => {
  return {
    ...station,
    'tvg-logo': proxyUrl(station['tvg-logo'], 'image'),
    url: proxyUrl(station.url, 'stream')
  }
}


export async function GET() {
  return NextResponse.json(stationsData.map(processStation));
}

