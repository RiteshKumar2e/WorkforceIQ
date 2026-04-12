import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          ...options,
        }
        const response = await axios.get(url, config)
        if (isMounted) {
          setData(response.data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || err.message)
          setData(null)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [url, options])

  return { data, loading, error }
}
