// 英语词汇库
export const vocabWords = [
  {
    id: 1,
    word: "beautiful",
    phonetic: "/ˈbjuːtɪfəl/",
    meaning: "美丽的",
    example: "The sunset is very beautiful.",
    exampleTranslation: "日落非常美丽。",
    level: "beginner",
    category: "adjective"
  },
  {
    id: 2,
    word: "confidence",
    phonetic: "/ˈkɒnfɪdəns/",
    meaning: "信心",
    example: "Building confidence takes time.",
    exampleTranslation: "建立信心需要时间。",
    level: "intermediate",
    category: "noun"
  },
  {
    id: 3,
    word: "determine",
    phonetic: "/dɪˈtɜːmɪn/",
    meaning: "决定",
    example: "We need to determine the best approach.",
    exampleTranslation: "我们需要确定最佳方法。",
    level: "intermediate",
    category: "verb"
  },
  {
    id: 4,
    word: "eager",
    phonetic: "/ˈiːɡər/",
    meaning: "渴望的",
    example: "She is eager to learn.",
    exampleTranslation: "她渴望学习。",
    level: "beginner",
    category: "adjective"
  },
  {
    id: 5,
    word: "fantastic",
    phonetic: "/fænˈtæstɪk/",
    meaning: "极好的",
    example: "That's a fantastic idea!",
    exampleTranslation: "这是个极好的主意！",
    level: "beginner",
    category: "adjective"
  },
  {
    id: 6,
    word: "grateful",
    phonetic: "/ˈɡreɪtfəl/",
    meaning: "感激的",
    example: "I'm grateful for your help.",
    exampleTranslation: "我感谢你的帮助。",
    level: "intermediate",
    category: "adjective"
  },
  {
    id: 7,
    word: "hypothesis",
    phonetic: "/haɪˈpɒθəsɪs/",
    meaning: "假设",
    example: "We need to test the hypothesis.",
    exampleTranslation: "我们需要验证这个假设。",
    level: "advanced",
    category: "noun"
  },
  {
    id: 8,
    word: "innovate",
    phonetic: "/ˈɪnəveɪt/",
    meaning: "创新",
    example: "Companies must innovate to stay competitive.",
    exampleTranslation: "公司必须创新才能保持竞争力。",
    level: "advanced",
    category: "verb"
  }
];

// 语法点
export const grammarTopics = [
  {
    id: 1,
    title: "一般现在时",
    level: "beginner",
    description: "表示经常发生的动作或存在的状态",
    rules: [
      "主语 + 动词原形（I/You/We/They）",
      "主语 + 动词第三人称单数（He/She/It）",
      "否定句：don't/doesn't + 动词原形",
      "疑问句：Do/Does + 主语 + 动词原形"
    ],
    examples: [
      { sentence: "I study English every day.", translation: "我每天学习英语。" },
      { sentence: "She works in an office.", translation: "她在办公室工作。" }
    ]
  },
  {
    id: 2,
    title: "现在进行时",
    level: "beginner",
    description: "表示正在发生的动作",
    rules: [
      "主语 + am/is/are + 动词ing形式",
      "表示此刻正在进行的动作",
      "也可表示将来计划好的动作"
    ],
    examples: [
      { sentence: "I am learning English now.", translation: "我现在正在学英语。" },
      { sentence: "They are watching TV.", translation: "他们正在看电视。" }
    ]
  },
  {
    id: 3,
    title: "形容词比较级",
    level: "intermediate",
    description: "用于比较两个人或事物",
    rules: [
      "单音节词：+er（taller, shorter）",
      "以e结尾：+r（nicer, larger）",
      "双写最后字母：+er（bigger, hotter）",
      "多音节词：more + 原级（more beautiful）"
    ],
    examples: [
      { sentence: "This book is better than that one.", translation: "这本书比那本好。" },
      { sentence: "She is taller than her brother.", translation: "她比她哥哥高。" }
    ]
  }
];

// 听力材料
export const listeningMaterials = [
  {
    id: 1,
    title: "自我介绍",
    level: "beginner",
    transcript: "Hello! My name is Sarah. I'm from the United States. I'm 25 years old. I like reading books and listening to music. I want to improve my English.",
    questions: [
      { question: "Where is Sarah from?", options: ["England", "United States", "Canada"], answer: "United States" },
      { question: "How old is Sarah?", options: ["20", "25", "30"], answer: "25" }
    ]
  },
  {
    id: 2,
    title: "谈论天气",
    level: "beginner",
    transcript: "A: How's the weather today? B: It's sunny and warm. A: Great! I want to go to the park. B: Good idea! Let's go together.",
    questions: [
      { question: "What's the weather like?", options: ["Rainy", "Sunny", "Cold"], answer: "Sunny" },
      { question: "Where do they want to go?", options: ["Park", "Library", "Mall"], answer: "Park" }
    ]
  }
];

// 口语话题
export const speakingTopics = [
  {
    id: 1,
    title: "介绍你自己",
    level: "beginner",
    tips: [
      "说说你的名字和年龄",
      "谈谈你的兴趣爱好",
      "简单介绍你的家庭"
    ],
    sampleDialogue: "Hi! I'm Zhang Wei. I'm 18 years old. I like playing basketball and listening to music. There are 3 people in my family."
  },
  {
    id: 2,
    title: "描述你的一天",
    level: "beginner",
    tips: [
      "说说你几点起床",
      "谈谈你的学习或工作",
      "描述你晚上做什么"
    ],
    sampleDialogue: "I usually get up at 7 AM. I have breakfast and then go to school. In the evening, I do my homework and watch TV. I go to bed at 10 PM."
  }
];

// 每日句子
export const dailySentences = [
  { id: 1, english: "Practice makes perfect.", chinese: "熟能生巧。", day: 1 },
  { id: 2, english: "Where there is a will, there is a way.", chinese: "有志者事竟成。", day: 2 },
  { id: 3, english: "It's never too late to learn.", chinese: "活到老学到老。", day: 3 },
  { id: 4, english: "Actions speak louder than words.", chinese: "事实胜于雄辩。", day: 4 },
  { id: 5, english: "A journey of a thousand miles begins with a single step.", chinese: "千里之行，始于足下。", day: 5 }
];
