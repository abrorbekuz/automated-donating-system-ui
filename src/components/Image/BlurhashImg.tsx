import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { Blurhash } from 'react-blurhash'

interface ImageLoaderProps {
  imageUrl: string
  blurhash: string
  width: number
  height: number
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ imageUrl, blurhash, width, height }) => {
  const [loading, setLoading] = useState(true)
  const [aspectRatio, setAspectRatio] = useState<number>(width / height)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const image = new Image()

    image.onload = () => {
      setLoading(false)
    }

    image.src = imageUrl
  }, [imageUrl])

  useEffect(() => {
    setAspectRatio(width / height)
  }, [height, width])

  const [wi, setWi] = useState<number>(0)
  const [hi, setHi] = useState<number>(0)

  useLayoutEffect(() => {
    if (ref.current) {
      setWi(ref.current.offsetWidth)
      setHi(ref.current.offsetHeight)
    }
  }, [ref.current])

  return (
    <div style={{ aspectRatio: `${aspectRatio}`, color: 'blue' }} ref={ref}>
      {loading ? (
        <Blurhash hash={blurhash} height={hi} resolutionX={169} resolutionY={169} punch={1} />
      ) : (
        <>
          <img src={imageUrl} className="h-full w-full rounded-md object-cover" alt="Loaded content" />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        </>
      )}
    </div>
  )
}

export default ImageLoader
