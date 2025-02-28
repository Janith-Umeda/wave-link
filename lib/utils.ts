import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const proxyUrl = (url: string, type: 'stream' | 'image' = 'stream') => {
  if (!url) return ''
  
  if (url.startsWith('https://')) {
    return url
  }
  
  if (url.startsWith('http://')) {
    return `/api/proxy?url=${encodeURIComponent(url)}&type=${type}`
  }

  return url
}