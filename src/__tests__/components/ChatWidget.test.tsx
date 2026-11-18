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

// The widget starts closed so it doesn't cover page content (especially the
// hero/CTA on mobile) before a visitor asks for it. Tests open it via the
// launcher button first, same as a real visitor would.
function openWidget() {
  fireEvent.click(screen.getByRole('button', { name: /chat with us/i }))
}

describe('ChatWidget', () => {
  it('starts closed, and opens via the launcher with suggested questions and an input visible', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    expect(screen.getByRole('button', { name: /chat with us/i })).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    openWidget()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'What is the national language of Bhutan?' })).toBeInTheDocument()
  })

  it('closes on the close button and reopens on the launcher', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()

    fireEvent.click(screen.getByRole('button', { name: /close chat/i }))
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /chat with us/i }))
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('replies to a plain greeting instead of bouncing it to WhatsApp', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hi' } })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    expect(screen.getByText(/hi there/i)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /continue on whatsapp/i })).not.toBeInTheDocument()
  })

  it('answers a suggested question with its real FAQ answer', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()
    fireEvent.click(screen.getByRole('button', { name: 'Do I need a visa to visit Bhutan?' }))

    expect(screen.getByText('Indian nationals do not require a visa to visit Bhutan.')).toBeInTheDocument()
  })

  it('answers a typed, differently-phrased question via fuzzy matching', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'can i drink the tap water there' } })
    fireEvent.click(screen.getByRole('button', { name: /^send$/i }))

    expect(
      screen.getByText('It is recommended to drink bottled or boiled water in Bhutan.')
    ).toBeInTheDocument()
  })

  it('falls back to a WhatsApp handoff, pre-filled with the question, when nothing matches confidently', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()

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

  it('always offers a direct WhatsApp link once opened, even before asking anything', () => {
    render(<ChatWidget phoneNumber="9771234567" />)
    openWidget()

    const preferWhatsApp = screen.getByRole('link', { name: /prefer whatsapp/i })
    expect(preferWhatsApp).toHaveAttribute('href', expect.stringContaining('https://wa.me/9771234567'))
  })
})
