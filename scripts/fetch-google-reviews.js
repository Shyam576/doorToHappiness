#!/usr/bin/env node
// Pulls real Google reviews for the "Door to Happiness Holiday" Google Business
// Profile via SerpApi's Google Maps Reviews API and writes them into
// src/data/testimonials.json, which TestimonialsSection.tsx renders directly
// (see that file's header comment). Not run automatically — re-run by hand
// whenever the reviews should be refreshed:
//   node scripts/fetch-google-reviews.js
// Requires SERPAPI_API_KEY in .env.local (from your SerpApi dashboard).
const fs = require('fs')
const path = require('path')
const https = require('https')

// The Google Maps internal id ("data_id") for the Door to Happiness Holiday
// listing, taken from its Google Maps URL.
const DATA_ID = '0x39e193004c52f8a1:0xd72e2c186f98af0f'
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'testimonials.json')
const MAX_QUOTE_LENGTH = 280
const MIN_RATING = 4

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2]
    }
  }
}

function truncate(text) {
  const singleLine = text.replace(/\s+/g, ' ').trim()
  if (singleLine.length <= MAX_QUOTE_LENGTH) return singleLine
  const cut = singleLine.slice(0, MAX_QUOTE_LENGTH)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

function fetchReviews() {
  const apiKey = process.env.SERPAPI_API_KEY
  if (!apiKey) {
    console.error('fetch-google-reviews: SERPAPI_API_KEY is not set in .env.local')
    process.exit(1)
  }

  const url =
    `https://serpapi.com/search.json?engine=google_maps_reviews&data_id=${encodeURIComponent(DATA_ID)}` +
    `&hl=en&api_key=${encodeURIComponent(apiKey)}`

  https
    .get(url, (res) => {
      let body = ''
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => {
        if (res.statusCode !== 200) {
          console.error(`fetch-google-reviews: SerpApi returned HTTP ${res.statusCode}`)
          console.error(body)
          process.exit(1)
        }

        let json
        try {
          json = JSON.parse(body)
        } catch (err) {
          console.error('fetch-google-reviews: failed to parse SerpApi response as JSON')
          process.exit(1)
        }

        if (json.error) {
          console.error(`fetch-google-reviews: SerpApi error: ${json.error}`)
          process.exit(1)
        }

        const rawReviews = Array.isArray(json.reviews) ? json.reviews : []

        const testimonials = rawReviews
          .filter((review) => review.snippet && review.rating >= MIN_RATING)
          .map((review) => ({
            quote: truncate(review.snippet),
            author: review.user && review.user.name ? review.user.name : 'Google reviewer',
            rating: Math.round(review.rating),
            source: 'Google',
          }))

        fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(testimonials, null, 2)}\n`)
        console.log(
          `fetch-google-reviews: wrote ${testimonials.length} review(s) to ${path.relative(process.cwd(), OUTPUT_PATH)}`
        )
      })
    })
    .on('error', (err) => {
      console.error('fetch-google-reviews: request failed:', err.message)
      process.exit(1)
    })
}

loadEnvLocal()
fetchReviews()
