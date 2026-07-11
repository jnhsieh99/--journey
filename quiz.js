/**
 * quiz.js — GEPT 練習平台測驗引擎
 *
 * 依賴：
 *   - data.js     (GEPT_DATA, getRandomQuestions, getLevelInfo)
 *   - progress.js (saveResult, formatTime)
 *
 * 使用方式：
 *   const quiz = new QuizEngine({ level: 'elementary', count: 10 });
 *   quiz.mount(document.getElementById('quiz-root'));
 */

class QuizEngine {
  /**
   * @param {object} opts
   * @param {string} opts.level        - 'elementary' | 'intermediate' | 'highIntermediate'
   * @param {number} [opts.count=10]   - 出題數量
   * @param {number} [opts.timeLimit]  - 每題秒數 (0 = 無限制)
   */
  constructor(opts) {
    this.level     = opts.level;
    this.count     = opts.count || 10;
    this.timeLimit = opts.timeLimit || 0;
    this.levelInfo = getLevelInfo(this.level);

    this.questions = getRandomQuestions(this.level, this.count);
    this.current   = 0;
    this.answers   = [];   // 每題：{ selected, correct, answered }
    this.startTime = null;
    this.elapsed   = 0;
    this._timerInterval = null;
    this._questionTimer = null;
    this._qTimerSec = 0;

    this.root = null;
  }

  // ─────────────────────────────────────────────
  // 掛載到 DOM
  // ─────────────────────────────────────────────
  mount(rootEl) {
    this.root = rootEl;
    this.startTime = Date.now();
    this._startGlobalTimer();
    this._render();
  }

  // ─────────────────────────────────────────────
  // 全域計時
  // ─────────────────────────────────────────────
  _startGlobalTimer() {
    this._timerInterval = setInterval(() => {
      this.elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      const el = this.root && this.root.querySelector('#quiz-elapsed');
      if (el) el.textContent = formatTime(this.elapsed);
    }, 1000);
  }

  _stopGlobalTimer() {
    clearInterval(this._timerInterval);
    this.elapsed = Math.floor((Date.now() - this.startTime) / 1000);
  }

  // ─────────────────────────────────────────────
  // 每題計時（選填）
  // ─────────────────────────────────────────────
  _startQuestionTimer() {
    if (!this.timeLimit) return;
    this._qTimerSec = this.timeLimit;
    this._updateQTimer();
    this._questionTimer = setInterval(() => {
      this._qTimerSec--;
      this._updateQTimer();
      if (this._qTimerSec <= 0) {
        clearInterval(this._questionTimer);
        // 時間到 → 自動以 -1 (未答) 紀錄
        this._recordAnswer(-1);
        this._renderQuestion();
      }
    }, 1000);
  }

  _stopQuestionTimer() {
    clearInterval(this._questionTimer);
  }

  _updateQTimer() {
    const el = this.root && this.root.querySelector('#q-timer-sec');
    const wrap = this.root && this.root.querySelector('#q-timer-wrap');
    if (!el || !wrap) return;
    el.textContent = this._qTimerSec;
    wrap.className = 'quiz-timer';
    if (this._qTimerSec <= 5)  wrap.classList.add('danger');
    else if (this._qTimerSec <= 10) wrap.classList.add('warning');
  }

  // ─────────────────────────────────────────────
  // 渲染
  // ─────────────────────────────────────────────
  _render() {
    if (this.current >= this.questions.length) {
      this._renderResult();
    } else {
      this._renderQuestion();
    }
  }

  _renderQuestion() {
    const q    = this.questions[this.current];
    const ans  = this.answers[this.current];
    const done = ans && ans.answered;
    const idx  = this.current;
    const total = this.questions.length;
    const letters = ['A', 'B', 'C', 'D'];
    const pct = Math.round(((idx) / total) * 100);

    // 每題計時器 HTML
    const timerHtml = this.timeLimit
      ? `<div id="q-timer-wrap" class="quiz-timer">⏱ <span id="q-timer-sec">${this._qTimerSec || this.timeLimit}</span>s</div>`
      : `<div class="quiz-timer">⏱ <span id="quiz-elapsed">${formatTime(this.elapsed)}</span></div>`;

    this.root.innerHTML = `
      <div class="quiz-meta">
        <span class="quiz-badge" style="background:${this.levelInfo.color}">
          ${this.levelInfo.icon} ${this.levelInfo.name}級
        </span>
        ${timerHtml}
      </div>

      <div class="quiz-progress">
        <div class="quiz-progress-label">
          <span>第 ${idx + 1} / ${total} 題</span>
          <span>${pct}%</span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" style="width:${pct}%; background:${this.levelInfo.color}"></div>
        </div>
      </div>

      <div class="question-card">
        <div class="question-meta">
          <span class="tag">第 ${idx + 1} 題</span>
          <span class="tag">${q.category}</span>
        </div>
        <p class="question-text">${q.question}</p>
        <div class="options-list" id="options-list">
          ${q.options.map((opt, i) => {
            let cls = 'option-btn';
            if (done) {
              if (i === q.answer)    cls += ' correct';
              else if (i === ans.selected && i !== q.answer) cls += ' wrong';
            }
            return `
              <button class="${cls}" data-index="${i}" ${done ? 'disabled' : ''}>
                <span class="option-letter">${letters[i]}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="explanation-box${done ? ' show' : ''}" id="explanation-box">
          <strong>💡 解析：</strong> ${q.explanation || '（無解析）'}
        </div>
      </div>

      <div class="quiz-actions">
        <button class="btn btn-outline" id="prev-btn" ${idx === 0 ? 'disabled' : ''}>
          ◀ 上一題
        </button>
        <span style="font-size:.85rem; color:var(--text-muted)">
          答對 <strong id="score-count">${this._correctCount()}</strong> / ${idx} 題
        </span>
        <button class="btn btn-primary" id="next-btn" ${!done ? 'disabled' : ''}>
          ${idx + 1 < total ? '下一題 ▶' : '查看結果 🏆'}
        </button>
      </div>
    `;

    // 事件：選項
    this.root.querySelectorAll('.option-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const sel = parseInt(btn.dataset.index, 10);
        this._stopQuestionTimer();
        this._recordAnswer(sel);
        this._renderQuestion();
      });
    });

    // 事件：下一題
    this.root.querySelector('#next-btn').addEventListener('click', () => {
      if (this.current + 1 < this.questions.length) {
        this.current++;
        this._render();
        this._startQuestionTimer();
      } else {
        this._stopGlobalTimer();
        this._renderResult();
      }
    });

    // 事件：上一題
    this.root.querySelector('#prev-btn').addEventListener('click', () => {
      if (this.current > 0) {
        this.current--;
        this._render();
      }
    });

    // 若題目未回答，啟動每題計時
    if (!done) this._startQuestionTimer();
  }

  _recordAnswer(selected) {
    const q = this.questions[this.current];
    this.answers[this.current] = {
      selected,
      correct: q.answer,
      answered: true,
      isCorrect: selected === q.answer
    };
  }

  _correctCount() {
    return this.answers.filter(a => a && a.isCorrect).length;
  }

  // ─────────────────────────────────────────────
  // 結果頁
  // ─────────────────────────────────────────────
  _renderResult() {
    this._stopGlobalTimer();
    const correct  = this._correctCount();
    const total    = this.questions.length;
    const pct      = Math.round((correct / total) * 100);
    const timeSec  = this.elapsed;

    // 存進度
    saveResult(this.level, correct, total, timeSec);

    // 評語
    let grade, emoji, comment;
    if (pct >= 90) {
      grade = '優秀'; emoji = '🏆'; comment = '表現非常出色！你已掌握此級別的關鍵知識。';
    } else if (pct >= 75) {
      grade = '良好'; emoji = '🌟'; comment = '表現良好，再加強幾個弱點就可以更上層樓！';
    } else if (pct >= 60) {
      grade = '及格'; emoji = '👍'; comment = '剛剛通過門檻，繼續練習可以大幅提升成績！';
    } else {
      grade = '需加強'; emoji = '📖'; comment = '還需要多加練習，建議複習單字與文法基礎。';
    }

    // 級別主頁連結
    const homeLink = 'home.html';
    const retryLink = `${this.level === 'elementary' ? 'elementary' : this.level === 'intermediate' ? 'intermediate' : 'high-intermediate'}.html`;

    this.root.innerHTML = `
      <div class="result-wrapper">
        <div class="result-score-ring" style="border-color:${this.levelInfo.color}">
          <div class="score-number" style="color:${this.levelInfo.color}">${pct}<span style="font-size:1.2rem">%</span></div>
          <div class="score-label">${grade} ${emoji}</div>
        </div>

        <h2 class="result-title">測驗完成！</h2>
        <p class="result-subtitle">${comment}</p>

        <div class="result-details">
          <div class="result-row">
            <span class="label">級別</span>
            <span class="value">${this.levelInfo.icon} ${this.levelInfo.name}級 (${this.levelInfo.nameEn})</span>
          </div>
          <div class="result-row">
            <span class="label">答對題數</span>
            <span class="value" style="color:var(--correct)">${correct} / ${total}</span>
          </div>
          <div class="result-row">
            <span class="label">正確率</span>
            <span class="value" style="color:${this.levelInfo.color}">${pct}%</span>
          </div>
          <div class="result-row">
            <span class="label">作答時間</span>
            <span class="value">⏱ ${formatTime(timeSec)}</span>
          </div>
          <div class="result-row">
            <span class="label">平均每題</span>
            <span class="value">${total > 0 ? formatTime(Math.round(timeSec / total)) : '—'}</span>
          </div>
        </div>

        ${this._renderAnswerReview()}

        <div class="result-actions">
          <a href="${retryLink}" class="btn btn-primary">🔄 再測一次</a>
          <a href="${homeLink}" class="btn btn-outline">🏠 回首頁</a>
        </div>
      </div>
    `;
  }

  // 答題回顧
  _renderAnswerReview() {
    const letters = ['A', 'B', 'C', 'D'];
    const rows = this.questions.map((q, i) => {
      const a = this.answers[i];
      if (!a) return '';
      const icon = a.isCorrect ? '✅' : (a.selected === -1 ? '⏱' : '❌');
      const selText = a.selected >= 0 ? `${letters[a.selected]}: ${q.options[a.selected]}` : '（未作答）';
      const correctText = `${letters[q.answer]}: ${q.options[q.answer]}`;
      return `
        <div class="result-row" style="flex-direction:column; align-items:flex-start; gap:4px">
          <span style="font-weight:600">${icon} 第${i+1}題（${q.category}）</span>
          <span style="font-size:.82rem; color:var(--text-muted)">
            你的答案：<span style="color:${a.isCorrect ? 'var(--correct)' : 'var(--wrong)'}">${selText}</span>
            ${!a.isCorrect ? ` ／ 正確：<span style="color:var(--correct)">${correctText}</span>` : ''}
          </span>
        </div>
      `;
    }).join('');

    return `
      <div class="result-details" style="margin-bottom:24px; text-align:left">
        <div style="font-weight:700; margin-bottom:12px; font-size:.95rem">📋 答題回顧</div>
        ${rows}
      </div>
    `;
  }
}
