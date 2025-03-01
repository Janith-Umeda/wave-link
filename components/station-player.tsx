"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, Loader } from "lucide-react"
import { useRadioStoreContext } from "./radio-store-provider"
import type { RadioStation } from "@/lib/types"

export function StationPlayer({ station }: { station: RadioStation }) {
    const { currentStation, setCurrentStation } = useRadioStoreContext()
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsPlaying(currentStation?.url === station.url)
        setIsLoading(false)
    }, [currentStation, station.url])

    const handlePlayPause = () => {
        if (isPlaying) {
            setCurrentStation(null)
        } else {
            setIsLoading(true)
            setCurrentStation(station)
        }
    }

    return (
        <Button
            variant={isPlaying ? "default" : "outline"}
            className={`${isPlaying ? "bg-green-500 hover:bg-green-600" : ""}`}
            onClick={handlePlayPause}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
            ) : (
                <Play className="mr-2 h-4 w-4" />
            )}
            {isPlaying ? "Pause" : "Play"}
        </Button>
    )
}

