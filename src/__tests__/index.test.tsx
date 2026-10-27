import React from 'react'
import { render, screen } from '@testing-library/react'
import Index from '../pages/index'

// Mock the Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

// Mock the WhatsApp button component
jest.mock('../components/whatsAppButton', () => {
  return function WhatsAppButton() {
    return <div data-testid="whatsapp-button">WhatsApp Button</div>
  }
})

// Mock the Hero 3D overlay so this test doesn't pull in three/@react-three/fiber
jest.mock('../components/hero3d/Hero3DOverlay', () => {
  return function Hero3DOverlay() {
    return null
  }
})

// Mock the theme utility
jest.mock('../styles/themes', () => ({
  getTheme: () => ({
    primary: '#000000',
    secondary: '#ffffff'
  })
}))

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Index />)
    // Check if the main content is rendered
    expect(document.body).toBeInTheDocument()
  })

  it('contains the WhatsApp button', () => {
    render(<Index />)
    expect(screen.getByTestId('whatsapp-button')).toBeInTheDocument()
  })
})
