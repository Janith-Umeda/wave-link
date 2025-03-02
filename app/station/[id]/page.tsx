import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Radio } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { StationPlayer } from "@/components/station-player"
import { ShareButton } from "@/components/share-button"
import { getStationById } from "@/lib/api"

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const station = await getStationById(params.id)

    if (!station) {
        return {
            title: 'Station Not Found',
            description: 'The requested radio station could not be found.',
        }
    }

    return {
        title: `${station.title} | WaveLink Radio`,
        description: `Listen to ${station.title} live on WaveLink. Enjoy ${station["group-title"]} music and more!`,
        openGraph: {
            title: `${station.title} | WaveLink Radio`,
            description: `Tune in to ${station.title} and enjoy ${station["group-title"]} on WaveLink Radio.`,
            images: [{ url: station["tvg-logo"] || '/default-station-image.jpg' }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${station.title} | WaveLink Radio`,
            description: `Tune in to ${station.title} and enjoy ${station["group-title"]} on WaveLink Radio.`,
            images: [station["tvg-logo"] || '/default-station-image.jpg'],
        },
    }
}

export default async function StationPage({ params }: Props) {
    const station = await getStationById(params.id)

    if (!station) {
        notFound()
    }

    const getBitrateFromTitle = (title: string) => {
        const match = title.match(/(\d+)\s*kbit\/s/)
        return match ? match[1] : null
    }

    const bitrate = getBitrateFromTitle(station.title)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RadioStation',
        name: station.title,
        url: `https://wavelink.com/station/${encodeURIComponent(station.url)}`,
        genre: station["group-title"],
        broadcastFrequency: bitrate ? `${bitrate} kbit/s` : undefined,
        image: station["tvg-logo"] || '/default-station-image.jpg',
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main className="container mx-auto px-4 py-8">
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <li>
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>
                        </li>
                        <li>&gt;</li>
                        <li>{station.title}</li>
                    </ol>
                </nav>
                <article className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <figure className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                            {station["tvg-logo"] ? (
                                <Image
                                    src={station["tvg-logo"] || "/placeholder.svg"}
                                    alt={`${station.title} logo`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Radio className="h-24 w-24 text-muted-foreground" />
                                </div>
                            )}
                        </figure>
                    </div>
                    <div className="md:w-2/3">
                        <header>
                            <h1 className="text-3xl font-bold mb-4">{station.title}</h1>
                            <p className="text-lg text-muted-foreground mb-4">{station["group-title"]}</p>
                            {bitrate && (
                                <Badge variant="outline" className="mb-4">
                                    {bitrate} kbps
                                </Badge>
                            )}
                        </header>
                        <section className="mb-6">
                            <h2 className="sr-only">Station Description</h2>
                            <p>
                                Tune in to {station.title} for a diverse range of {station["group-title"]} content,
                                including music, news, and entertainment. Enjoy high-quality broadcasts from this
                                popular radio station, bringing you the best in {station["group-title"]} programming.
                            </p>
                        </section>
                        <section className="flex items-center gap-4">
                            <h2 className="sr-only">Station Controls</h2>
                            <StationPlayer station={station} />
                            <ShareButton stationId={params.id} />
                        </section>
                    </div>
                </article>
            </main>
        </>
    )
}

