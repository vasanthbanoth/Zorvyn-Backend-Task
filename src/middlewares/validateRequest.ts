import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    
    if (parsed.body) req.body = parsed.body;
    if (parsed.query) Object.defineProperty(req, 'query', { value: parsed.query, writable: true, enumerable: true, configurable: true });
    if (parsed.params) Object.defineProperty(req, 'params', { value: parsed.params, writable: true, enumerable: true, configurable: true });

    next();
  } catch (error) {
    next(error);
  }
};
