import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Radio } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getStationById } from "@/lib/api"
import { StationPlayer } from "@/components/station-player"
import { ShareButton } from "@/components/share-button"

export default async function StationPage({ params }: { params: { id: string } }) {
    const station = await getStationById(params.id)

    if (!station) {
        notFound()
    }

    const getBitrateFromTitle = (title: string) => {
        const match = title.match(/(\d+)\s*kbit\/s/)
        return match ? match[1] : null
    }

    const bitrate = getBitrateFromTitle(station.title)

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="text-primary hover:underline mb-4 inline-block">
                &larr; Back to all stations
            </Link>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                    <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                        {station["tvg-logo"] ? (
                            <Image
                                src={station["tvg-logo"] || "/placeholder.svg"}
                                alt={station.title}
                                fill
                                className="object-cover"
                                // onError={(e) => {
                                //     e.currentTarget.src = "/placeholder.svg?height=400&width=400"
                                // }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Radio className="h-24 w-24 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{station.title}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{station["group-title"]}</p>
                    {bitrate && (
                        <Badge variant="outline" className="mb-4">
                            {bitrate} kbps
                        </Badge>
                    )}
                    <p className="mb-6">
                        This radio station offers a diverse range of content, including music, news, and entertainment. Tune in to
                        enjoy high-quality broadcasts from around the world.
                    </p>
                    <div className="flex items-center gap-4">
                        <StationPlayer station={station} />
                        <ShareButton stationId={params.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

