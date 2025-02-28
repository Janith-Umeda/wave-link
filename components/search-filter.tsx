"use client"

import { useState, useEffect } from "react"
import { Search, Heart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRadioStore } from "@/lib/store"

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const { setFilter, filter } = useRadioStore()

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      setFilter({ search: searchTerm })
    }, 300)

    return () => clearTimeout(debounceSearch)
  }, [searchTerm, setFilter])

  const toggleFavorites = () => {
    setFilter({ onlyFavorites: !filter.onlyFavorites })
  }

  return (
    <div className="mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Find Your Station</h2>
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          variant={filter.onlyFavorites ? "default" : "outline"}
          size="icon"
          onClick={toggleFavorites}
          title={filter.onlyFavorites ? "Show all stations" : "Show favorites only"}
        >
          <Heart className="h-4 w-4" fill={filter.onlyFavorites ? "currentColor" : "none"} />
        </Button>
      </div>
    </div>
  )
}

