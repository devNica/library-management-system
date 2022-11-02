/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { eventLogger } from '@common/logger/event-logger'
import { NextFunction, Request, Response } from 'express'
import emoji from 'node-emoji'

function LogEvent (msg: string, emojiType: string): string {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${emoji.get(`:${emojiType}:`)} ${msg}`
}

export class ApiResponse {
  constructor (
    readonly code: number,
    readonly status: boolean,
    public readonly message: string,
    public readonly data: any

  ) {}

  static successRequest (msg: string, meta: any): ApiResponse {
    eventLogger.getLoggerInfo(LogEvent(msg, 'smiley'))
    return new ApiResponse(200, true, msg, meta)
  }

  static createdRequest (msg: string, meta: any) {
    eventLogger.getLoggerInfo(LogEvent(msg, 'white_check_mark'))
    return new ApiResponse(201, true, msg, meta)
  }

  static badRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'angry'))
    return new ApiResponse(400, false, msg, meta)
  }

  static unAuthorizedRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'scream'))
    return new ApiResponse(401, false, msg, meta)
  }

  static forbiddenRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'space_invader'))
    return new ApiResponse(403, false, msg, meta)
  }

  static notFoundRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'unamused'))
    return new ApiResponse(404, false, msg, meta)
  }

  static payloadToLargeRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'triumph'))
    return new ApiResponse(413, false, msg, meta)
  }

  static unProcessableEntityRequest (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'cold_sweat'))
    return new ApiResponse(422, false, msg, meta)
  }

  static internalServerErrorRequets (msg: string, meta: any) {
    eventLogger.getLoggerError(LogEvent(msg, 'confused'))
    return new ApiResponse(500, false, msg, meta)
  }
}

export function httpResponseHandler (api: ApiResponse, _req: Request, res: Response, _next: NextFunction): void {
  if (api instanceof ApiResponse) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    res.status(api.code).json({ message: api.message, data: api.data || [], status: api.status })
  }
}
