import { Observable } from 'rxjs';
import { AppConfig } from '../models/app-config.model';

export abstract class AppConfigRepository {
  abstract getConfig(): Observable<AppConfig>;
  abstract refreshConfig(): Observable<AppConfig>;
}