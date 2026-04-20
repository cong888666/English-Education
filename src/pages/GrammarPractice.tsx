import { useState } from 'react';
import { grammarExercises } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, RotateCcw, CheckCircle, XCircle as XCircleIcon } from 'lucide-react';

const GrammarPractice = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);

  const currentExercise = grammarExercises[currentIndex];
  const progress = Math.round((completed.length / grammarExercises.length) * 100);

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheck = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    
    if (selectedAnswer === currentExercise.correctAnswer) {
      if (!completed.includes(currentExercise.id)) {
        setCompleted([...completed, currentExercise.id]);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < grammarExercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      alert('🎉 恭喜完成！你已做完所有语法练习！');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCompleted([]);
  };

  const isCorrect = selectedAnswer === currentExercise.correctAnswer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          ← 返回课程
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">📝 语法练习</h1>
          <p className="text-gray-600 mb-4">选择正确的答案完成题目</p>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-400 to-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            进度：{completed.length} / {grammarExercises.length} 题 · {progress}%
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-500">第 {currentIndex + 1} 题 / 共 {grammarExercises.length} 题</span>
            {completed.includes(currentExercise.id) && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle2 size={18} />
                已完成
              </span>
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentExercise.question}</h2>
          </div>

          <div className="space-y-4">
            {currentExercise.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  showResult 
                    ? index === currentExercise.correctAnswer 
                      ? 'border-green-500 bg-green-50' 
                      : index === selectedAnswer 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-gray-200'
                    : selectedAnswer === index 
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    showResult 
                      ? index === currentExercise.correctAnswer 
                        ? 'bg-green-500 text-white' 
                        : index === selectedAnswer 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-200'
                      : selectedAnswer === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-lg flex-1">{option}</span>
                  {showResult && index === currentExercise.correctAnswer && (
                    <CheckCircle size={24} className="text-green-500" />
                  )}
                  {showResult && index === selectedAnswer && !isCorrect && (
                    <XCircleIcon size={24} className="text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`mt-8 p-6 rounded-xl ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-yellow-50 border-2 border-yellow-200'}`}>
              <div className="flex items-center gap-3 mb-3">
                {isCorrect ? (
                  <>
                    <CheckCircle size={28} className="text-green-600" />
                    <h3 className="text-xl font-bold text-green-700">答对了！🎉</h3>
                  </>
                ) : (
                  <>
                    <XCircle size={28} className="text-yellow-600" />
                    <h3 className="text-xl font-bold text-yellow-700">再想想...</h3>
                  </>
                )}
              </div>
              <div className="text-gray-700">
                <p className="font-medium mb-1">解析：</p>
                <p>{currentExercise.explanation}</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            {!showResult ? (
              <button
                onClick={handleCheck}
                disabled={selectedAnswer === null}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-600 transition"
              >
                检查答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-10 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transition"
              >
                {currentIndex < grammarExercises.length - 1 ? '下一题 →' : '完成练习 ✓'}
              </button>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 mx-auto text-gray-600 hover:text-gray-800"
          >
            <RotateCcw size={18} />
            重新开始
          </button>
        </div>

        {/* 题目列表 */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">📋 题目列表</h3>
          <div className="flex flex-wrap gap-3">
            {grammarExercises.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSelectedAnswer(null);
                  setShowResult(false);
                }}
                className={`w-12 h-12 rounded-lg font-bold flex items-center justify-center transition ${
                  completed.includes(exercise.id) 
                    ? 'bg-green-500 text-white' 
                    : index === currentIndex 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarPractice;