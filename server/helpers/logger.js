'use strict';
import Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const transport = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  dirname: 'server/logs',
  maxSize: '20m',
  maxFiles: '30d'
});

const errorFormat = Winston.format.printf(error => {
    if (Array.isArray(error.message)) {
        error.message = error.message.join('\n');
    }
  return `${error.timestamp}: ${error.level}: ${error.stack ? error.stack : JSON.stringify(error)}\n`;
});

const logger = Winston.createLogger({
  format: Winston.format.combine(
    Winston.format.label({ label: 'Application' }),
    Winston.format.json(),
    Winston.format.timestamp(),
    Winston.format.prettyPrint(),
    errorFormat
  ),
  transports: [
    transport
  ]
});

export default logger;
