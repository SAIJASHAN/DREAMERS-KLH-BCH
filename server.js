const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// In-memory store for demo (replace with DB in production)
let usageStats = {
  totalDocs: 0,
  totalConflicts: 0,
  totalReports: 0,
  balance: 0,
  totalSpent: 0,
};
let monitoredUrls = [];

// Multer setup for file uploads (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint to upload documents for analysis
app.post('/api/analyze', upload.array('documents', 3), (req, res) => {
  const files = req.files;
  if (!files || files.length < 2) {
    return res.status(400).json({ error: 'Please upload at least 2 documents.' });
  }

  // Simulate analysis logic
  const conflictsFound = 3; // example fixed number

  // Update usage stats
  usageStats.totalDocs += files.length;
  usageStats.totalConflicts = conflictsFound;
  usageStats.balance += files.length * 0.5;
  usageStats.totalSpent += files.length * 0.5;

  res.json({
    message: 'Analysis complete',
    totalDocs: usageStats.totalDocs,
    totalConflicts: usageStats.totalConflicts,
    balance: usageStats.balance.toFixed(2),
    totalSpent: usageStats.totalSpent.toFixed(2),
  });
});

// Endpoint to generate report
app.post('/api/generate-report', (req, res) => {
  usageStats.totalReports++;
  usageStats.balance += 1.0;
  usageStats.totalSpent += 1.0;

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  res.json({
    message: 'Report generated',
    totalReports: usageStats.totalReports,
    balance: usageStats.balance.toFixed(2),
    totalSpent: usageStats.totalSpent.toFixed(2),
    reportDate,
  });
});

// Endpoint to add monitored URL
app.post('/api/monitor-url', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  monitoredUrls.push(url);
  usageStats.balance += 0.1;
  usageStats.totalSpent += 0.1;

  res.json({
    message: 'URL added for monitoring',
    monitoredUrls,
    balance: usageStats.balance.toFixed(2),
    totalSpent: usageStats.totalSpent.toFixed(2),
  });
});

// Endpoint to get current stats
app.get('/api/stats', (req, res) => {
  res.json({
    usageStats,
    monitoredUrls,
  });
});

app.listen(port, () => {
  console.log(`Smart Doc Checker app listening at http://localhost:${port}`);
});
