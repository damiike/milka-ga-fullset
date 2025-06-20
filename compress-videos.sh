#!/bin/bash

# Create output directory if it doesn't exist
mkdir -p public/compressed-videos

# Process each video file
for video in public/videos/*.{mp4,mov,MOV}; do
  # Skip if no files found
  [ -f "$video" ] || continue
  
  # Get the filename without path
  filename=$(basename -- "$video")
  output="public/compressed-videos/${filename%.*}.mp4"
  
  echo "Compressing $video..."
  
  # Compress the video with optimized settings
  ffmpeg -i "$video" \
    -c:v libx264 -crf 28 -preset medium -profile:v high -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart \
    -vf "scale='min(1280,iw)':-2" \
    -threads 0 \
    -y "$output"
    
  # Get file size in MB
  size_mb=$(du -h "$output" | cut -f1)
  echo "Compressed $filename to $size_mb"
done

echo "All videos have been compressed and saved to public/compressed-videos/"
