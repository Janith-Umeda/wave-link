"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { RadioStation, RadioFilter } from "@/lib/types"

interface RadioState {
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

export const useRadioStore = create<RadioState>()(
  persist(
    (set, get) => ({
      stations: [],
      currentStation: null,
      loading: true,
      filter: { search: "", onlyFavorites: false },
      favorites: [],
      isPlaying: false,

      fetchStations: async () => {
        try {
          const response = await fetch("/api/stations")
          const data = await response.json()
          set({ stations: data, loading: false })
        } catch (error) {
          console.error("Failed to fetch stations:", error)
          set({ loading: false })
        }
      },

      setCurrentStation: (station) => {
        set({ currentStation: station })
      },

      setFilter: (newFilter) => {
        set({ filter: { ...get().filter, ...newFilter } })
      },

      toggleFavorite: (url) => {
        set((state) => {
          const favorites = state.favorites.includes(url)
            ? state.favorites.filter((fav) => fav !== url)
            : [...state.favorites, url]
          return { favorites }
        })
      },

      setIsPlaying: (isPlaying) => {
        set({ isPlaying })
      },
    }),
    {
      name: "radio-storage",
      partialize: (state) => ({ currentStation: state.currentStation, favorites: state.favorites }),
    },
  ),
)

