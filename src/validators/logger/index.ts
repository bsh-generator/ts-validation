const timestamp = () => new Date().toISOString();

type LogLevel = "INFO" | "WARNING" | "ERROR"

const prefix = (level: LogLevel, tag: string) => `[${timestamp()}] [@bshg/validation] [${level}] [${tag}]`;

const info = (tag: string, log?: boolean, ...data: any[]) => {
  if (log) console.log(prefix("INFO", tag), ...data);
};

const warn = (tag: string, log?: boolean, ...data: any[]) => {
  if (log) console.warn(prefix("WARNING", tag), ...data);
};

const error = (tag: string, log?: boolean, ...data: any[]) => {
  if (log) console.error(prefix("ERROR", tag), ...data);
};

export default { info, warn, error };

export const LOGGER = { info, warn, error };