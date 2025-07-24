import httpErrors from 'http-errors';
const createHttpError = httpErrors;

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request');
    error.details = err.details;
    next(error);
  }
};
