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

// jsdom doesn't provide TextEncoder/TextDecoder, but react-dom/server's build
// resolution under the jsdom test environment needs them. Only tests that
// render through react-dom/server (e.g. to catch HTML-escaping bugs) hit this.
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util')
  global.TextEncoder = TextEncoder
  global.TextDecoder = TextDecoder
}
