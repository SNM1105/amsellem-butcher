import React from 'react'

export default function VideoBackground({ videoSrc, posterSrc, overlay = true, children }) {
  return (
    <div className="video-background-wrapper">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="video-background"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {overlay && <div className="video-overlay" />}
      <div className="video-content">
        {children}
      </div>
    </div>
  )
}
