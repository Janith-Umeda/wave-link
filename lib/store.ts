"use client"

import { create } from "zustand"
import type { RadioStation, RadioFilter } from "@/lib/types"

interface RadioState {
  stations: RadioStation[]
  currentStation: RadioStation | null
  loading: boolean
  filter: RadioFilter
  fetchStations: () => Promise<void>
  setCurrentStation: (station: RadioStation | null) => void
  setFilter: (filter: RadioFilter) => void
}

export const useRadioStore = create<RadioState>((set, get) => ({
  stations: [],
  currentStation: null,
  loading: true,
  filter: {},

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
    console.log("Setting current station:", station?.title) // Add this line for debugging
    set({ currentStation: station })
  },

  setFilter: (filter) => {
    set({ filter: { ...get().filter, ...filter } })
  },
}))

