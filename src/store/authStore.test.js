import { describe, it, expect, beforeEach } from 'vitest';
import useAuthStore from './authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.getState().logout();
  });

  it('should have initial state', () => {
    const state = useAuthStore.getState();
    expect(state.token).toBe(null);
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('should set token and update isAuthenticated', () => {
    const token = 'fake-token';
    useAuthStore.getState().setToken(token);
    
    const state = useAuthStore.getState();
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should set user', () => {
    const user = { id: 1, email: 'test@example.com' };
    useAuthStore.getState().setUser(user);
    
    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
  });

  it('should logout and clear state', () => {
    useAuthStore.getState().setToken('fake-token');
    useAuthStore.getState().setUser({ id: 1 });
    
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.token).toBe(null);
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });
});
