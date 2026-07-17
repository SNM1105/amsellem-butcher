# Website Optimization Guide

## Current Size Analysis

- **Code files (JS/JSX/CSS/HTML):** 17.78 MB across 532 files
- **Recipes.jsx:** ~7.8 KB (clean after removing hardcoded data!)

## Video Background Implementation

### 1. Prepare Your Video

**Recommended specs:**

- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **Duration:** 10-20 seconds (loops seamlessly)
- **Frame rate:** 30 fps
- **Codec:** H.264
- **Target size:** 2-5 MB max

### 2. Compress Video with FFmpeg

```bash
ffmpeg -i input.mp4 \
  -vcodec h264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1920:1080" \
  -movflags +faststart \
  -an \
  output.mp4
```

**Parameters explained:**

- `-crf 28` - Quality (18-28, lower = better quality but larger file)
- `-preset slow` - Slower encoding = better compression
- `-vf "scale=1920:1080"` - Resize to 1080p
- `-movflags +faststart` - Enables progressive download
- `-an` - Remove audio

### 3. Add to Your Home Page

```jsx
import VideoBackground from "../components/VideoBackground";

// In your hero section:
<VideoBackground
  videoSrc="/videos/hero-background.mp4"
  posterSrc="/images/hero-poster.jpg"
>
  <h1>Amsellem Butcher</h1>
  <p>Premium Kosher Meats</p>
  <Link to="/meats" className="btn btn-primary">
    Shop Now
  </Link>
</VideoBackground>;
```

### 4. Upload Video to /public folder

Place your video:

```
/public
  /videos
    hero-background.mp4
  /images
    hero-poster.jpg  (fallback image)
```

## Size Reduction Strategies

### 1. Image Optimization (Biggest Impact!)

**Current issue:** Using full-size external images from Freepik/Unsplash

**Solution A - Use Cloudinary/Imagekit (Recommended):**

```jsx
// Before:
<img src="https://images.unsplash.com/photo-xxxxx?w=800&q=80" />

// After (with Cloudinary):
<img src="https://res.cloudinary.com/YOUR_CLOUD/image/upload/w_400,q_auto,f_auto/recipe-image.jpg" />
```

**Solution B - Local optimization:**

1. Download images
2. Compress with tools like:
   - **TinyPNG** (https://tinypng.com/)
   - **Squoosh** (https://squoosh.app/)
   - **ImageOptim** (Mac)
3. Convert to modern formats:
   ```bash
   # Convert to WebP (70-90% smaller!)
   ffmpeg -i input.jpg -quality 85 output.webp
   ```

### 2. Lazy Loading Images

```jsx
<img
  src={recipe.image}
  alt={recipe.name_en}
  loading="lazy" // Add this!
/>
```

### 3. Code Splitting (Vite does this automatically!)

Your current setup already splits:

- Each page component loads separately
- Vendor libraries bundled separately
- No action needed!

### 4. Remove Unused Dependencies

Check your package.json for unused packages:

```bash
npx depcheck
```

### 5. CSS Optimization

Your CSS is 3100 lines. Consider:

**Option A - Keep as is** (fine for this project size)

**Option B - Split into modules:**

```
/styles
  base.css       (reset, variables)
  components.css (buttons, cards)
  pages.css      (page-specific)
  recipes.css    (recipe page only)
```

Then import only what you need per page.

### 6. Enable Gzip/Brotli Compression

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Encoding",
          "value": "br"
        }
      ]
    }
  ]
}
```

## Performance Checklist

✅ **Already optimized:**

- Using Vite (fast build tool)
- Code splitting enabled
- React lazy loading
- Removed hardcoded recipe data

🎯 **Quick wins:**

1. Add `loading="lazy"` to all images
2. Compress and self-host recipe images
3. Add video background (2-5 MB)
4. Enable Vercel compression

📊 **Expected results:**

- Initial load: ~200-300 KB (gzipped JS/CSS)
- Images: ~50-100 KB each (with optimization)
- Video: 2-5 MB (one-time load, cached)
- Total page weight: ~2-3 MB (excellent!)

## Video Background Examples

### Butcher Shop Video Ideas:

1. Slow-motion meat cutting
2. Fire grilling close-up
3. Fresh meat display rotating
4. Spices falling in slow motion
5. Chef preparing signature dish

### Where to Get Videos:

- **Pexels Videos** (free): https://www.pexels.com/videos/
- **Pixabay Videos** (free): https://pixabay.com/videos/
- **Coverr** (free): https://coverr.co/
- Search: "butcher", "meat", "grilling", "cooking"

### Implementation Priority:

1. **High Priority:**
   - Add `loading="lazy"` to images (5 min)
   - Compress external recipe images (30 min)
   - Add video background to hero (1 hour)

2. **Medium Priority:**
   - Set up Cloudinary/Imagekit
   - Enable Vercel compression

3. **Low Priority:**
   - CSS splitting (only if needed)
   - Removing unused dependencies

## Video Implementation Steps

1. Find a video (Pexels/Pixabay)
2. Download and compress with FFmpeg
3. Place in `/public/videos/`
4. Add to Home.jsx hero section
5. Test on mobile and desktop

**Result:** Professional, lag-free video background just like Maison Loste!
