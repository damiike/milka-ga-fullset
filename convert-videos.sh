#!/bin/bash

# Simple script to convert MOV files to MP4 for better web compatibility
# Run this once you have ffmpeg installed

cd public/videos

echo "Converting MOV files to MP4..."

# Convert each MOV file to MP4
for file in *.MOV *.mov; do
    if [ -f "$file" ]; then
        filename="${file%.*}"
        echo "Converting $file to ${filename}.mp4"
        # Use basic ffmpeg conversion with web optimization
        ffmpeg -i "$file" -c:v libx264 -preset fast -crf 23 -c:a aac -movflags +faststart "${filename}.mp4"
    fi
done

echo "Conversion complete!"
echo "You can now update your video URLs to use .mp4 files"