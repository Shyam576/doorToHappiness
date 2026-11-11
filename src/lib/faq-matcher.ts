export interface FaqEntry {
  question: string
  answer: string
}

export interface FaqMatch {
  entry: FaqEntry
  score: number
}

// A confident match needs the visitor's query to be "covered" (weighted by
// how distinctive each word is across the FAQ set) by this fraction of its
// own words. Below this, we'd rather say "I don't know" than return a
// loosely-related answer.
const MIN_CONFIDENT_SCORE = 0.6

// Common words that carry no topic signal on their own — excluding them
// keeps matching focused on the words that actually distinguish one FAQ
// from another.
const STOPWORDS: Record<string, boolean> = {
  a: true, about: true, all: true, an: true, and: true, any: true,
  are: true, as: true, at: true, be: true, by: true, can: true,
  could: true, do: true, does: true, for: true, from: true, have: true,
  how: true, i: true, if: true, in: true, is: true, it: true, its: true,
  my: true, of: true, on: true, or: true, our: true, should: true,
  some: true, that: true, the: true, their: true, there: true, they: true,
  this: true, to: true, was: true, what: true, when: true, where: true,
  which: true, who: true, why: true, will: true, with: true, would: true,
  you: true, your: true,
}

// Deduplicated, stopword-free words from a string, order-preserved. Returns
// a plain array (not a Set) so this file stays safe under the project's ES5
// TypeScript target without needing downlevelIteration.
function tokenize(text: string): string[] {
  const seen: Record<string, boolean> = {}
  const words: string[] = []
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .forEach((word) => {
      if (word.length > 0 && !STOPWORDS[word] && !seen[word]) {
        seen[word] = true
        words.push(word)
      }
    })
  return words
}

function toWordSet(words: string[]): Record<string, boolean> {
  const set: Record<string, boolean> = {}
  words.forEach((word) => {
    set[word] = true
  })
  return set
}

// Inverse document frequency across this FAQ set: a word that shows up in
// nearly every question/answer (like "bhutan") carries almost no weight, while
// a word specific to one or two entries (like "dzongkha" or "visa") carries a
// lot — so a one-word query about a specific topic can still match confidently
// even though it would be "diluted" by a longer answer under plain overlap.
function buildIdf(entries: FaqEntry[]): Record<string, number> {
  const docFrequency: Record<string, number> = {}
  entries.forEach((entry) => {
    const words = toWordSet(tokenize(entry.question).concat(tokenize(entry.answer)))
    Object.keys(words).forEach((word) => {
      docFrequency[word] = (docFrequency[word] || 0) + 1
    })
  })
  const idf: Record<string, number> = {}
  const n = entries.length
  Object.keys(docFrequency).forEach((word) => {
    idf[word] = Math.log((n + 1) / (docFrequency[word] + 1)) + 1
  })
  return idf
}

export function findBestFaqMatch(query: string, faqs: FaqEntry[]): FaqMatch | null {
  const queryWords = tokenize(query)
  if (queryWords.length === 0 || faqs.length === 0) return null

  const idf = buildIdf(faqs)
  const weightOf = (word: string) => (idf[word] !== undefined ? idf[word] : 1)
  const queryWeight = queryWords.reduce((sum, word) => sum + weightOf(word), 0)
  if (queryWeight === 0) return null

  // Require the match to hold up two different ways: most of the query's
  // *information* is present (weighted by how distinctive each word is),
  // and most of its *words* are present too. Weighting alone lets a single
  // incidentally-rare word (shared with an unrelated entry) look like a
  // confident match even when the query's other, more distinctive words
  // are completely absent — word-count coverage catches that case.
  const scored: FaqMatch[] = faqs.map((entry) => {
    const entryWords = toWordSet(tokenize(entry.question).concat(tokenize(entry.answer)))
    let matchedWeight = 0
    let matchedCount = 0
    queryWords.forEach((word) => {
      if (entryWords[word]) {
        matchedWeight += weightOf(word)
        matchedCount += 1
      }
    })
    const weightedCoverage = matchedWeight / queryWeight
    const wordCoverage = matchedCount / queryWords.length
    return { entry, score: Math.min(weightedCoverage, wordCoverage) }
  })

  const best = scored.reduce((top, candidate) => (candidate.score > top.score ? candidate : top))

  return best.score >= MIN_CONFIDENT_SCORE ? best : null
}
