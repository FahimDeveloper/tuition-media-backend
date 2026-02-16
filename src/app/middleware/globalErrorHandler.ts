import { ErrorRequestHandler } from 'express'
import { TErrorSources } from '../errors/error.types'
import { ZodError } from 'zod'
import AppError from '../errors/appError'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import { handleJsonWebTokenError } from '../errors/handleJsonWebTokenError'
import handleDuplicateError from '../errors/handleDuplicateError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (
    err?.name === 'JsonWebTokenError' ||
    err?.name === 'TokenExpiredError'
  ) {
    const simplifiedError = handleJsonWebTokenError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }
  if (config.node_env === 'development') {
    res.status(statusCode).json({
      message,
      errorSources,
      stack: config.node_env === 'development' ? err?.stack : null,
    })
  } else {
    res.status(statusCode).json({
      message,
      errorSources,
    })
  }
}

export default globalErrorHandler
