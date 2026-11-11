describe('SITE_URL', () => {
  const ORIGINAL_ENV = process.env.NEXT_PUBLIC_SITE_URL;

  afterEach(() => {
    if (ORIGINAL_ENV === undefined) {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    } else {
      process.env.NEXT_PUBLIC_SITE_URL = ORIGINAL_ENV;
    }
    jest.resetModules();
  });

  it('defaults to the canonical dthholiday.com domain when no env var is set', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    jest.resetModules();
    const { SITE_URL } = require('../../config/site');
    expect(SITE_URL).toBe('https://dthholiday.com');
  });

  it('uses NEXT_PUBLIC_SITE_URL when explicitly set', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://staging.example.com';
    jest.resetModules();
    const { SITE_URL } = require('../../config/site');
    expect(SITE_URL).toBe('https://staging.example.com');
  });
});
