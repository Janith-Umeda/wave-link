"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

export function ShareButton({ stationId }: { stationId: string }) {
    const [shared, setShared] = useState(false)

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/station/${stationId}`

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Check out this radio station!",
                    text: "I found this great radio station on WaveLink. Give it a listen!",
                    url: shareUrl,
                })
                setShared(true)
            } catch (error) {
                console.error("Error sharing:", error)
            }
        } else {
            await navigator.clipboard.writeText(shareUrl)
            setShared(true)
            setTimeout(() => setShared(false), 2000)
        }
    }

    return (
        <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            {shared ? "Shared!" : "Share"}
        </Button>
    )
}

