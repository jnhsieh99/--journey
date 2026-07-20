// 共用測驗頁邏輯，供 elementary.html / index.html / high-intermediate.html 使用
// 每個頁面需先設定 `const PAGE_LEVEL = 'elementary' | 'intermediate' | 'high';`
// 並依序載入 data.js -> quiz.js

(function () {
    let currentQuestions = [];
    let quizStartTime = Date.now();

    function getRandomQuestions(level, count) {
        const pool = GEPT_QUESTIONS.filter(q => q.level === level);
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    function getLevelBadge(level) {
        const info = LEVEL_LABELS[level];
        return `<span class="level-badge level-${level === 'high' ? 'high' : level}">${info.name} ${info.cefr}</span>`;
    }

    function generateQuestions() {
        currentQuestions = getRandomQuestions(PAGE_LEVEL, 10);
        const container = document.getElementById('questionsContainer');

        let html = '';
        currentQuestions.forEach((q, index) => {
            html += `
                <div class="question-card" data-answer="${q.answer}">
                    <div class="question-number">第 ${index + 1} 題 ${getLevelBadge(q.level)}</div>
                    <div class="question-text">${q.question}</div>
                    <div class="options">
                        ${q.options.map((opt, i) => `
                            <div class="option">
                                <input type="radio" name="q${index}" id="q${index}${String.fromCharCode(97 + i)}" value="${i}">
                                <label for="q${index}${String.fromCharCode(97 + i)}">(${String.fromCharCode(65 + i)}) ${opt}</label>
                            </div>
                        `).join('')}
                    </div>
                    <div class="explanation">
                        <h4>✅ 正確答案：(${String.fromCharCode(65 + q.answer)}) ${q.options[q.answer]}</h4>
                        <p><strong>解析：</strong>${q.explanation}</p>
                        <p><strong>翻譯：</strong>${q.translation}</p>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        quizStartTime = Date.now();
    }

    function saveAttempt(score, total) {
        const durationSec = Math.round((Date.now() - quizStartTime) / 1000);
        const results = currentQuestions.map((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            const userAnswer = selected ? parseInt(selected.value, 10) : -1;
            return {
                category: q.category,
                correct: userAnswer === q.answer,
                keyword: q.options[q.answer]
            };
        });

        const key = 'geptProgress';
        const data = JSON.parse(localStorage.getItem(key) || '[]');
        data.push({
            timestamp: new Date().toISOString(),
            level: PAGE_LEVEL,
            score,
            total,
            durationSec,
            results
        });
        localStorage.setItem(key, JSON.stringify(data));
    }

    document.addEventListener('DOMContentLoaded', function () {
        generateQuestions();

        const submitBtn = document.getElementById('submitBtn');
        const resetBtn = document.getElementById('resetBtn');
        const scoreDisplay = document.getElementById('scoreDisplay');
        const scoreText = document.getElementById('scoreText');

        submitBtn.addEventListener('click', function () {
            const questionCards = document.querySelectorAll('.question-card');
            let score = 0;
            let answered = 0;

            questionCards.forEach((card, index) => {
                const selectedOption = document.querySelector(`input[name="q${index}"]:checked`);

                if (selectedOption) {
                    answered++;
                    const correctAnswer = parseInt(card.getAttribute('data-answer'), 10);
                    const userAnswer = parseInt(selectedOption.value, 10);
                    const options = card.querySelectorAll('.option');

                    options.forEach(option => {
                        const input = option.querySelector('input');
                        if (parseInt(input.value, 10) === correctAnswer) {
                            option.classList.add('correct');
                        }
                        if (input.checked && parseInt(input.value, 10) !== correctAnswer) {
                            option.classList.add('incorrect');
                        }
                        input.disabled = true;
                    });

                    if (userAnswer === correctAnswer) {
                        score++;
                    }

                    card.querySelector('.explanation').classList.add('show');
                }
            });

            if (answered < currentQuestions.length) {
                alert('請完成所有題目再提交答案！');
                document.querySelectorAll('input[type="radio"]').forEach(input => {
                    input.disabled = false;
                });
                document.querySelectorAll('.explanation').forEach(exp => {
                    exp.classList.remove('show');
                });
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });
                return;
            }

            const total = currentQuestions.length;
            saveAttempt(score, total);

            const percentage = Number((score / total * 100).toFixed(0));
            let message = '';
            if (percentage >= 90) {
                message = '太棒了！幾乎全對！💯';
            } else if (percentage >= 70) {
                message = '表現優秀！繼續加油！👏';
            } else if (percentage >= 50) {
                message = '還不錯！再接再厲！💪';
            } else {
                message = '需要再努力！多複習單字喔！📖';
            }

            scoreText.innerHTML = `您答對了 <strong>${score}</strong> 題，共 ${total} 題<br>得分：${percentage} 分<br>${message}`;
            scoreDisplay.classList.add('show');
            submitBtn.disabled = true;

            scoreDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });

        resetBtn.addEventListener('click', function () {
            location.reload();
        });
    });
})();
