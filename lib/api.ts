import stationsData from "@/data/stations.json"
import type { RadioStation } from "@/lib/types"

export async function getStations(): Promise<RadioStation[]> {
    // In a real-world scenario, this would be an API call
    return stationsData
}

export async function getStationById(id: string): Promise<RadioStation | undefined> {
    const stations = await getStations()
    return stations.find((station) => station.title === decodeURIComponent(id))
}

