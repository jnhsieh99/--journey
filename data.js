// GEPT 練習題庫（共用資料來源）
// 三個級別頁面（elementary.html / index.html / high-intermediate.html）
// 都從這份檔案讀取題目，避免各頁面各自維護一份題庫造成資料不同步。
//
// 單字取材依據官方 GEPT 分級（www.gept.org.tw）與 LTTC 公告之
// 初級 2,263 字 / 中級 5,617 字 / 中高級 7,993 字範圍中具代表性的常考詞彙，
// 並非字表全文逐字收錄（字表數量龐大，無法逐一手動出題）。

const LEVEL_LABELS = {
    elementary: { name: '初級', cefr: 'A2' },
    intermediate: { name: '中級', cefr: 'B1' },
    high: { name: '中高級', cefr: 'B2' }
};

const CATEGORY_LABELS = {
    vocabulary: '詞彙辨析',
    grammar: '文法結構',
    tense: '時態運用'
};

const GEPT_QUESTIONS = [
    // ========== 初級 Elementary (CEFR A2) ==========
    // -- 時態運用 --
    {
        level: 'elementary', category: 'tense',
        question: 'I ___ to school by bus every day.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 0,
        explanation: '主詞 "I" 搭配一般現在式動詞原形 "go"。every day 表示習慣性動作，使用現在簡單式。',
        translation: '我每天搭公車去學校。'
    },
    {
        level: 'elementary', category: 'tense',
        question: 'She ___ her homework yesterday.',
        options: ['finish', 'finished', 'finishes', 'finishing'],
        answer: 1,
        explanation: 'yesterday 表示過去的時間，需使用過去式 "finished"。',
        translation: '她昨天完成了她的作業。'
    },
    {
        level: 'elementary', category: 'tense',
        question: 'We ___ a movie last night.',
        options: ['watch', 'watched', 'watching', 'watches'],
        answer: 1,
        explanation: 'last night 表示過去時間，使用過去式 "watched"。',
        translation: '我們昨晚看了一部電影。'
    },
    {
        level: 'elementary', category: 'tense',
        question: 'My father ___ in this company for ten years.',
        options: ['works', 'worked', 'has worked', 'working'],
        answer: 2,
        explanation: '"for + 一段時間" 搭配現在完成式，表示動作從過去持續到現在。has worked 是正確用法。',
        translation: '我爸爸在這家公司已經工作十年了。'
    },
    {
        level: 'elementary', category: 'tense',
        question: 'She ___ this movie three times. She really loves it.',
        options: ['see', 'sees', 'has seen', 'saw'],
        answer: 2,
        explanation: '表示到目前為止累積的經驗次數，且沒有明確過去時間點，使用現在完成式 "has seen"。',
        translation: '她已經看過這部電影三次了，她真的很喜歡。'
    },
    // -- 文法結構 --
    {
        level: 'elementary', category: 'grammar',
        question: 'There ___ many students in the classroom.',
        options: ['is', 'are', 'was', 'be'],
        answer: 1,
        explanation: '"many students" 是複數，使用 "are"。There are 表示「有」（複數）。',
        translation: '教室裡有很多學生。'
    },
    {
        level: 'elementary', category: 'grammar',
        question: 'My brother is ___ than me.',
        options: ['tall', 'taller', 'tallest', 'more tall'],
        answer: 1,
        explanation: '比較級用法，tall 的比較級是 taller。than 是比較級的標誌。',
        translation: '我哥哥比我高。'
    },
    {
        level: 'elementary', category: 'grammar',
        question: 'She ___ English very well.',
        options: ['speak', 'speaks', 'speaking', 'spoke'],
        answer: 1,
        explanation: '主詞 "She" 是第三人稱單數，現在簡單式動詞要加 s。',
        translation: '她英文說得很好。'
    },
    {
        level: 'elementary', category: 'grammar',
        question: '___ you like some coffee?',
        options: ['Do', 'Does', 'Would', 'Are'],
        answer: 2,
        explanation: '"Would you like...?" 是禮貌地提供東西的固定句型，等於中文的「你想要...嗎？」。',
        translation: '你想要來點咖啡嗎？'
    },
    {
        level: 'elementary', category: 'grammar',
        question: "There isn't ___ milk left in the fridge.",
        options: ['many', 'much', 'a few', 'several'],
        answer: 1,
        explanation: 'milk 是不可數名詞，否定句中修飾不可數名詞要用 "much"，而不是用於可數名詞的 many/a few/several。',
        translation: '冰箱裡沒有剩多少牛奶了。'
    },
    // -- 詞彙辨析 --
    {
        level: 'elementary', category: 'vocabulary',
        question: 'Can you ___ me your pencil, please?',
        options: ['lend', 'borrow', 'lending', 'borrows'],
        answer: 0,
        explanation: 'lend (借出) 是從「我」借給「你」；borrow (借入) 是「你」向「我」借。Can you 後接動詞原形。',
        translation: '你可以借我你的鉛筆嗎？'
    },
    {
        level: 'elementary', category: 'vocabulary',
        question: 'The soup is too hot. Please let it ___ before you eat it.',
        options: ['cool down', 'warm up', 'heat up', 'boil'],
        answer: 0,
        explanation: '"cool down" 表示「降溫、冷卻」，符合湯太燙需要放涼的情境。',
        translation: '湯太燙了，吃之前請先讓它涼一下。'
    },
    {
        level: 'elementary', category: 'vocabulary',
        question: 'My grandmother is very ___ ; she always shares her food with others.',
        options: ['kind', 'kindly', 'kindness', 'unkind'],
        answer: 0,
        explanation: 'be 動詞後需要形容詞。kind (親切的、善良的) 符合句意，且與後半句「總是分享食物」呼應。',
        translation: '我奶奶人很好，她總是把食物分享給別人。'
    },
    {
        level: 'elementary', category: 'vocabulary',
        question: 'I feel ___ today, so I want to stay in bed.',
        options: ['tired', 'tire', 'tiring', 'tiredness'],
        answer: 0,
        explanation: '"feel + 形容詞" 表達感受。tired (感到疲累的) 是形容詞，符合句意。',
        translation: '我今天覺得很累，所以想待在床上。'
    },
    {
        level: 'elementary', category: 'vocabulary',
        question: "Could you ___ the door? It's cold in here.",
        options: ['close', 'closed', 'closing', 'closes'],
        answer: 0,
        explanation: '"Could you + 動詞原形" 是禮貌請求的句型，close (關) 用原形動詞。',
        translation: '你可以關門嗎？這裡好冷。'
    },

    // ========== 中級 Intermediate (CEFR B1) ==========
    // -- 詞彙辨析 --
    {
        level: 'intermediate', category: 'vocabulary',
        question: 'The manager was very ___ when she praised the whole team for their hard work.',
        options: ['generous', 'generosity', 'generously', 'generate'],
        answer: 0,
        explanation: '空格前有 be 動詞 "was" 和副詞 "very"，後面需要形容詞來描述主詞的狀態。generous (慷慨的、大方的) 是形容詞，符合句意。',
        translation: '經理在讚揚整個團隊的辛勤工作時非常大方。'
    },
    {
        level: 'intermediate', category: 'vocabulary',
        question: 'Because of the heavy traffic, we had to ___ our trip to the airport.',
        options: ['postpone', 'prevent', 'promote', 'pretend'],
        answer: 0,
        explanation: 'postpone (延後、推遲) 符合句意，因為交通堵塞而需要延遲行程。prevent (阻止)、promote (促進)、pretend (假裝) 皆不符合語意。',
        translation: '因為交通繁忙，我們不得不推遲前往機場的行程。'
    },
    {
        level: 'intermediate', category: 'vocabulary',
        question: 'The new employee seems very ___; she always finishes her tasks before the deadline.',
        options: ['reliable', 'reliably', 'reliance', 'rely'],
        answer: 0,
        explanation: '"seem + 形容詞" 是固定用法，用來描述主詞的特質。reliable (可靠的) 是形容詞，符合句意。',
        translation: '這位新員工看起來非常可靠；她總是在截止日期前完成任務。'
    },
    {
        level: 'intermediate', category: 'vocabulary',
        question: 'Despite the bad weather, the outdoor concert was ___ a success.',
        options: ['considerable', 'considerably', 'considerate', 'consider'],
        answer: 0,
        explanation: '空格後有名詞 "success"，前面需要形容詞來修飾。considerable (相當大的) 符合句意，表示音樂會相當成功。',
        translation: '儘管天氣不好，這場戶外音樂會仍然相當成功。'
    },
    {
        level: 'intermediate', category: 'vocabulary',
        question: 'The museum offers a ___ of activities for children during the summer.',
        options: ['variety', 'various', 'vary', 'varied'],
        answer: 0,
        explanation: '"a variety of" 是固定片語，表示「各種各樣的」。variety 是名詞。',
        translation: '博物館在夏季為兒童提供各種各樣的活動。'
    },
    // -- 文法結構 --
    {
        level: 'intermediate', category: 'grammar',
        question: 'Her doctor ___ that she get more exercise and eat healthier food.',
        options: ['suggested', 'suggestion', 'suggestive', 'suggestible'],
        answer: 0,
        explanation: '空格需要動詞來完成句子。suggested (建議) 是動詞過去式，且 "suggest that + 主詞 + 原形動詞" 是正確的句型結構。',
        translation: '她的醫生建議她多運動並吃得更健康。'
    },
    {
        level: 'intermediate', category: 'grammar',
        question: 'The company decided to ___ its business to Asia next year.',
        options: ['expand', 'expansion', 'expansive', 'expanding'],
        answer: 0,
        explanation: '"decide to + 動詞原形" 是固定句型。expand (擴展) 是動詞原形，符合句意。',
        translation: '公司決定明年將業務擴展到亞洲。'
    },
    {
        level: 'intermediate', category: 'grammar',
        question: 'The presentation was so ___ that many people fell asleep.',
        options: ['boring', 'bored', 'bore', 'boredom'],
        answer: 0,
        explanation: '形容事物令人感到如何用 -ing 形容詞。boring (令人無聊的) 用來形容 presentation。bored 是形容人感到無聊。',
        translation: '這個簡報太無聊了，以至於很多人都睡著了。'
    },
    {
        level: 'intermediate', category: 'grammar',
        question: 'If I ___ more time, I would travel around the world.',
        options: ['had', 'have', 'has', 'having'],
        answer: 0,
        explanation: '這是與現在事實相反的假設語氣（第二條件句）：If + 主詞 + 過去式..., 主詞 + would + 原形動詞。had 是 have 的過去式。',
        translation: '如果我有更多時間，我就會環遊世界。'
    },
    {
        level: 'intermediate', category: 'grammar',
        question: 'The book, ___ was written by a famous author, became a bestseller.',
        options: ['which', 'who', 'whose', 'where'],
        answer: 0,
        explanation: '先行詞 "The book" 是事物，關係代名詞在句中作主詞，須用 which（或 that）。who 用於指人，whose 表所有格，where 表地點。',
        translation: '這本書由一位知名作家所寫，成為了暢銷書。'
    },
    // -- 時態運用 --
    {
        level: 'intermediate', category: 'tense',
        question: 'She ___ in Taipei since 2015.',
        options: ['has lived', 'lives', 'lived', 'is living'],
        answer: 0,
        explanation: '"since + 特定時間點" 搭配現在完成式，表示動作從過去持續到現在。',
        translation: '她從2015年起就住在台北。'
    },
    {
        level: 'intermediate', category: 'tense',
        question: 'By the time you arrive, I ___ dinner.',
        options: ['will have finished', 'will finish', 'finish', 'finished'],
        answer: 0,
        explanation: '未來完成式 "will have + p.p." 表示在未來某個時間點之前已經完成的動作。',
        translation: '等你到的時候，我應該已經煮好晚餐了。'
    },
    {
        level: 'intermediate', category: 'tense',
        question: 'While I ___ my homework, my phone rang.',
        options: ['was doing', 'did', 'do', 'have done'],
        answer: 0,
        explanation: '過去進行式 "was/were + Ving" 表示過去某時間正在進行的動作，被另一個過去的動作（rang）打斷。',
        translation: '我在寫作業的時候，我的手機響了。'
    },
    {
        level: 'intermediate', category: 'tense',
        question: 'I ___ this restaurant twice before it closed down.',
        options: ['had visited', 'visited', 'have visited', 'visit'],
        answer: 0,
        explanation: '過去完成式 "had + p.p." 表示在過去某個動作（closed down）之前就已經發生的事。',
        translation: '在這家餐廳倒閉之前，我已經去過兩次了。'
    },
    {
        level: 'intermediate', category: 'tense',
        question: 'She ___ for the exam all week.',
        options: ['has been studying', 'studies', 'studied', 'had studied'],
        answer: 0,
        explanation: '現在完成進行式 "has/have been + Ving" 強調動作從過去持續到現在，且動作可能仍在進行或剛結束。',
        translation: '她整個星期都在為考試唸書。'
    },

    // ========== 中高級 High-Intermediate (CEFR B2) ==========
    // -- 詞彙辨析 --
    {
        level: 'high', category: 'vocabulary',
        question: 'The government has implemented several ___ to reduce air pollution in the city.',
        options: ['initiatives', 'initiates', 'initial', 'initially'],
        answer: 0,
        explanation: 'several 後面需要複數名詞。initiatives (倡議、措施) 是名詞複數形式，符合句意。',
        translation: '政府已經實施了幾項措施來減少城市的空氣污染。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The professor\'s lecture was so ___ that it inspired many students to pursue careers in science.',
        options: ['compelling', 'compelled', 'compel', 'compulsion'],
        answer: 0,
        explanation: 'so...that 句型中需要形容詞。compelling (引人入勝的、令人信服的) 用來形容 lecture。',
        translation: '教授的演講如此引人入勝，激勵了許多學生追求科學事業。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The company\'s ___ approach to innovation has led to remarkable success.',
        options: ['innovative', 'innovate', 'innovation', 'innovatively'],
        answer: 0,
        explanation: '名詞 "approach" 前面需要形容詞修飾。innovative (創新的) 是形容詞。',
        translation: '公司創新的方法帶來了顯著的成功。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'Climate change poses a ___ threat to biodiversity worldwide.',
        options: ['significant', 'significantly', 'significance', 'signify'],
        answer: 0,
        explanation: '名詞 "threat" 前需要形容詞修飾。significant (重大的、顯著的) 是形容詞。',
        translation: '氣候變化對全球生物多樣性構成重大威脅。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The scientist\'s groundbreaking research has ___ changed our understanding of the universe.',
        options: ['fundamentally', 'fundamental', 'fundament', 'fundamentals'],
        answer: 0,
        explanation: '動詞 "changed" 需要副詞修飾。fundamentally (根本上、從根本上) 是副詞。',
        translation: '科學家開創性的研究從根本上改變了我們對宇宙的理解。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The organization is committed to promoting ___ among different cultural groups.',
        options: ['diversity', 'diverse', 'diversify', 'diversified'],
        answer: 0,
        explanation: '動詞 "promoting" 後需要名詞作受詞。diversity (多樣性) 是名詞。',
        translation: '該組織致力於促進不同文化群體之間的多樣性。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The economic crisis had a ___ impact on small businesses across the country.',
        options: ['devastating', 'devastate', 'devastation', 'devastated'],
        answer: 0,
        explanation: '名詞 "impact" 前需要形容詞修飾。devastating (毀滅性的、災難性的) 是形容詞，-ing 形式表示主動「造成毀滅的」。',
        translation: '經濟危機對全國各地的小企業產生了毀滅性的影響。'
    },
    {
        level: 'high', category: 'vocabulary',
        question: 'The documentary provided valuable ___ into the lives of endangered species.',
        options: ['insights', 'insight', 'insightful', 'insightfully'],
        answer: 0,
        explanation: '形容詞 "valuable" 後需要名詞。insights (見解、洞察) 用複數表示多方面的理解。',
        translation: '這部紀錄片提供了對瀕危物種生活的寶貴見解。'
    },
    // -- 文法結構 --
    {
        level: 'high', category: 'grammar',
        question: 'The research findings ___ that regular exercise can significantly improve mental health.',
        options: ['indicate', 'indication', 'indicative', 'indicated'],
        answer: 0,
        explanation: '主詞 "findings" 是複數，需要動詞原形。indicate (顯示、表明) 符合句意和文法。這裡使用現在簡單式表達研究的結論。',
        translation: '研究結果顯示，定期運動可以顯著改善心理健康。'
    },
    {
        level: 'high', category: 'grammar',
        question: 'The committee will ___ all proposals before making a final decision.',
        options: ['evaluate', 'evaluation', 'evaluative', 'evaluator'],
        answer: 0,
        explanation: 'will 後面需要動詞原形。evaluate (評估) 符合句意。',
        translation: '委員會將在做出最終決定之前評估所有提案。'
    },
    {
        level: 'high', category: 'grammar',
        question: 'The new policy aims to ___ economic growth while protecting the environment.',
        options: ['sustain', 'sustainable', 'sustainability', 'sustained'],
        answer: 0,
        explanation: '"aim to + 動詞原形" 是固定用法。sustain (維持、支撐) 是動詞原形。',
        translation: '新政策旨在維持經濟增長的同時保護環境。'
    },
    {
        level: 'high', category: 'grammar',
        question: 'Not until the results were announced ___ how serious the problem was.',
        options: ['did they realize', 'they realized', 'they did realize', 'had they realized'],
        answer: 0,
        explanation: '否定副詞片語 "Not until..." 放句首時，主要子句需要部分倒裝：助動詞 + 主詞 + 原形動詞。did they realize 符合倒裝規則。',
        translation: '直到結果公布，他們才意識到問題有多嚴重。'
    },
    {
        level: 'high', category: 'grammar',
        question: 'Having ___ the report twice, she was confident it was error-free.',
        options: ['reviewed', 'review', 'reviewing', 'reviews'],
        answer: 0,
        explanation: '"Having + p.p." 是完成式分詞構句，表示先於主要子句動作發生的事，這裡指「先前已經審閱過兩次」。',
        translation: '她已經把報告審閱了兩次，因此她對報告沒有錯誤很有信心。'
    },
    // -- 時態運用 --
    {
        level: 'high', category: 'tense',
        question: 'The bridge ___ for renovation since last March.',
        options: ['has been closed', 'closes', 'closed', 'had closed'],
        answer: 0,
        explanation: '現在完成式被動語態 "has/have been + p.p." 表示從過去某時間持續到現在的被動狀態，搭配 since 使用。',
        translation: '這座橋自去年三月起就因整修而封閉。'
    },
    {
        level: 'high', category: 'tense',
        question: 'By next year, the researchers ___ the project for a decade.',
        options: ['will have conducted', 'will conduct', 'have conducted', 'conducted'],
        answer: 0,
        explanation: '未來完成式 "will have + p.p." 表示到未來某個時間點為止，已經持續進行的動作。',
        translation: '到明年為止，研究人員將已經進行這項計畫十年了。'
    },
    {
        level: 'high', category: 'tense',
        question: 'If the company had invested earlier, it ___ such heavy losses.',
        options: ['would not have suffered', 'would not suffer', 'will not suffer', 'does not suffer'],
        answer: 0,
        explanation: '與過去事實相反的假設語氣（第三條件句）：If + 過去完成式..., 主詞 + would have + p.p.，表示過去未發生的假設結果。',
        translation: '如果這家公司早點投資，就不會蒙受如此嚴重的損失了。'
    }
];
