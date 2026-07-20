// 讀取各級別測驗頁（quiz.js）寫入的 localStorage 紀錄，
// 讓首頁儀表板的統計數字、強弱項分析、級別完成狀態與測驗結果即時連動。

(function () {
    const STORAGE_KEY = 'geptProgress';

    const CATEGORY_META = {
        vocabulary: { title: '詞彙辨析', icon: '📖' },
        grammar: { title: '文法結構', icon: '🧩' },
        tense: { title: '時態運用', icon: '⏳' }
    };

    const LEVEL_ORDER = ['elementary', 'intermediate', 'high'];
    const LEVEL_CEFR = { elementary: 'A2', intermediate: 'B1', high: 'B2' };

    function loadAttempts() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function statusFor(pct) {
        if (pct >= 85) return { cls: 'strong', label: '表現優秀', icon: '✅' };
        if (pct >= 70) return { cls: 'moderate', label: '持續進步', icon: '📈' };
        return { cls: 'weak', label: '需加強', icon: '⚠️' };
    }

    function estimateLevel(attempts) {
        let best = null;
        LEVEL_ORDER.forEach(level => {
            const levelAttempts = attempts.filter(a => a.level === level);
            if (!levelAttempts.length) return;
            const correct = levelAttempts.reduce((s, a) => s + a.score, 0);
            const total = levelAttempts.reduce((s, a) => s + a.total, 0);
            if (total > 0 && correct / total >= 0.6) best = level;
        });
        return best ? LEVEL_CEFR[best] : '—';
    }

    function renderStats(attempts) {
        const days = new Set(attempts.map(a => new Date(a.timestamp).toDateString())).size;

        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const weekSeconds = attempts
            .filter(a => new Date(a.timestamp).getTime() >= weekAgo)
            .reduce((s, a) => s + (a.durationSec || 0), 0);

        const totalQuestions = attempts.reduce((s, a) => s + a.total, 0);

        const daysEl = document.getElementById('stat-days');
        const hoursEl = document.getElementById('stat-hours');
        const questionsEl = document.getElementById('stat-questions');
        const levelEl = document.getElementById('stat-level');

        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = (weekSeconds / 3600).toFixed(1);
        if (questionsEl) questionsEl.textContent = totalQuestions;
        if (levelEl) levelEl.textContent = estimateLevel(attempts);
    }

    function renderWeakness(attempts) {
        const grid = document.getElementById('weaknessGrid');
        if (!grid) return;

        if (!attempts.length) {
            grid.innerHTML = '<div class="empty-state">尚無測驗紀錄，完成第一組測驗後這裡會顯示你的強弱項分析喔！</div>';
            return;
        }

        const cats = {};
        attempts.forEach(a => {
            (a.results || []).forEach(r => {
                if (!cats[r.category]) cats[r.category] = { correct: 0, total: 0, wrong: [] };
                cats[r.category].total++;
                if (r.correct) {
                    cats[r.category].correct++;
                } else {
                    cats[r.category].wrong.push(r.keyword);
                }
            });
        });

        grid.innerHTML = Object.keys(CATEGORY_META).map(catKey => {
            const meta = CATEGORY_META[catKey];
            const stat = cats[catKey];

            if (!stat) {
                return `
                    <div class="weakness-card">
                        <div class="weakness-header"><span class="weakness-icon">${meta.icon}</span></div>
                        <h3 class="weakness-title">${meta.title}</h3>
                        <p style="color:#a0aec0;">尚無練習紀錄</p>
                    </div>`;
            }

            const pct = Math.round((stat.correct / stat.total) * 100);
            const status = statusFor(pct);
            const keywords = [...new Set(stat.wrong)].slice(0, 3);
            const btnLabel = status.cls === 'weak' ? '加強練習' : status.cls === 'moderate' ? '繼續練習' : '保持優勢';

            return `
                <div class="weakness-card ${status.cls}">
                    <div class="weakness-header">
                        <span class="weakness-icon">${status.icon}</span>
                        <span class="weakness-level">${status.label}</span>
                    </div>
                    <h3 class="weakness-title">${meta.title}</h3>
                    <div class="weakness-stats">
                        <div class="stat-item">
                            <span class="stat-label">正確率</span>
                            <span class="stat-value ${status.cls}-value">${pct}%</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">練習次數</span>
                            <span class="stat-value">${stat.total} 題</span>
                        </div>
                    </div>
                    <div class="weakness-keywords">
                        ${keywords.length ? keywords.map(k => `<span class="keyword">${k}</span>`).join('') : '<span class="keyword">尚無錯誤紀錄</span>'}
                    </div>
                    <a href="index.html" class="improve-btn">${btnLabel}</a>
                </div>`;
        }).join('');
    }

    function renderLevelStatus(attempts) {
        LEVEL_ORDER.forEach(level => {
            const el = document.getElementById(`status-${level}`);
            if (!el) return;
            const done = attempts.some(a => a.level === level);
            el.textContent = done ? '已完成' : '未完成';
        });
    }

    function render() {
        const attempts = loadAttempts();
        renderStats(attempts);
        renderWeakness(attempts);
        renderLevelStatus(attempts);
    }

    document.addEventListener('DOMContentLoaded', render);
    window.addEventListener('storage', event => {
        if (event.key === STORAGE_KEY) render();
    });
})();
