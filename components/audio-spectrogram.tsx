"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

interface AudioSpectrogramProps {
    audioRef: React.RefObject<HTMLAudioElement>
}

export function AudioSpectrogram({ audioRef }: AudioSpectrogramProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const animationRef = useRef<number | null>(null)
    const [isSetup, setIsSetup] = useState(false)

    useEffect(() => {
        if (!audioRef.current || !canvasRef.current || isSetup) return

        const setupAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }

            if (!sourceRef.current && audioRef.current) {
                sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current)
            }

            if (!analyserRef.current) {
                analyserRef.current = audioContextRef.current.createAnalyser()
                sourceRef.current?.connect(analyserRef.current)
                analyserRef.current.connect(audioContextRef.current.destination)
            }

            analyserRef.current.fftSize = 256
            setIsSetup(true)
        }

        const handleCanPlay = () => {
            if (!isSetup) {
                setupAudio()
            }
        }

        audioRef.current.addEventListener("canplay", handleCanPlay)

        return () => {
            audioRef.current?.removeEventListener("canplay", handleCanPlay)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
            if (sourceRef.current) {
                sourceRef.current.disconnect()
            }
            if (analyserRef.current) {
                analyserRef.current.disconnect()
            }
            if (audioContextRef.current) {
                audioContextRef.current.close()
            }
        }
    }, [audioRef, isSetup])

    useEffect(() => {
        if (!canvasRef.current || !analyserRef.current || !isSetup) return

        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const canvas = canvasRef.current
        const canvasCtx = canvas.getContext("2d")
        if (!canvasCtx) return

        const draw = () => {
            const WIDTH = canvas.width
            const HEIGHT = canvas.height

            animationRef.current = requestAnimationFrame(draw)

            analyserRef.current!.getByteFrequencyData(dataArray)

            canvasCtx.fillStyle = "rgb(0, 0, 0)"
            canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)

            const barWidth = (WIDTH / bufferLength) * 2.5
            let barHeight
            let x = 0

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2

                canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`
                canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight)

                x += barWidth + 1
            }
        }

        draw()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isSetup])

    return <canvas ref={canvasRef} className="w-full h-16" />
}

