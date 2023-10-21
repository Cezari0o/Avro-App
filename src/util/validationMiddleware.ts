import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

/**
 * Util function to handle validation errors
 * @returns 
 */
function validationMiddleware() {

  return (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      next();
      return;
    }
    const errors = result.array().map(err => ({ [(err as any).path]: err.msg }));

    res.status(StatusCodes.BAD_REQUEST).json({ error: true, message: `Error in request!`, errors: errors });
  }
}

export default validationMiddleware;