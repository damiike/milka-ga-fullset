export interface Review {
  profileImgUrl: string;
  reviewBy: string;
  reviewDetails: string;
  rating: number;
  date: string;
  reviewSource: string;
}

export interface CarouselTestimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  content: string;
  rating: number;
  profileImgUrl?: string;
}

const lashExtensionPatterns: RegExp[] = [
  /\b(?:lash|eyelash) extensions?\b/i,
  /\blashes\b/i,
  /\beyelashes\b/i,
  /\bfull set\b/i,
  /\b(?:classic|hybrid|russian|mega|volume|wet look) (?:set|lashes?)\b/i,
  /\bvolume lashes?\b/i,
  /\bbottom lashes?\b/i,
  /\blash refill\b/i,
  /\bwispy\b/i,
];

const browOnlyKeywords = [
  'brow lamination',
  'brow lam',
  'lamination',
  'brow sculpt',
  'brow mapping',
  'brow tint',
  'hybrid dye',
  'eyebrow tint',
  'eyebrow',
];

const liftOnlyPatterns = [
  /\blash lift\b/i,
  /\bkeratin lift\b/i,
  /\blash botox\b/i,
  /\bkorean lash lift\b/i,
];

const unrelatedServiceKeywords = ['spray tan', 'teeth whitening', 'facial wax', 'waxing'];

export function mentionsLashExtensions(text: string): boolean {
  return lashExtensionPatterns.some((pattern) => pattern.test(text));
}

export function isBrowOnlyReview(text: string): boolean {
  const lower = text.toLowerCase();
  const mentionsBrow = browOnlyKeywords.some((keyword) => lower.includes(keyword));
  return mentionsBrow && !mentionsLashExtensions(text);
}

export function isLashLiftOnlyReview(text: string): boolean {
  const mentionsLift = liftOnlyPatterns.some((pattern) => pattern.test(text));
  return mentionsLift && !mentionsLashExtensions(text);
}

/** True when review is about lash extensions (not brow-only, lift-only, or unrelated services). */
export function isLashExtensionReview(text: string): boolean {
  const lower = text.toLowerCase();

  if (unrelatedServiceKeywords.some((keyword) => lower.includes(keyword)) && !mentionsLashExtensions(text)) {
    return false;
  }
  if (isBrowOnlyReview(text)) return false;
  if (isLashLiftOnlyReview(text)) return false;

  return mentionsLashExtensions(text);
}

export function reviewPriority(reviewDetails: string): number {
  const text = reviewDetails.toLowerCase();
  if (/\b(?:lash|eyelash) extensions?\b/.test(text)) return 0;
  if (mentionsLashExtensions(text)) return 1;
  return 2;
}

export function parseReviewDate(dateString: string): number {
  const parts = dateString.split(/[-/]/).map(Number);
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return new Date(year, month - 1, day).getTime();
  }
  const parsed = Date.parse(dateString);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function inferServiceLabel(reviewDetails: string): string {
  const text = reviewDetails.toLowerCase();
  if (/mega|russian volume/.test(text)) return 'Russian Volume';
  if (/hybrid/.test(text)) return 'Hybrid Lashes';
  if (/classic/.test(text)) return 'Classic Lashes';
  if (/wet look/.test(text)) return 'Wet Look Set';
  if (/bottom lash/.test(text)) return 'Lash Extensions';
  if (/brow/.test(text) && mentionsLashExtensions(text)) return 'Lashes & Brows';
  return 'Lash Extensions';
}

export function normalizeApiReview(raw: {
  profileImgUrl: string;
  reviewBy: string;
  reviewDetails: string;
  rating: string | number;
  date: string;
  reviewSource: string;
}): Review {
  return {
    ...raw,
    rating: typeof raw.rating === 'string' ? Number(raw.rating) : raw.rating,
  };
}

const STAFF_NAMES = ['michelle', 'oksana', 'oxana', 'georgia', 'ella', 'sofia', 'maddy', 'pam'];

function extractStaffKey(reviewDetails: string): string {
  const lower = reviewDetails.toLowerCase();
  for (const name of STAFF_NAMES) {
    if (new RegExp(`\\b${name}\\b`, 'i').test(lower)) return name;
  }
  return 'team';
}

function stableJitter(review: Review): number {
  const seed = `${review.reviewBy}|${review.date}|${review.reviewDetails.length}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

function reviewQualityScore(review: Review): number {
  let score = review.rating * 1000;
  score -= reviewPriority(review.reviewDetails) * 150;
  score += parseReviewDate(review.date) / 1e11;

  const length = review.reviewDetails.trim().length;
  if (length >= 80 && length <= 450) score += 40;
  else if (length > 450) score += 15;

  if (extractStaffKey(review.reviewDetails) !== 'team') score += 35;

  score += stableJitter(review) * 25;
  return score;
}

/** Pick top reviews while rotating staff mentions so one artist doesn't dominate. */
export function selectDiverseBestReviews(allReviews: Review[], limit: number): Review[] {
  const pool = [...allReviews].sort((a, b) => reviewQualityScore(b) - reviewQualityScore(a));

  const byStaff = new Map<string, Review[]>();
  for (const review of pool) {
    const key = extractStaffKey(review.reviewDetails);
    const bucket = byStaff.get(key) ?? [];
    bucket.push(review);
    byStaff.set(key, bucket);
  }

  const selected: Review[] = [];
  const staffCounts = new Map<string, number>();
  let lastStaff: string | null = null;

  while (selected.length < limit) {
    let best: { review: Review; key: string; score: number } | null = null;

    for (const [key, bucket] of byStaff) {
      if (bucket.length === 0) continue;

      const review = bucket[0];
      const count = staffCounts.get(key) ?? 0;
      let score = reviewQualityScore(review) - count * 400;

      if (key === lastStaff && byStaff.size > 1) score -= 250;

      if (!best || score > best.score) {
        best = { review, key, score };
      }
    }

    if (!best) break;

    selected.push(best.review);
    staffCounts.set(best.key, (staffCounts.get(best.key) ?? 0) + 1);
    lastStaff = best.key;
    byStaff.get(best.key)!.shift();
  }

  return selected;
}

export function filterLashExtensionReviews(allReviews: Review[]): Review[] {
  return allReviews.filter(
    (review) => review.rating >= 5 && isLashExtensionReview(review.reviewDetails)
  );
}

export function selectGridReviews(allReviews: Review[], limit = 15): Review[] {
  return selectDiverseBestReviews(filterLashExtensionReviews(allReviews), limit);
}

export function selectCarouselReviews(allReviews: Review[], limit = 5): Review[] {
  return selectDiverseBestReviews(filterLashExtensionReviews(allReviews), limit);
}

export function toCarouselTestimonials(reviews: Review[]): CarouselTestimonial[] {
  return reviews.map((review, index) => ({
    id: `${review.reviewBy}-${index}`,
    name: review.reviewBy,
    location: 'Brighton',
    service: inferServiceLabel(review.reviewDetails),
    content: review.reviewDetails,
    rating: review.rating,
    profileImgUrl: review.profileImgUrl,
  }));
}

/** Curated lash-extension reviews when the API is unavailable at build time */
export const fallbackCarouselTestimonials: CarouselTestimonial[] = [
  {
    id: 'summer-jay',
    name: 'Summer Jay',
    location: 'Brighton',
    service: 'Lash Extensions',
    content:
      "I was very happy with my services. I had my eyelashes done & they look awesome! If you are looking for beautiful lash extensions, look no further than Milka!",
    rating: 5,
  },
  {
    id: 'skye-taylor',
    name: 'Skye Taylor',
    location: 'Brighton',
    service: 'Lash Extensions',
    content:
      'I had my lashes done by the lovely Oxana yesterday. She is absolutely amazing - highly recommend!',
    rating: 5,
  },
  {
    id: 'intan-sari',
    name: 'Intan Sari Patanan',
    location: 'Melbourne',
    service: 'Lash Extensions',
    content:
      "I recently had the pleasure of getting my eyelash extensions done by Michelle and Ella, and I couldn't be happier with the results!",
    rating: 5,
  },
  {
    id: 'maryanne',
    name: 'Maryanne Serratore',
    location: 'Brighton',
    service: 'Lash Extensions',
    content:
      "Just amazing! Wouldn't go anywhere else. My lashes are exactly what I want. Thanks so much girls x",
    rating: 5,
  },
  {
    id: 'sarah-m',
    name: 'Sarah M.',
    location: 'Brighton',
    service: 'Hybrid Lashes',
    content:
      'Georgia did my hybrid lash extensions and they are perfect — full, fluffy and still natural. Best lashes in Brighton!',
    rating: 5,
  },
];
