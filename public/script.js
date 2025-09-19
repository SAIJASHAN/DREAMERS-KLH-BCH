// Utility to get all selected files from inputs
function getAllFiles() {
  const files = [];
  ['file1', 'file2', 'file3'].forEach(id => {
    const input = document.getElementById(id);
    if (input.files.length) {
      for (const f of input.files) files.push(f);
    }
  });
  return files;
}

// Enable analyze button if at least 2 files selected
function checkFiles() {
  const totalFiles = getAllFiles().length;
  document.getElementById('analyze-btn').disabled = totalFiles < 2;
}

['file1', 'file2', 'file3'].forEach(id => {
  document.getElementById(id).addEventListener('change', checkFiles);
});

document.getElementById('analyze-btn').addEventListener('click', async () => {
  const btn = document.getElementById('analyze-btn');
  btn.textContent = 'Analyzing...';
  btn.disabled = true;

  const files = getAllFiles();
  const formData = new FormData();
  files.forEach(file => formData.append('documents', file));

  try {
    const res = await fetch('/api/analyze', { method: 'POST', body: formData });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('total-docs').textContent = data.totalDocs;
      document.getElementById('total-conflicts').textContent = data.totalConflicts;
      document.getElementById('balance').textContent = data.balance;
      document.getElementById('total-spent').textContent = data.totalSpent;

      document.getElementById('results-section').classList.remove('hidden');
    } else {
      alert(data.error || 'Analysis failed');
    }
  } catch (err) {
    alert('Network error during analysis');
  } finally {
    btn.textContent = 'Analyze Documents';
    checkFiles();
  }
});

document.getElementById('generate-report-btn').addEventListener('click', async () => {
  const btn = document.getElementById('generate-report-btn');
  btn.textContent = 'Generating...';
  btn.disabled = true;

  try {
    const res = await fetch('/api/generate-report', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      document.getElementById('total-reports').textContent = data.totalReports;
      document.getElementById('balance').textContent = data.balance;
      document.getElementById('total-spent').textContent = data.totalSpent;
      document.getElementById('report-date').textContent = data.reportDate;
      document.getElementById('report-section').classList.remove('hidden');
    } else {
      alert(data.error || 'Report generation failed');
    }
  } catch {
    alert('Network error during report generation');
  } finally {
    btn.textContent = 'Generate Report';
    btn.disabled = false;
  }
});

document.getElementById('monitor-btn').addEventListener('click', async () => {
  const url = prompt('Enter the URL you want to monitor for changes:');
  if (!url) return;

  try {
    const res = await fetch('/api/monitor-url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    if (res.ok) {
      const container = document.getElementById('monitored-urls');
      const div = document.createElement('div');
      div.textContent = url;
      container.appendChild(div);

      document.getElementById('balance').textContent = data.balance;
      document.getElementById('total-spent').textContent = data.totalSpent;
      alert(`URL added for monitoring: ${url}`);
    } else {
      alert(data.error || 'Failed to add URL');
    }
  } catch {
    alert('Network error while adding monitoring URL');
  }
});
