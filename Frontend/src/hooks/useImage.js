import { useEffect, useState } from 'react'

const useImage = (filePath) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [fallbackSrc, setFallbackSrc] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../assets/images/${filePath}.png`);
        setImageSrc(response.default)
      } catch (err) {
        const response = await import(`../assets/images/emotions/fallback/emoji_fallback.png`);
        setFallbackSrc(response.default);
        setError(err);
      } finally {
        setLoading(false)
      }
    }

    fetchImage();
  }, [filePath])

  return { loading, error, imageSrc, fallbackSrc }
}

export default useImage;