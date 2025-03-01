export interface RadioStation {
  "tvg-logo": string
  "group-title": string
  title: string
  url: string
}

export interface RadioFilter {
  search?: string
  group?: string
  bitrate?: string
  onlyFavorites?: boolean
}

export interface RadioState {
  stations: RadioStation[]
  currentStation: RadioStation | null
  loading: boolean
  filter: RadioFilter
  favorites: string[]
  isPlaying: boolean
  fetchStations: () => Promise<void>
  setCurrentStation: (station: RadioStation | null) => void
  setFilter: (filter: Partial<RadioFilter>) => void
  toggleFavorite: (url: string) => void
  setIsPlaying: (isPlaying: boolean) => void
}

export type RadioStoreContextType = {
  [K in keyof RadioState]: RadioState[K]
}
