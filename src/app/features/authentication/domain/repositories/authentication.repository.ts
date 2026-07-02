import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login-request.model';
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '../models/password-reset.model';
import {
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../models/refresh-token-request.model';

export abstract class AuthenticationRepository {
  abstract login(request: LoginRequest): Observable<LoginResponse>;
  abstract logout(): Observable<void>;
  abstract refreshToken(request: RefreshTokenRequest): Observable<RefreshTokenResponse>;
  abstract forgotPassword(request: ForgotPasswordRequest): Observable<ForgotPasswordResponse>;
  abstract resetPassword(request: ResetPasswordRequest): Observable<void>;
  abstract changePassword(request: ChangePasswordRequest): Observable<void>;
}