"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRadioStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Pause, Play, Radio, Volume2, VolumeX } from "lucide-react"
import { AudioSpectrogram } from "./audio-spectrogram"
import { usePageTitle } from "@/hooks/usePageTitle"

export function AudioPlayer() {
  const { currentStation, setCurrentStation } = useRadioStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(80)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Use the custom hook to manage page title
  usePageTitle()

  useEffect(() => {
    if (currentStation && audioRef.current) {
      setError(null)
      audioRef.current.src = currentStation.url
      audioRef.current.load()
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.error("Error playing audio:", err)
          setIsPlaying(false)
          setError("This station couldn't be played. It may be offline or not supported by your browser.")
        })
    }
  }, [currentStation])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100
    }
  }, [volume, isMuted])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        setError(null)
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch((err) => {
            console.error("Error playing audio:", err)
            setError("This station couldn't be played. It may be offline or not supported by your browser.")
          })
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleAudioError = () => {
    setIsPlaying(false)
    setError("This station couldn't be played. It may be offline or not supported by your browser.")
  }

  if (!currentStation) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 shadow-lg">
      <div className="container flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              {currentStation["tvg-logo"] ? (
                <Image
                  src={currentStation["tvg-logo"] || "/placeholder.svg"}
                  alt={currentStation.title}
                  fill
                  className="object-cover rounded-md"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center rounded-md">
                  <Radio className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{currentStation.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{currentStation["group-title"]}</p>
              {error && <p className="text-sm text-destructive mt-1">{error}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={togglePlayPause}>
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                className="w-24"
                value={[volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
              />
            </div>

            {error && (
              <Button variant="outline" size="sm" onClick={() => setCurrentStation(null)}>
                Try Another Station
              </Button>
            )}
          </div>
        </div>

        {/* <AudioSpectrogram audioRef={audioRef} /> */}
      </div>
      <audio ref={audioRef} onError={handleAudioError} />
    </div>
  )
}

