export default function AuthMiddleware(req, res, next) {
  req.user = {
    _id: '6a6e94ebc60db74406ba4d8b',
  };

  next();
}