import React from 'react'
import { render } from '@testing-library/react'
import Index from '../pages/index'

// Mock the Next.js Head component
jest.mock('next/head', () => {
  return function Head({ children }: { children: React.ReactNode }) {
    return <>{children}</>
  }
})

// Mock the theme utility
jest.mock('../styles/themes', () => ({
  getTheme: () => ({
    primary: '#000000',
    secondary: '#ffffff'
  })
}))

// TripCostPreview (hero's trip-cost picker) deep-links via next/router
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
}))

describe('Homepage', () => {
  it('renders without crashing', () => {
    render(<Index />)
    // Check if the main content is rendered
    expect(document.body).toBeInTheDocument()
  })
})
