import React from 'react'

interface HeroErrorBoundaryProps {
  children: React.ReactNode
}

interface HeroErrorBoundaryState {
  hasError: boolean
}

export class HeroErrorBoundary extends React.Component<HeroErrorBoundaryProps, HeroErrorBoundaryState> {
  state: HeroErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): HeroErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('Hero 3D scene failed to render, falling back to static image', error, info)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
