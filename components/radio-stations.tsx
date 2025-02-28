"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Play, Radio } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRadioStore } from "@/lib/store"
import type { RadioStation } from "@/lib/types"

export function RadioStations() {
  const { stations, loading, filter, fetchStations, setCurrentStation } = useRadioStore()

  useEffect(() => {
    fetchStations()
  }, [fetchStations])

  const filteredStations = stations.filter((station) => {
    if (!filter.search) return true
    return station.title.toLowerCase().includes(filter.search.toLowerCase())
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-[16/9] bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
      </div>
    )
  }

  if (filteredStations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Radio className="h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No stations found</h3>
        <p className="text-muted-foreground">Try adjusting your search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredStations.map((station) => (
        <StationCard key={station.url} station={station} onPlay={setCurrentStation} />
      ))}
    </div>
  )
}

function StationCard({ station, onPlay }: { station: RadioStation; onPlay: (station: RadioStation) => void }) {
  const getBitrateFromTitle = (title: string) => {
    const match = title.match(/(\d+)\s*kbit\/s/)
    return match ? match[1] : null
  }

  const bitrate = getBitrateFromTitle(station.title)

  const handlePlay = () => {
    console.log("Playing station:", station.title) // Add this line for debugging
    onPlay(station)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-[16/9] relative bg-muted">
        {station["tvg-logo"] ? (
          <Image
            src={station["tvg-logo"] || "/placeholder.svg?height=225&width=400"}
            alt={station.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.src = "/placeholder.svg?height=225&width=400"
            }}
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Radio className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{station.title}</h3>
        <p className="text-sm text-muted-foreground">{station["group-title"]}</p>
        {bitrate && (
          <Badge variant="outline" className="mt-2">
            {bitrate} kbps
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="default" className="w-full" onClick={handlePlay}>
          <Play className="mr-2 h-4 w-4" />
          Play Station
        </Button>
      </CardFooter>
    </Card>
  )
}

