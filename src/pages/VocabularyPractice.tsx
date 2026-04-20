import { useState } from 'react';
import { vocabularyWords } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Volume2, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';

const VocabularyPractice = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);

  const currentWord = vocabularyWords[currentIndex];
  const progress = Math.round((completed.length / vocabularyWords.length) * 100);

  const handleKnow = () => {
    if (!completed.includes(currentWord.id)) {
      setCompleted([...completed, currentWord.id]);
    }
    if (currentIndex < vocabularyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    } else {
      alert('🎉 恭喜完成！你已学习完所有单词！');
    }
  };

  const handleDontKnow = () => {
    if (currentIndex < vocabularyWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowTranslation(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowTranslation(false);
    setCompleted([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          ← 返回课程
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📖 单词记忆练习</h1>
          <p className="text-gray-600 mb-4">点击卡片查看翻译</p>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            进度：{completed.length} / {vocabularyWords.length} 词 · {progress}%
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div 
            className="relative w-full max-w-lg h-80 cursor-pointer"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <div className={`absolute w-full h-full rounded-2xl shadow-2xl transition-all duration-500 transform-style-preserve-3d ${showTranslation ? 'rotate-y-180' : ''}`}>
              {/* 正面 - 单词 */}
              <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl p-8 flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold text-gray-800 mb-6">{currentWord.word}</h2>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // 这里可以添加发音功能
                    alert('🔊 播放发音（演示）');
                  }}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Volume2 size={24} />
                  <span>听发音</span>
                </button>
                <p className="mt-8 text-gray-400 text-sm">点击卡片查看翻译</p>
              </div>
              
              {/* 背面 - 翻译 */}
              <div className="absolute w-full h-full backface-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 flex flex-col items-center justify-center text-white rotate-y-180">
                <h2 className="text-4xl font-bold mb-4">{currentWord.translation}</h2>
                <div className="mt-6 bg-white bg-opacity-20 rounded-xl p-6 max-w-md">
                  <p className="text-lg">{currentWord.example}</p>
                </div>
                <p className="mt-8 text-white text-opacity-70 text-sm">点击卡片返回</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={handleDontKnow}
            className="flex items-center gap-2 px-8 py-4 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition"
          >
            <XCircle size={24} />
            不会，跳过
          </button>
          <button
            onClick={handleKnow}
            className="flex items-center gap-2 px-8 py-4 bg-green-100 text-green-700 rounded-xl font-medium hover:bg-green-200 transition"
          >
            <CheckCircle2 size={24} />
            记住了！
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 mx-auto text-gray-600 hover:text-gray-800"
          >
            <RotateCcw size={18} />
            重新开始
          </button>
        </div>

        {/* 单词列表 */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📚 单词列表</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vocabularyWords.map((word, index) => (
              <div 
                key={word.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                  completed.includes(word.id) 
                    ? 'border-green-300 bg-green-50' 
                    : index === currentIndex 
                      ? 'border-blue-300 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setShowTranslation(false);
                }}
              >
                <div className="flex items-center gap-2">
                  {completed.includes(word.id) && <CheckCircle2 size={16} className="text-green-600" />}
                  <span className="font-medium">{word.word}</span>
                </div>
                <p className="text-sm text-gray-500">{word.translation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyPractice;