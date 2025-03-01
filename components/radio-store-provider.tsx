"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRadioStore } from "@/lib/store"
import { RadioStoreContextType } from "@/lib/types"

const RadioStoreContext = createContext<ReturnType<typeof useRadioStore> | null>(null)

export function RadioStoreProvider({ children }: { children: React.ReactNode }) {
    const [store, setStore] = useState<ReturnType<typeof useRadioStore> | null>(null)

    useEffect(() => {
        setStore(useRadioStore.getState())

        const unsubscribe = useRadioStore.subscribe((state) => {
            setStore(state)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    if (!store) return null

    return <RadioStoreContext.Provider value={store}>{children}</RadioStoreContext.Provider>
}

export function useRadioStoreContext() : RadioStoreContextType {
    const context = useContext<ReturnType<typeof useRadioStore> | null>(RadioStoreContext) as RadioStoreContextType
    if (!context) {
        throw new Error("useRadioStoreContext must be used within a RadioStoreProvider")
    }
    return context
}

