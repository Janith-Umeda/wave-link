"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"

export function ShareButton({ stationId }: { stationId: string }) {
    const [shared, setShared] = useState(false)

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/station/${stationId}?utm_source=share&utm_medium=social&utm_campaign=station_share`

        sendGAEvent('event', 'share', {
            'event_category': 'engagement',
            'event_label': stationId,
            'platform': typeof navigator.share === "function" ? "web_share_api" : "clipboard"
        });
        
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

