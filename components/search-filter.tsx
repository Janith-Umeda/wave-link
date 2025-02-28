"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRadioStore } from "@/lib/store"

export function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("")
  const setFilter = useRadioStore((state) => state.setFilter)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilter({ search: searchTerm })
  }

  return (
    <div className="mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Find Your Station</h2>
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Search stations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </div>
  )
}

