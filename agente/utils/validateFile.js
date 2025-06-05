export function validateFile(req, res, next) {
  const file = req.file;
  if (!file || file.mimetype !== 'application/pdf' || file.size > 5 * 1024 * 1024) {
    return res.status(400).json({ success: false, error: 'Arquivo inválido ou muito grande.' });
  }
  next();
}

