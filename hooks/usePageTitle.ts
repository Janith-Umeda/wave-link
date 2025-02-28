"use client"

import { useState, useEffect } from "react"
import { useRadioStore } from "@/lib/store"

export function usePageTitle() {
    const { currentStation } = useRadioStore()
    const [pageTitle, setPageTitle] = useState("WaveLink - Your Global Radio Companion")

    useEffect(() => {
        if (currentStation) {
            setPageTitle(`Now Playing: ${currentStation.title} | WaveLink`)
        } else {
            setPageTitle("WaveLink - Your Global Radio Companion")
        }
        document.title = pageTitle
    }, [currentStation, pageTitle])

    return pageTitle
}

