import { getDemoLoginResponse, DEMO_AUTH_CREDENTIALS } from './demo-auth.util';

describe('getDemoLoginResponse', () => {
  it('returns a demo login response for the built-in credentials', () => {
    const response = getDemoLoginResponse({
      email: DEMO_AUTH_CREDENTIALS.email,
      password: DEMO_AUTH_CREDENTIALS.password,
    });

    expect(response?.user.email).toBe(DEMO_AUTH_CREDENTIALS.email);
    expect(response?.accessToken).toContain('demo-');
  });

  it('returns null for invalid credentials', () => {
    const response = getDemoLoginResponse({
      email: 'wrong@example.com',
      password: 'wrong-password',
    });

    expect(response).toBeNull();
  });
});
