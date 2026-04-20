export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: string;
  duration: number;
  price: number;
  isPremium: boolean;
  imageColor: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'vocabulary' | 'grammar' | 'listening' | 'speaking';
  duration: number;
  completed: boolean;
}

export interface VocabularyWord {
  id: string;
  word: string;
  translation: string;
  example: string;
  imageUrl?: string;
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const courses: Course[] = [
  {
    id: 'english-beginner',
    title: '英语入门',
    description: '从零开始学习英语，掌握基础词汇和日常对话',
    language: 'English',
    level: 'Beginner',
    duration: 20,
    price: 0,
    isPremium: false,
    imageColor: 'from-blue-400 to-blue-600',
    lessons: [
      { id: 'en-1', title: '问候用语', type: 'vocabulary', duration: 10, completed: false },
      { id: 'en-2', title: '数字与时间', type: 'grammar', duration: 15, completed: false },
      { id: 'en-3', title: '自我介绍', type: 'speaking', duration: 12, completed: false },
      { id: 'en-4', title: '购物对话', type: 'listening', duration: 18, completed: false },
    ]
  },
  {
    id: 'japanese-beginner',
    title: '日语入门',
    description: '学习五十音、基础词汇和简单日语对话',
    language: 'Japanese',
    level: 'Beginner',
    duration: 25,
    price: 0,
    isPremium: false,
    imageColor: 'from-red-400 to-red-600',
    lessons: [
      { id: 'ja-1', title: '平假名入门', type: 'vocabulary', duration: 15, completed: false },
      { id: 'ja-2', title: '片假名基础', type: 'grammar', duration: 20, completed: false },
      { id: 'ja-3', title: '问候与礼貌用语', type: 'speaking', duration: 18, completed: false },
    ]
  },
  {
    id: 'korean-beginner',
    title: '韩语入门',
    description: '学习韩文、基础词汇和日常韩语表达',
    language: 'Korean',
    level: 'Beginner',
    duration: 22,
    price: 0,
    isPremium: false,
    imageColor: 'from-purple-400 to-purple-600',
    lessons: [
      { id: 'ko-1', title: '韩文字母', type: 'vocabulary', duration: 12, completed: false },
      { id: 'ko-2', title: '基本问候', type: 'grammar', duration: 15, completed: false },
    ]
  }
];

export const vocabularyWords: VocabularyWord[] = [
  { id: 'v1', word: 'Hello', translation: '你好', example: 'Hello, how are you?' },
  { id: 'v2', word: 'Goodbye', translation: '再见', example: 'Goodbye, see you tomorrow!' },
  { id: 'v3', word: 'Thank you', translation: '谢谢', example: 'Thank you very much!' },
  { id: 'v4', word: 'Please', translation: '请', example: 'Please pass the salt.' },
  { id: 'v5', word: 'Sorry', translation: '对不起', example: 'I\'m sorry for being late.' },
  { id: 'v6', word: 'Yes', translation: '是', example: 'Yes, that\'s correct.' },
  { id: 'v7', word: 'No', translation: '不是', example: 'No, thank you.' },
  { id: 'v8', word: 'Love', translation: '爱', example: 'I love learning languages!' },
];

export const grammarExercises: GrammarExercise[] = [
  {
    id: 'g1',
    question: '选择正确的单词填空：I ___ a student.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 0,
    explanation: '第一人称单数 I 后面要用 am'
  },
  {
    id: 'g2',
    question: '选择正确的单词填空：She ___ a teacher.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 1,
    explanation: '第三人称单数 She 后面要用 is'
  },
  {
    id: 'g3',
    question: '选择正确的单词填空：We ___ friends.',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 2,
    explanation: '第一人称复数 We 后面要用 are'
  },
  {
    id: 'g4',
    question: '选择正确的时态：Yesterday I ___ to the park.',
    options: ['go', 'goes', 'went', 'going'],
    correctAnswer: 2,
    explanation: '过去时态要用 go 的过去式 went'
  }
];