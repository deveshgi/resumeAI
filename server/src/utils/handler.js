const handler = (reqHandler) => {
  return(req, res, next) => {
    Promise.resolve(reqHandler(req, res, next))
    .catch((error) => next(error));
  }
};

export { handler };

