require('@testing-library/jest-dom')

// jsdom does not implement ResizeObserver. @headlessui/react's Dialog uses it
// (to auto-close when its panel is hidden/unmounted), so tests that render a
// Dialog need this minimal stub.
if (typeof global.ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
