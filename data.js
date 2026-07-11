// GEPT 全民英語能力分級檢定 題庫
// 包含初級、中級、中高級三個級別的練習題

const GEPT_DATA = {
  elementary: {
    name: '初級',
    nameEn: 'Elementary',
    color: '#4caf50',
    icon: '🌱',
    description: '適合國中畢業程度，能理解簡單的英語對話與短文',
    questions: [
      // 詞彙
      {
        id: 'e001',
        category: '詞彙',
        question: 'My sister likes to _____ books in her free time.',
        options: ['read', 'reads', 'reading', 'readed'],
        answer: 0,
        explanation: '主詞 "My sister" 是第三人稱單數，但 "likes to" 後面接原形動詞，所以用 "read"。'
      },
      {
        id: 'e002',
        category: '詞彙',
        question: 'The weather is very _____ today. Let\'s go to the beach!',
        options: ['cold', 'rainy', 'sunny', 'windy'],
        answer: 2,
        explanation: '去海灘通常是晴天（sunny），上下文暗示好天氣。'
      },
      {
        id: 'e003',
        category: '詞彙',
        question: 'I need to _____ my homework before I can watch TV.',
        options: ['finish', 'finished', 'finishing', 'finishes'],
        answer: 0,
        explanation: '"need to" 後面接原形動詞，所以用 "finish"。'
      },
      {
        id: 'e004',
        category: '詞彙',
        question: 'What is the _____ of this shirt? It looks nice on you.',
        options: ['color', 'price', 'size', 'name'],
        answer: 1,
        explanation: '詢問價格（price）是購物時常見的問句。'
      },
      {
        id: 'e005',
        category: '詞彙',
        question: 'She is very _____ and always helps others.',
        options: ['lazy', 'kind', 'angry', 'bored'],
        answer: 1,
        explanation: '"kind" 表示善良友好，符合 "always helps others" 的描述。'
      },
      // 文法
      {
        id: 'e006',
        category: '文法',
        question: 'There _____ two apples on the table.',
        options: ['is', 'are', 'was', 'were'],
        answer: 1,
        explanation: '"There are" 用於可數名詞複數（two apples）。'
      },
      {
        id: 'e007',
        category: '文法',
        question: 'Tom and I _____ best friends since we were five.',
        options: ['are', 'were', 'have been', 'had been'],
        answer: 2,
        explanation: '"since we were five" 表示從過去持續到現在，用現在完成式 "have been"。'
      },
      {
        id: 'e008',
        category: '文法',
        question: 'Please _____ quiet in the library.',
        options: ['be', 'is', 'are', 'were'],
        answer: 0,
        explanation: '祈使句（Please...）後面接原形動詞，"be quiet" 表示保持安靜。'
      },
      {
        id: 'e009',
        category: '文法',
        question: 'This is _____ umbrella. Mine is over there.',
        options: ['me', 'I', 'my', 'mine'],
        answer: 2,
        explanation: '"my" 是所有格形容詞，用於修飾名詞 "umbrella"。'
      },
      {
        id: 'e010',
        category: '文法',
        question: 'She _____ to school by bus every day.',
        options: ['go', 'goes', 'going', 'gone'],
        answer: 1,
        explanation: '主詞 "She" 是第三人稱單數，現在式動詞加 "-es"，所以用 "goes"。'
      },
      // 閱讀
      {
        id: 'e011',
        category: '閱讀',
        question: '[閱讀題] "Hi, my name is Lisa. I am ten years old. I have a dog named Max. Max is black and white. He loves to run in the park." — How old is Lisa?',
        options: ['Eight', 'Nine', 'Ten', 'Eleven'],
        answer: 2,
        explanation: '文章第二句說 "I am ten years old."'
      },
      {
        id: 'e012',
        category: '閱讀',
        question: '[閱讀題] (承上) What is the color of Max?',
        options: ['All black', 'All white', 'Brown and white', 'Black and white'],
        answer: 3,
        explanation: '文章說 "Max is black and white."'
      },
      {
        id: 'e013',
        category: '詞彙',
        question: 'The train will arrive _____ ten minutes.',
        options: ['in', 'on', 'at', 'for'],
        answer: 0,
        explanation: '"in + 時間段" 表示在某段時間之後，"arrive in ten minutes" 表示十分鐘後到達。'
      },
      {
        id: 'e014',
        category: '詞彙',
        question: 'I _____ never been to Japan before.',
        options: ['am', 'have', 'do', 'was'],
        answer: 1,
        explanation: '現在完成式結構：have/has + 過去分詞，"have never been" 表示從未去過。'
      },
      {
        id: 'e015',
        category: '文法',
        question: 'Which sentence is correct?',
        options: [
          'She don\'t like coffee.',
          'She doesn\'t likes coffee.',
          'She doesn\'t like coffee.',
          'She not like coffee.'
        ],
        answer: 2,
        explanation: '第三人稱單數否定句用 "doesn\'t + 原形動詞"，所以 "She doesn\'t like coffee." 正確。'
      },
      {
        id: 'e016',
        category: '詞彙',
        question: 'The store is _____ from 9 AM to 9 PM.',
        options: ['open', 'close', 'opening', 'closed'],
        answer: 0,
        explanation: '"open" 作形容詞表示「營業中、開著的」，是正確的表達方式。'
      },
      {
        id: 'e017',
        category: '文法',
        question: 'I enjoy _____ music before bed.',
        options: ['listen', 'listens', 'listened', 'listening'],
        answer: 3,
        explanation: '"enjoy" 後面接動名詞（V-ing），所以用 "listening"。'
      },
      {
        id: 'e018',
        category: '詞彙',
        question: 'Can you help me _____ this heavy box?',
        options: ['carry', 'carrying', 'carried', 'to carrying'],
        answer: 0,
        explanation: '"help + 人 + (to) 原形動詞"，所以用 "carry"。'
      },
      {
        id: 'e019',
        category: '文法',
        question: '_____ you like some more tea?',
        options: ['Do', 'Are', 'Would', 'Should'],
        answer: 2,
        explanation: '"Would you like...?" 是禮貌地詢問對方是否想要某物的句型。'
      },
      {
        id: 'e020',
        category: '詞彙',
        question: 'The movie was so _____ that I fell asleep.',
        options: ['excited', 'exciting', 'boring', 'bored'],
        answer: 2,
        explanation: '"boring" 形容事物本身令人厭倦，電影讓人睡著說明電影很無聊（boring）。'
      }
    ]
  },

  intermediate: {
    name: '中級',
    nameEn: 'Intermediate',
    color: '#2196f3',
    icon: '📘',
    description: '適合高中畢業程度，能閱讀一般英語文章並進行日常溝通',
    questions: [
      // 詞彙
      {
        id: 'i001',
        category: '詞彙',
        question: 'The scientist\'s _____ discovery changed our understanding of the universe.',
        options: ['groundbreaking', 'underground', 'outstanding', 'demanding'],
        answer: 0,
        explanation: '"groundbreaking" 意為「突破性的、開創性的」，最適合描述改變世界觀的發現。'
      },
      {
        id: 'i002',
        category: '詞彙',
        question: 'The government decided to _____ new regulations on air pollution.',
        options: ['impose', 'propose', 'oppose', 'dispose'],
        answer: 0,
        explanation: '"impose regulations" 意為「實施/頒布規定」，是固定搭配。'
      },
      {
        id: 'i003',
        category: '詞彙',
        question: 'Her speech was so _____ that everyone in the audience was moved to tears.',
        options: ['influential', 'eloquent', 'relevant', 'subsequent'],
        answer: 1,
        explanation: '"eloquent" 意為「雄辯的、有說服力的」，符合感動聽眾的演說。'
      },
      {
        id: 'i004',
        category: '文法',
        question: 'By the time she arrived, the party _____.',
        options: ['already ended', 'has already ended', 'had already ended', 'was already ending'],
        answer: 2,
        explanation: '"By the time + 過去式" 引導的子句，主要子句用過去完成式 "had already ended"。'
      },
      {
        id: 'i005',
        category: '文法',
        question: 'Not only _____ late, but he also forgot to bring his report.',
        options: ['he was', 'was he', 'he did', 'did he'],
        answer: 1,
        explanation: '"Not only" 置於句首時，後面的主要子句需要倒裝，所以用 "was he"。'
      },
      {
        id: 'i006',
        category: '文法',
        question: 'I wish I _____ more time to finish the project.',
        options: ['have', 'had', 'will have', 'would have'],
        answer: 1,
        explanation: '"I wish + 過去式" 表示與現在事實相反的假設，所以用 "had"。'
      },
      {
        id: 'i007',
        category: '詞彙',
        question: 'The company\'s profits have _____ significantly over the past year.',
        options: ['declined', 'inclined', 'reclined', 'exclaimed'],
        answer: 0,
        explanation: '"declined" 意為「下降、減少」，符合利潤減少的語境。'
      },
      {
        id: 'i008',
        category: '文法',
        question: 'The report _____ by the committee before the board meeting.',
        options: ['reviewed', 'was reviewed', 'has reviewed', 'reviewing'],
        answer: 1,
        explanation: '被動語態：be + 過去分詞，"was reviewed" 表示報告被委員會審查。'
      },
      {
        id: 'i009',
        category: '詞彙',
        question: 'The new policy is intended to _____ economic growth in rural areas.',
        options: ['stimulate', 'accumulate', 'manipulate', 'speculate'],
        answer: 0,
        explanation: '"stimulate" 意為「刺激、促進」，"stimulate economic growth" 是常見的搭配。'
      },
      {
        id: 'i010',
        category: '閱讀',
        question: '[閱讀題] "Remote work has become increasingly popular in recent years. While it offers flexibility and eliminates commuting time, it also presents challenges such as isolation and difficulty separating work from personal life." — What is one advantage of remote work mentioned?',
        options: ['Higher salary', 'Better teamwork', 'Flexibility', 'More vacation days'],
        answer: 2,
        explanation: '文章提到遠端工作提供 "flexibility"（彈性），這是優點之一。'
      },
      {
        id: 'i011',
        category: '閱讀',
        question: '[閱讀題] (承上) Which of the following is listed as a challenge of remote work?',
        options: ['Traffic jams', 'Isolation', 'Overworking', 'Technical problems'],
        answer: 1,
        explanation: '文章提到遠端工作的挑戰包括 "isolation"（孤立感）。'
      },
      {
        id: 'i012',
        category: '文法',
        question: 'Had she studied harder, she _____ the exam.',
        options: ['would pass', 'would have passed', 'will have passed', 'would be passing'],
        answer: 1,
        explanation: '過去假設語氣（與過去事實相反）：Had + 主詞 + 過去分詞，主要子句用 "would have + 過去分詞"。'
      },
      {
        id: 'i013',
        category: '詞彙',
        question: 'The doctor advised the patient to _____ from strenuous exercise for two weeks.',
        options: ['refrain', 'retain', 'restrain', 'obtain'],
        answer: 0,
        explanation: '"refrain from" 意為「克制、避免做某事」，是固定搭配。'
      },
      {
        id: 'i014',
        category: '詞彙',
        question: 'The charity event was a great success, _____ over $50,000 for the local hospital.',
        options: ['raising', 'arising', 'praising', 'grazing'],
        answer: 0,
        explanation: '"raising money" 意為「籌募資金」，是慈善活動中常用的表達。'
      },
      {
        id: 'i015',
        category: '文法',
        question: 'The manager suggested that each employee _____ a personal development plan.',
        options: ['submits', 'submitted', 'submit', 'will submit'],
        answer: 2,
        explanation: '"suggest that" 後面的子句中用虛擬語氣（原形動詞），所以用 "submit"。'
      },
      {
        id: 'i016',
        category: '詞彙',
        question: 'The new museum exhibit is _____ to attract visitors from around the world.',
        options: ['expected', 'respected', 'suspected', 'rejected'],
        answer: 0,
        explanation: '"expected to" 意為「預計、預期」，符合吸引全球遊客的語境。'
      },
      {
        id: 'i017',
        category: '文法',
        question: 'Despite _____ tired, she continued working until midnight.',
        options: ['be', 'being', 'was', 'been'],
        answer: 1,
        explanation: '"Despite" 後面接名詞或動名詞（V-ing），所以用 "being"。'
      },
      {
        id: 'i018',
        category: '詞彙',
        question: 'His _____ to detail makes him an excellent editor.',
        options: ['attention', 'intention', 'mention', 'tension'],
        answer: 0,
        explanation: '"attention to detail" 意為「對細節的關注」，是描述優秀編輯素質的常見表達。'
      },
      {
        id: 'i019',
        category: '文法',
        question: 'It is essential that all participants _____ the registration form before the deadline.',
        options: ['complete', 'completes', 'completed', 'completing'],
        answer: 0,
        explanation: '"It is essential that" 後接虛擬語氣（原形動詞），所以用 "complete"。'
      },
      {
        id: 'i020',
        category: '詞彙',
        question: 'The two countries reached a _____ agreement after months of negotiations.',
        options: ['mutual', 'brutal', 'feudal', 'neutral'],
        answer: 0,
        explanation: '"mutual agreement" 意為「共同協議、雙方同意」，是外交談判中的常用詞。'
      }
    ]
  },

  highIntermediate: {
    name: '中高級',
    nameEn: 'High-Intermediate',
    color: '#9c27b0',
    icon: '🎓',
    description: '適合大學畢業程度，能閱讀複雜文章並進行流利的英語溝通',
    questions: [
      // 詞彙
      {
        id: 'h001',
        category: '詞彙',
        question: 'The philosopher\'s argument was _____, drawing on diverse fields from quantum physics to ancient mythology.',
        options: ['eclectic', 'electric', 'eccentric', 'endemic'],
        answer: 0,
        explanation: '"eclectic" 意為「博採眾長的、折衷的」，形容從多個不同領域汲取內容的論點。'
      },
      {
        id: 'h002',
        category: '詞彙',
        question: 'The CEO\'s _____ response to the crisis reassured investors and stabilized the market.',
        options: ['pragmatic', 'dogmatic', 'systematic', 'problematic'],
        answer: 0,
        explanation: '"pragmatic" 意為「務實的、實用的」，在危機應對中的務實反應能夠穩定市場。'
      },
      {
        id: 'h003',
        category: '詞彙',
        question: 'His seemingly _____ remarks were actually carefully crafted to influence the audience.',
        options: ['off-the-cuff', 'cut-and-dried', 'far-fetched', 'hands-on'],
        answer: 0,
        explanation: '"off-the-cuff" 意為「即席的、即興的」，但實際上是精心設計的。'
      },
      {
        id: 'h004',
        category: '文法',
        question: 'The research findings, _____ in three leading journals, have fundamentally altered the field.',
        options: [
          'publishing',
          'having published',
          'published',
          'being published'
        ],
        answer: 2,
        explanation: '過去分詞片語作後置修飾，"published in three leading journals" 修飾 "The research findings"。'
      },
      {
        id: 'h005',
        category: '詞彙',
        question: 'The treaty was designed to _____ the spread of nuclear weapons among non-nuclear states.',
        options: ['proliferate', 'ameliorate', 'corroborate', 'curtail'],
        answer: 3,
        explanation: '"curtail" 意為「削減、限制」，與 "spread"（擴散）搭配，表示限制核武器擴散。'
      },
      {
        id: 'h006',
        category: '閱讀',
        question: '[閱讀題] "The concept of \'nudge theory,\' popularized by Thaler and Sunstein, suggests that by subtly altering the environment in which choices are made—without restricting options or significantly changing economic incentives—policymakers can steer people toward better decisions. Critics, however, argue that nudging is inherently paternalistic and undermines individual autonomy." — Which best describes the critics\' view?',
        options: [
          'Nudge theory is too expensive to implement.',
          'Nudge theory limits economic freedom.',
          'Nudge theory infringes on personal decision-making.',
          'Nudge theory is scientifically unproven.'
        ],
        answer: 2,
        explanation: '批評者認為 nudging 具有 "paternalistic"（家長式的）性質並 "undermines individual autonomy"（損害個人自主性），即侵犯個人決策權。'
      },
      {
        id: 'h007',
        category: '閱讀',
        question: '[閱讀題] (承上) What is the key mechanism of nudge theory?',
        options: [
          'Imposing legal penalties for poor choices',
          'Providing financial incentives for good behavior',
          'Changing the choice environment subtly',
          'Educating people about the consequences of their choices'
        ],
        answer: 2,
        explanation: '文章說 nudge 是透過 "subtly altering the environment in which choices are made"（微妙地改變選擇的環境）來引導決策。'
      },
      {
        id: 'h008',
        category: '文法',
        question: 'Rarely _____ such a comprehensive analysis of contemporary economic trends.',
        options: [
          'we have seen',
          'have we seen',
          'we had seen',
          'had we seen'
        ],
        answer: 1,
        explanation: '"Rarely" 置於句首時需倒裝，使用 "have we seen"（現在完成式倒裝）。'
      },
      {
        id: 'h009',
        category: '詞彙',
        question: 'The author\'s use of _____ imagery throughout the novel creates a dreamlike quality that blurs reality and fiction.',
        options: ['surreal', 'surpass', 'surmise', 'surname'],
        answer: 0,
        explanation: '"surreal" 意為「超現實的」，用於描述模糊現實與虛幻界線的夢幻品質。'
      },
      {
        id: 'h010',
        category: '文法',
        question: 'The extent to _____ the new policy will affect small businesses remains unclear.',
        options: ['that', 'which', 'what', 'where'],
        answer: 1,
        explanation: '"the extent to which" 是固定搭配，意為「……的程度」，用於正式書面語。'
      },
      {
        id: 'h011',
        category: '詞彙',
        question: 'The government\'s _____ approach to urban planning has resulted in widespread displacement of low-income residents.',
        options: ['myopic', 'microscopic', 'philanthropic', 'misanthropic'],
        answer: 0,
        explanation: '"myopic" 意為「目光短淺的、短視的」，批評政府缺乏長遠的城市規劃視野。'
      },
      {
        id: 'h012',
        category: '文法',
        question: '_____ that climate change poses an existential threat, world leaders convened an emergency summit.',
        options: [
          'Realizing',
          'Having realized',
          'To realize',
          'Realized'
        ],
        answer: 1,
        explanation: '"Having realized" 表示在主要動詞（convened）之前已完成的動作，使用完成式分詞構句。'
      },
      {
        id: 'h013',
        category: '詞彙',
        question: 'The documentary sought to _____ the myth that success is solely the result of individual merit.',
        options: ['perpetuate', 'debunk', 'invoke', 'exacerbate'],
        answer: 1,
        explanation: '"debunk" 意為「揭穿、破除（神話/謊言）」，與 "myth"（神話）搭配，表示破除錯誤觀念。'
      },
      {
        id: 'h014',
        category: '詞彙',
        question: 'The artist\'s latest installation is a _____ on consumerism, using discarded products to create something beautiful.',
        options: ['commentary', 'compliment', 'compromise', 'compensation'],
        answer: 0,
        explanation: '"commentary on" 意為「對……的評論/批評」，藝術作品常被視為對社會現象的評論。'
      },
      {
        id: 'h015',
        category: '文法',
        question: 'The degree to _____ digital technology has transformed social interactions is a subject of ongoing debate.',
        options: ['which', 'that', 'what', 'whom'],
        answer: 0,
        explanation: '"the degree to which" 是正式英語中描述程度的固定搭配，"which" 指代前面的 "degree"。'
      },
      {
        id: 'h016',
        category: '詞彙',
        question: 'Her memoir is a _____ account of growing up in a society torn apart by political violence.',
        options: ['harrowing', 'narrowing', 'borrowing', 'wallowing'],
        answer: 0,
        explanation: '"harrowing" 意為「令人痛苦的、使人心碎的」，描述成長於政治暴力社會的痛苦回憶。'
      },
      {
        id: 'h017',
        category: '文法',
        question: 'The new evidence _____ by the defense team proved conclusively that the defendant was innocent.',
        options: [
          'presenting',
          'presented',
          'was presented',
          'having presented'
        ],
        answer: 1,
        explanation: '過去分詞片語 "presented by the defense team" 作後置修飾語，修飾 "The new evidence"。'
      },
      {
        id: 'h018',
        category: '詞彙',
        question: 'The politician\'s attempt to _____ the issue with vague promises only fueled public frustration.',
        options: ['circumvent', 'circumnavigate', 'circumscribe', 'obfuscate'],
        answer: 3,
        explanation: '"obfuscate" 意為「混淆、使模糊」，用含糊的承諾來迴避問題，讓議題更不清晰。'
      },
      {
        id: 'h019',
        category: '閱讀',
        question: '[閱讀題] "Epigenetics—the study of how gene expression is influenced by factors other than changes in DNA sequence—has revolutionized our understanding of inheritance. Environmental factors such as diet, stress, and toxin exposure can alter gene expression patterns, and these changes can sometimes be passed down to subsequent generations, challenging the traditional Mendelian view of heredity." — What does this passage challenge?',
        options: [
          'The existence of DNA',
          'The role of diet in health',
          'Classical theories of genetic inheritance',
          'The importance of environmental protection'
        ],
        answer: 2,
        explanation: '文章說表觀遺傳學 "challenging the traditional Mendelian view of heredity"，即挑戰傳統孟德爾遺傳學觀點（古典遺傳理論）。'
      },
      {
        id: 'h020',
        category: '詞彙',
        question: 'The scholar\'s _____ prose, dense with allusions to classical literature, demanded considerable intellectual engagement from readers.',
        options: ['erudite', 'elusive', 'abstruse', 'obtuse'],
        answer: 0,
        explanation: '"erudite" 意為「博學的、學識淵博的」，充滿古典文學典故的文章體現了作者的博學。'
      }
    ]
  }
};

// 取得指定級別的所有題目
function getQuestions(level) {
  return GEPT_DATA[level] ? GEPT_DATA[level].questions : [];
}

// 隨機取出 n 題
function getRandomQuestions(level, n) {
  const questions = getQuestions(level);
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, questions.length));
}

// 取得級別資訊
function getLevelInfo(level) {
  const info = GEPT_DATA[level];
  if (!info) return null;
  return {
    name: info.name,
    nameEn: info.nameEn,
    color: info.color,
    icon: info.icon,
    description: info.description,
    totalQuestions: info.questions.length
  };
}
