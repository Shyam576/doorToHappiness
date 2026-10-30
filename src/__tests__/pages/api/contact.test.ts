import jwt from 'jsonwebtoken';
import type { NextApiResponse } from 'next';
import type { NextApiRequestWithAuth } from '../../../middleware/withAuth';

function createMockRes() {
  const res: any = {};
  res.statusCode = 200;
  res.status = jest.fn((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = jest.fn((payload: any) => {
    res.body = payload;
    return res;
  });
  res.setHeader = jest.fn();
  res.end = jest.fn();
  return res as NextApiResponse & { statusCode: number; body: any; setHeader: jest.Mock };
}

function createMockReq(overrides: Partial<NextApiRequestWithAuth> = {}): NextApiRequestWithAuth {
  return {
    method: 'GET',
    query: {},
    body: {},
    headers: {},
    ...overrides,
  } as NextApiRequestWithAuth;
}

function adminCookie() {
  const token = jwt.sign({ userId: 'admin-1', role: 'admin' }, 'test-secret');
  return `authToken=${token}`;
}

function nonAdminCookie() {
  const token = jwt.sign({ userId: 'editor-1', role: 'editor' }, 'test-secret');
  return `authToken=${token}`;
}

describe('/api/contact', () => {
  let handler: typeof import('../../../pages/api/contact').default;
  let Contact: { find: jest.Mock; findById: jest.Mock; findByIdAndDelete: jest.Mock; create: jest.Mock };

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret';
    jest.resetModules();

    jest.doMock('../../../lib/dbConnect', () => ({
      __esModule: true,
      default: jest.fn().mockResolvedValue(undefined),
    }));

    jest.doMock('../../../models/contact', () => ({
      __esModule: true,
      default: {
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndDelete: jest.fn(),
        create: jest.fn(),
      },
    }));

    handler = require('../../../pages/api/contact').default;
    Contact = require('../../../models/contact').default;
  });

  beforeEach(() => {
    Contact.find.mockReset();
    Contact.findById.mockReset();
    Contact.findByIdAndDelete.mockReset();
    Contact.create.mockReset();
  });

  describe('GET (admin-only)', () => {
    it('rejects a request with no auth cookie', async () => {
      const req = createMockReq({ method: 'GET' });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(401);
      expect(Contact.find).not.toHaveBeenCalled();
    });

    it('rejects a logged-in user who is not an admin', async () => {
      const req = createMockReq({ method: 'GET', headers: { cookie: nonAdminCookie() } });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(403);
      expect(Contact.find).not.toHaveBeenCalled();
    });

    it('returns all contacts for an authenticated admin', async () => {
      Contact.find.mockResolvedValue([{ name: 'Jane', email: 'jane@example.com' }]);
      const req = createMockReq({ method: 'GET', headers: { cookie: adminCookie() } });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: [{ name: 'Jane', email: 'jane@example.com' }],
      });
      expect(Contact.find).toHaveBeenCalledWith({});
    });
  });

  describe('DELETE (admin-only)', () => {
    it('rejects a request with no auth cookie', async () => {
      const req = createMockReq({ method: 'DELETE', query: { id: '123' } });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(401);
      expect(Contact.findByIdAndDelete).not.toHaveBeenCalled();
    });

    it('deletes a contact for an authenticated admin', async () => {
      Contact.findByIdAndDelete.mockResolvedValue({ _id: '123' });
      const req = createMockReq({ method: 'DELETE', query: { id: '123' }, headers: { cookie: adminCookie() } });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(200);
      expect(Contact.findByIdAndDelete).toHaveBeenCalledWith('123');
    });
  });

  describe('POST (stays public — lead capture)', () => {
    it('creates a contact with no auth required', async () => {
      Contact.create.mockResolvedValue({ name: 'Jane', email: 'jane@example.com' });
      const req = createMockReq({
        method: 'POST',
        body: { name: 'Jane', email: 'jane@example.com', message: 'Hi' },
      });
      const res = createMockRes();

      await handler(req, res);

      expect(res.statusCode).toBe(201);
      expect(Contact.create).toHaveBeenCalledWith(req.body);
    });
  });

  describe('CORS', () => {
    it('does not send a wildcard Access-Control-Allow-Origin header', async () => {
      const req = createMockReq({ method: 'GET', headers: { cookie: adminCookie() } });
      const res = createMockRes();

      await handler(req, res);

      const corsCalls = res.setHeader.mock.calls.filter(([name]: [string]) => name === 'Access-Control-Allow-Origin');
      expect(corsCalls).toHaveLength(0);
    });
  });
});
