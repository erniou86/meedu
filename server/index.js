const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');
let db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/api/courses', (req, res) => {
  res.json(db.courses.map((c) => ({ id: c.id, title: c.title, description: c.description, price: c.price, cover: c.cover, chapterCount: c.chapters.length })));
});

app.get('/api/courses/:id', (req, res) => {
  const course = db.courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'course not found' });
  res.json(course);
});

// 购买课程（演示：直接记录）
app.post('/api/courses/:id/buy', (req, res) => {
  const course = db.courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: 'course not found' });
  const buyer = (req.body && req.body.userId) || 'anonymous';
  if (db.purchases.some((p) => p.courseId === course.id && p.userId === buyer)) {
    return res.status(409).json({ error: 'already purchased' });
  }
  db.purchases.push({ courseId: course.id, userId: buyer, at: new Date().toISOString(), amount: course.price });
  save();
  res.json({ ok: true, purchased: course.id });
});

app.get('/api/purchases', (req, res) => {
  res.json(db.purchases);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`MeEdu API running on http://localhost:${port}`);
});
