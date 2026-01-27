export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: unknown;
  error?: Error;
}

export interface LoggerConfig {
  level: LogLevel;
  context?: string;
  enabled: boolean;
  persistLogs: boolean;
  maxStoredLogs: number;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LOG_STORAGE_KEY = 'salsa_admin_logs';

class Logger {
  private config: LoggerConfig = {
    level: 'info',
    enabled: true,
    persistLogs: false,
    maxStoredLogs: 100,
  };

  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    return this.config.enabled && LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  private formatEntry(level: LogLevel, message: string, data?: unknown, error?: Error): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.config.context,
      data,
      error,
    };
  }

  private persist(entry: LogEntry): void {
    if (!this.config.persistLogs) return;

    try {
      const stored = localStorage.getItem(LOG_STORAGE_KEY);
      const logs: LogEntry[] = stored ? JSON.parse(stored) : [];
      logs.push(entry);

      if (logs.length > this.config.maxStoredLogs) {
        logs.splice(0, logs.length - this.config.maxStoredLogs);
      }

      localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // Ignore storage errors
    }
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry = this.formatEntry(level, message, data, error);
    this.persist(entry);

    const prefix = this.config.context ? `[${this.config.context}]` : '';
    const logFn = console[level] || console.log;

    if (error) {
      logFn(`${entry.timestamp} ${level.toUpperCase()} ${prefix} ${message}`, data || '', error);
    } else if (data !== undefined) {
      logFn(`${entry.timestamp} ${level.toUpperCase()} ${prefix} ${message}`, data);
    } else {
      logFn(`${entry.timestamp} ${level.toUpperCase()} ${prefix} ${message}`);
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: unknown): void {
    this.log('error', message, data, error);
  }

  getStoredLogs(): LogEntry[] {
    try {
      const stored = localStorage.getItem(LOG_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  clearStoredLogs(): void {
    localStorage.removeItem(LOG_STORAGE_KEY);
  }

  child(context: string): Logger {
    const childLogger = new Logger();
    childLogger.configure({
      ...this.config,
      context: this.config.context ? `${this.config.context}:${context}` : context,
    });
    return childLogger;
  }
}

export const logger = new Logger();
export { Logger };
