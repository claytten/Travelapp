import { Router } from 'express';

const router = Router();

router.get('/homepage', (req, res) => {
  res.json({ page: 'homepage' }).status(200).end();
});
router.get('/maps', (req, res) => {
  res.json({ page: 'maps' }).status(200).end();
});
router.get('/data', (req, res) => {
  res.json({ page: 'data' }).status(200).end();
});

export default router;
