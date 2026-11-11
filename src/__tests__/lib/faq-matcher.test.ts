import { findBestFaqMatch, FaqEntry } from '../../lib/faq-matcher'

const faqs: FaqEntry[] = [
  {
    question: 'What is the national language of Bhutan?',
    answer: 'The national language of Bhutan is Dzongkha.',
  },
  {
    question: 'Is it safe to drink tap water in Bhutan?',
    answer: 'It is recommended to drink bottled or boiled water in Bhutan.',
  },
  {
    question: 'Do I need a visa to visit Bhutan?',
    answer: 'Indian nationals do not require a visa to visit Bhutan.',
  },
]

describe('findBestFaqMatch', () => {
  it('matches an exact question', () => {
    const match = findBestFaqMatch('What is the national language of Bhutan?', faqs)
    expect(match?.entry.answer).toBe('The national language of Bhutan is Dzongkha.')
  })

  it('matches a differently-phrased question sharing keywords', () => {
    const match = findBestFaqMatch('what language is spoken in bhutan', faqs)
    expect(match?.entry.question).toBe('What is the national language of Bhutan?')
  })

  it('matches on a different topic (water safety)', () => {
    const match = findBestFaqMatch('can I drink the tap water there', faqs)
    expect(match?.entry.question).toBe('Is it safe to drink tap water in Bhutan?')
  })

  it('returns null for a question with no meaningful keyword overlap', () => {
    const match = findBestFaqMatch('what is the weather like on the moon', faqs)
    expect(match).toBeNull()
  })

  it('returns null for an empty or whitespace-only query', () => {
    expect(findBestFaqMatch('', faqs)).toBeNull()
    expect(findBestFaqMatch('   ', faqs)).toBeNull()
  })

  it('returns null when given an empty faq list', () => {
    expect(findBestFaqMatch('do I need a visa', [])).toBeNull()
  })
})
