import { getSmallTalkReply } from '../../lib/small-talk'

describe('getSmallTalkReply', () => {
  it('replies to a greeting', () => {
    expect(getSmallTalkReply('hi')).toMatch(/hi there/i)
    expect(getSmallTalkReply('Hello!')).toMatch(/hi there/i)
    expect(getSmallTalkReply('hey there')).toMatch(/hi there/i)
  })

  it('replies to thanks', () => {
    expect(getSmallTalkReply('thank you so much')).toMatch(/you're welcome/i)
    expect(getSmallTalkReply('thanks')).toMatch(/you're welcome/i)
  })

  it('replies to a capability question', () => {
    expect(getSmallTalkReply('what can you help with')).toMatch(/common questions about visiting bhutan/i)
    expect(getSmallTalkReply('who are you')).toMatch(/common questions about visiting bhutan/i)
  })

  it('replies to a farewell', () => {
    expect(getSmallTalkReply('bye')).toMatch(/goodbye/i)
  })

  it('returns null for a real FAQ-shaped question, leaving it to the FAQ matcher', () => {
    expect(getSmallTalkReply('do I need a visa for bhutan')).toBeNull()
    expect(getSmallTalkReply('is it safe to drink the water')).toBeNull()
  })

  it('returns null for an empty query', () => {
    expect(getSmallTalkReply('')).toBeNull()
    expect(getSmallTalkReply('   ')).toBeNull()
  })
})
