import { format, transports, createLogger } from 'winston'

const { timestamp, combine, colorize, errors, json, printf, simple } = format
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/strict-boolean-expressions
const formatLogger = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level} ${stack || message}`)

export class EventLogger {
  constructor (
    private readonly enviroment: string,
    private readonly devLoggerConfig: any,
    private readonly prodLoggerConfig: any
  ) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getLoggerInfo (message: string) {
    return this.setLogger().info(message)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getLoggerError (message: string) {
    return this.setLogger().error(message)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  private setLogger () {
    const typeLogger = this.enviroment === 'development' ? this.devLoggerConfig : this.prodLoggerConfig
    return createLogger(typeLogger)
  }
}

const enviroment = process.env.NODE_ENV
const devLoggerConfig = {
  format: combine(
    simple(),
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    formatLogger
  ),
  defaultMeta: { service: 'backend' },
  transports: [new transports.Console()]
}

const producLoggerConfig = {
  format: combine(
    timestamp(),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: 'backend' },
  transports: [new transports.File({
    maxsize: 5120000,
    maxFiles: 5,
    // eslint-disable-next-line n/no-path-concat
    filename: `${__dirname}/../logs/logger.log`
  })]
}

export const eventLogger = new EventLogger(
  enviroment,
  devLoggerConfig,
  producLoggerConfig
)
