"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Play, Radio, Pause } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useRadioStoreContext } from "./radio-store-provider"
import type { RadioStation } from "@/lib/types"

export function RadioStations() {
  const { stations, loading, filter, fetchStations, setCurrentStation, currentStation, toggleFavorite, favorites, isPlaying } = useRadioStoreContext()

  useEffect(() => {
    fetchStations()
  }, [fetchStations])

  const filteredStations = stations.filter((station) => {
    if (filter.onlyFavorites) return favorites.includes(station.url)
    if (!filter.search) return true
    return station.title.toLowerCase().includes(filter.search.toLowerCase())
  })

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-square bg-muted">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-3">
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
        <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {filteredStations.map((station, index) => (
        <StationCard
          key={station.url}
          station={station}
          isPlaying={isPlaying && currentStation?.url === station.url}
          onPlay={setCurrentStation}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(station.url)}
          priority={index < 12}
        />
      ))}
    </div>
  )
}

function StationCard({
  station,
  isPlaying,
  onPlay,
  onToggleFavorite,
  isFavorite,
  priority,
}: {
  station: RadioStation
  isPlaying: boolean
  onPlay: (station: RadioStation) => void
  onToggleFavorite: (url: string) => void
  isFavorite: boolean
  priority: boolean
}) {
  const getBitrateFromTitle = (title: string) => {
    const match = title?.match(/(\d+)\s*kbit\/s/)
    return match ? match[1] : null
  }

  const bitrate = getBitrateFromTitle(station.title)

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onPlay(station)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleFavorite(station.url)
  }

  return (
    <Link href={`/station/${station.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="aspect-square relative bg-muted">
          {station["tvg-logo"] ? (
            <Image
              src={station["tvg-logo"] || "/placeholder.svg?height=200&width=200"}
              alt={station.title}
              fill
              className="object-contain p-2"
              priority={priority}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=200&width=200"
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Radio className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute bottom-2 right-2 flex space-x-1">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
              onClick={handlePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className={`h-8 w-8 rounded-full opacity-90 hover:opacity-100 ${isFavorite ? "text-red-500" : ""}`}
              onClick={handleFavorite}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
          </div>
        </div>
        <CardContent className="p-3 flex-grow flex flex-col">
          <h3 className="font-medium text-sm line-clamp-1">{station.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{station["group-title"]}</p>
          {bitrate && (
            <Badge variant="outline" className=" self-start text-xs px-1.5 py-0 h-5 mt-2">
              {bitrate} kbps
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

