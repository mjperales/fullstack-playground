import React, { useState } from 'react';

type Video = {
  title: string;
  src: string;
  captions?: string;
};

type Props = {
  videos: Video[];
};

export default function VideoPlaylist({ videos }: Props) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="p-4">
      {/* Video Player */}
      <video
        key={videos[current].src}
        src={videos[current].src}
        controls
        width="600"
      >
        {videos[current].captions && (
          <track
            kind="subtitles"
            src={videos[current].captions}
            srcLang="en"
            default
          />
        )}
      </video>

      {/* Playlist */}
      <ul className="mt-4">
        {videos.map((video, i) => (
          <li key={video.src}>
            <button
              onClick={() => setCurrent(i)}
              className={`block w-full text-left p-2 ${
                i === current ? 'font-bold underline' : ''
              }`}
              aria-current={i === current ? 'true' : 'false'}
            >
              {video.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}