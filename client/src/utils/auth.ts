import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;

  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);

  }
  
  isTokenExpired(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) {
      return true;
    }
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
