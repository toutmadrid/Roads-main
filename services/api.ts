// Configuration des URLs des microservices
const AUTH_SERVICE_URL = 'http://localhost:3001';
const USER_SERVICE_URL = 'http://localhost:3002';

// Helper pour gérer les erreurs
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || 'Une erreur est survenue');
  }
  return response.json();
};

export const api = {
  auth: {
    register: async (email: string, password: string) => {
      const res = await fetch(`${AUTH_SERVICE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(res);
    },
    login: async (email: string, password: string) => {
      const res = await fetch(`${AUTH_SERVICE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(res);
    },
    me: async (token: string) => {
      const res = await fetch(`${AUTH_SERVICE_URL}/auth/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return handleResponse(res);
    }
  },
  user: {
    getProfile: async (userId: string, token: string) => {
      const res = await fetch(`${USER_SERVICE_URL}/user/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      return handleResponse(res);
    },
    updateProfile: async (userId: string, data: { full_name?: string }, token: string) => {
      const res = await fetch(`${USER_SERVICE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data),
      });
      return handleResponse(res);
    }
  }
};