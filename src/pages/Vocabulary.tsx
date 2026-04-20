import { useState } from 'react';
import { vocabWords } from '../data/englishContent';
import { Book, Volume2, RotateCcw, CheckCircle2 } from 'lucide-react';

const Vocabulary = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [currentWord, setCurrentWord] = useState(vocabWords[0]);
  const [practiceMode, setPracticeMode] = useState<'quiz' | 'typing'>('quiz');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [typingAnswer, setTypingAnswer] = useState('');

  const currentWordData = vocabWords[currentIndex];

  const generateOptions = (word: typeof vocabWords[0]) => {
    const otherMeanings = vocabWords
      .filter(w => w.id !== word.id)
      .map(w => w.meaning)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return [word.meaning, ...otherMeanings].sort(() => Math.random() - 0.5);
  };

  const startPractice = () => {
    setShowPractice(true);
    setScore(0);
    const randomIndex = Math.floor(Math.random() * vocabWords.length);
    setCurrentWord(vocabWords[randomIndex]);
    setOptions(generateOptions(vocabWords[randomIndex]));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTypingAnswer('');
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentWord.meaning;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 10);
  };

  const checkTypingAnswer = () => {
    const correct = typingAnswer.toLowerCase().trim() === currentWord.word.toLowerCase();
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 10);
  };

  const nextWord = () => {
    const randomIndex = Math.floor(Math.random() * vocabWords.length);
    setCurrentWord(vocabWords[randomIndex]);
    setOptions(generateOptions(vocabWords[randomIndex]));
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTypingAnswer('');
  };

  const nextFlashcard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabWords.length);
  };

  const previousFlashcard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + vocabWords.length) % vocabWords.length);
  };

  const speakWord = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWordData.word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            词汇学习
          </h1>
          <p className="text-gray-600 text-lg">掌握英语词汇，提升你的语言能力</p>
        </div>

        {/* 切换模式 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowPractice(false)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${!showPractice ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <Book className="inline mr-2" /> 闪卡学习
          </button>
          <button
            onClick={startPractice}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${showPractice ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
          >
            <CheckCircle2 className="inline mr-2" /> 练习模式
          </button>
        </div>

        {/* 闪卡模式 */}
        {!showPractice && (
          <div className="space-y-8">
            {/* 闪卡 */}
            <div className="perspective-1000">
              <div 
                className="relative w-full h-80 cursor-pointer transform-style-preserve-3d transition-transform duration-600"
                style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* 正面 */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center border-2 border-blue-100">
                  <div className="text-5xl font-bold text-blue-600 mb-4">{currentWordData.word}</div>
                  <div className="text-xl text-gray-500 mb-6">{currentWordData.phonetic}</div>
                  <div className="flex items-center gap-2 text-blue-600 cursor-pointer hover:text-blue-700" onClick={(e) => { e.stopPropagation(); speakWord(); }}>
                    <Volume2 className="w-5 h-5" />
                    <span>听发音</span>
                  </div>
                  <div className="absolute bottom-4 text-gray-400 text-sm">点击查看中文意思</div>
                </div>

                {/* 背面 */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center" style={{ transform: 'rotateY(180deg)' }}>
                  <div className="text-4xl font-bold text-white mb-4">{currentWordData.meaning}</div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-6 text-center max-w-md">
                    <div className="text-white mb-2">{currentWordData.example}</div>
                    <div className="text-white/80">{currentWordData.exampleTranslation}</div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{currentWordData.level}</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">{currentWordData.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex justify-center gap-4">
              <button
                onClick={previousFlashcard}
                className="px-6 py-3 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                ← 上一个
              </button>
              <div className="px-6 py-3 bg-gray-100 rounded-xl text-gray-600 font-medium">
                {currentIndex + 1} / {vocabWords.length}
              </div>
              <button
                onClick={nextFlashcard}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                下一个 →
              </button>
            </div>
          </div>
        )}

        {/* 练习模式 */}
        {showPractice && (
          <div className="space-y-8">
            {/* 分数显示 */}
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-lg">
                <div className="text-sm opacity-90">当前得分</div>
                <div className="text-3xl font-bold">{score}</div>
              </div>
            </div>

            {/* 练习模式切换 */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={() => { setPracticeMode('quiz'); setIsCorrect(null); setSelectedAnswer(null); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${practiceMode === 'quiz' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                选择题
              </button>
              <button
                onClick={() => { setPracticeMode('typing'); setIsCorrect(null); setTypingAnswer(''); }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${practiceMode === 'typing' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                拼写练习
              </button>
            </div>

            {/* 题目显示 */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-blue-600 mb-4">{currentWord.word}</div>
                <div className="text-xl text-gray-500">{currentWord.phonetic}</div>
                <div className="flex items-center justify-center gap-2 text-blue-600 cursor-pointer hover:text-blue-700 mt-4" onClick={speakWord}>
                  <Volume2 className="w-5 h-5" />
                  <span>听发音</span>
                </div>
              </div>

              {/* 选择题 */}
              {practiceMode === 'quiz' && (
                <div className="space-y-4">
                  <div className="text-center text-gray-700 font-medium mb-4">选择正确的中文意思</div>
                  {options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-xl text-lg font-medium transition-all ${
                        selectedAnswer === null
                          ? 'bg-gray-50 hover:bg-blue-50 text-gray-800 border-2 border-transparent hover:border-blue-300'
                          : option === currentWord.meaning
                            ? 'bg-green-100 text-green-800 border-2 border-green-500'
                            : option === selectedAnswer
                              ? 'bg-red-100 text-red-800 border-2 border-red-500'
                              : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {/* 拼写练习 */}
              {practiceMode === 'typing' && (
                <div className="space-y-4">
                  <div className="text-center text-gray-700 font-medium mb-4">拼写这个单词</div>
                  <input
                    type="text"
                    value={typingAnswer}
                    onChange={(e) => setTypingAnswer(e.target.value)}
                    placeholder="输入单词..."
                    disabled={isCorrect !== null}
                    className="w-full p-4 text-2xl text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && isCorrect === null && checkTypingAnswer()}
                  />
                  {isCorrect === null && (
                    <button
                      onClick={checkTypingAnswer}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      检查答案
                    </button>
                  )}
                </div>
              )}

              {/* 答案反馈 */}
              {isCorrect !== null && (
                <div className={`mt-6 p-4 rounded-xl text-center ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <div className="text-xl font-bold mb-2">
                    {isCorrect ? '✓ 正确！' : '✗ 错误'}
                  </div>
                  <div className="text-gray-700 mb-4">
                    {currentWord.word} - {currentWord.meaning}
                  </div>
                  <div className="bg-white/50 rounded-lg p-4">
                    <div className="text-gray-700">{currentWord.example}</div>
                    <div className="text-gray-500 text-sm">{currentWord.exampleTranslation}</div>
                  </div>
                  <button
                    onClick={nextWord}
                    className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    下一个单词 →
                  </button>
                </div>
              )}
            </div>

            {/* 重置按钮 */}
            <div className="text-center">
              <button
                onClick={() => {
                  setShowPractice(false);
                  setScore(0);
                }}
                className="px-6 py-3 bg-white text-gray-600 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                重置
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vocabulary;
