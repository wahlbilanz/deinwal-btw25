// import morgan from 'morgan';
import { logger } from './winston';
import { Logger } from 'winston';
import morgan from 'morgan';

const stream = {
  // Use the http severity
  write: (message: string): Logger => logger.http(message),
};

const skip = (): boolean => {
  const env = process.env['NODE_ENV'] || 'development';
  return env !== 'development';
};

export const morganMiddleware = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':method :url :status :res[content-length] - :response-time ms -- :user-agent FROM :referrer',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip },
);
