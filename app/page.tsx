import Link from "next/link"
import { RadioStations } from "@/components/radio-stations"
import { SearchFilter } from "@/components/search-filter"
// import { AudioPlayer } from "@/components/audio-player"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { Logo } from "@/components/logo"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <Logo />
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Streaming Notice</AlertTitle>
          <AlertDescription>
            Some radio stations may not play due to browser restrictions or if the station is offline. If a station
            doesn't work, please try another one.
          </AlertDescription>
        </Alert>

        <SearchFilter />
        <RadioStations />
      </main>

      {/* <AudioPlayer /> */}

      <footer className="border-t bg-background py-4 text-center text-sm text-muted-foreground mb-24">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} WaveLink. All rights reserved.</p>
          <nav className="mt-2">
            <Link href="/privacy-policy" className="hover:underline mr-4">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

