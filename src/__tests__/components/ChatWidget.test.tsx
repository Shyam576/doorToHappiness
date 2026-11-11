import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ChatWidget from '../../components/ChatWidget'

jest.mock('../../data/faq.json', () => [
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
])

describe('ChatWidget', () => {
  it('is open by default, with suggested questions and an input visible', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    expect(screen.getByRole('button', { name: /chat with us/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'What is the national language of Bhutan?' })).toBeInTheDocument()
  })

  it('closes on the close button and reopens on the launcher', () => {
    render(<ChatWidget phoneNumber="9771234567" />)

    fireEvent.click(screen.getByRole('button', { name: /close chat/i }))
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /chat with us/i }))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('answers a suggested question with its real FAQ answer', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    fireEvent.click(screen.getByRole('button', { name: 'Do I need a visa to visit Bhutan?' }))

    expect(screen.getByText('Indian nationals do not require a visa to visit Bhutan.')).toBeInTheDocument()
  })

  it('answers a typed, differently-phrased question via fuzzy matching', () => {
    render(<ChatWidget phoneNumber="9771234567" />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'can i drink the tap water there' } })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    expect(
      screen.getByText('It is recommended to drink bottled or boiled water in Bhutan.')
    ).toBeInTheDocument()
  })

  it('falls back to a WhatsApp handoff, pre-filled with the question, when nothing matches confidently', () => {
    render(<ChatWidget phoneNumber="9771234567" />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'random gibberish about spaceships and aliens' },
    })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    const handoff = screen.getByRole('link', { name: /continue on whatsapp/i })
    expect(handoff).toHaveAttribute(
      'href',
      expect.stringContaining('https://wa.me/9771234567?text=')
    )
    expect(decodeURIComponent(handoff.getAttribute('href') || '')).toContain(
      'random gibberish about spaceships and aliens'
    )
  })

  it('always offers a direct WhatsApp link, even before asking anything', () => {
    render(<ChatWidget phoneNumber="9771234567" />)

    const preferWhatsApp = screen.getByRole('link', { name: /prefer whatsapp/i })
    expect(preferWhatsApp).toHaveAttribute('href', expect.stringContaining('https://wa.me/9771234567'))
  })
})
