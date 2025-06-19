import { TOKEN_KEYS } from '@src/config/axios/constants';

class TokenManager {
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  getAccessToken(): string | null {
    return this.getCookie(TOKEN_KEYS.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return this.getCookie(TOKEN_KEYS.REFRESH_TOKEN);
  }

  getCsrfToken(): string | null {
    return this.getCookie(TOKEN_KEYS.CSRF_TOKEN);
  }
}

export const tokenManager = new TokenManager();
