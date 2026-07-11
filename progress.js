/**
 * progress.js — GEPT 練習平台進度追蹤工具
 * 使用 localStorage 儲存與讀取每個級別的測驗紀錄
 */

const STORAGE_KEY = 'gept_progress';

// ── 讀取全部進度 ───────────────────────────────
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ── 儲存全部進度 ───────────────────────────────
function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage 不可用時靜默失敗
  }
}

// ── 儲存單次測驗結果 ───────────────────────────
/**
 * @param {string} level    - 'elementary' | 'intermediate' | 'highIntermediate'
 * @param {number} score    - 答對題數
 * @param {number} total    - 總題數
 * @param {number} timeSec  - 作答秒數
 */
function saveResult(level, score, total, timeSec) {
  const data = loadProgress();
  if (!data[level]) {
    data[level] = { attempts: 0, bestScore: 0, bestPct: 0, totalTime: 0, history: [] };
  }
  const entry = data[level];
  const pct = Math.round((score / total) * 100);

  entry.attempts += 1;
  entry.totalTime += timeSec;
  if (pct > entry.bestPct) {
    entry.bestScore = score;
    entry.bestPct   = pct;
  }
  entry.history.push({
    date:    new Date().toISOString(),
    score,
    total,
    pct,
    timeSec
  });
  // 最多保留最近 20 筆
  if (entry.history.length > 20) entry.history.shift();

  saveProgress(data);
  return entry;
}

// ── 取得某級別進度 ─────────────────────────────
function getLevelProgress(level) {
  const data = loadProgress();
  return data[level] || { attempts: 0, bestScore: 0, bestPct: 0, totalTime: 0, history: [] };
}

// ── 全站統計 ───────────────────────────────────
function getGlobalStats() {
  const data = loadProgress();
  let totalAttempts = 0;
  let totalTime     = 0;
  let levelsStarted = 0;

  for (const level of Object.keys(data)) {
    const e = data[level];
    totalAttempts += e.attempts || 0;
    totalTime     += e.totalTime || 0;
    if ((e.attempts || 0) > 0) levelsStarted++;
  }

  return { totalAttempts, totalTime, levelsStarted };
}

// ── 清除進度 ───────────────────────────────────
function clearProgress(level) {
  const data = loadProgress();
  if (level) {
    delete data[level];
  } else {
    Object.keys(data).forEach(k => delete data[k]);
  }
  saveProgress(data);
}

// ── 格式化秒數 ─────────────────────────────────
function formatTime(sec) {
  if (!sec || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ── 進度百分比（用於進度條） ─────────────────
function progressPct(level) {
  const p = getLevelProgress(level);
  if (!p.attempts) return 0;
  return Math.min(Math.round((p.bestPct)), 100);
}
