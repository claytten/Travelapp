import { Router } from 'express';

const router = Router();

router.post('/store', (req, res) => {
  res.json({ success: true, message: req.body }).status(200).end();
});

export default router;
