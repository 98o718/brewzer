import { useState, useEffect, useCallback } from 'react'

export const useOnlineDetector = () => {
  const [isOnline, setOnline] = useState(navigator.onLine)

  const handleConnectionChange = useCallback(() => {
    if (navigator.onLine) {
      setOnline(true)
    } else {
      setOnline(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('online', handleConnectionChange)
    window.addEventListener('offline', handleConnectionChange)
    return () => {
      window.removeEventListener('online', handleConnectionChange)
      window.removeEventListener('offline', handleConnectionChange)
    }
  }, [handleConnectionChange])

  return { isOnline }
}
