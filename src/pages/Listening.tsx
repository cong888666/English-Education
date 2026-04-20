import { useState } from 'react';
import { listeningMaterials } from '../data/englishContent';
import { Volume2, Play, CheckCircle2, Eye } from 'lucide-react';

const Listening = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<typeof listeningMaterials[0] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const startListening = (material: typeof listeningMaterials[0]) => {
    setSelectedMaterial(material);
    setShowQuiz(true);
    setAnswers([]);
    setQuizCompleted(false);
    setShowTranscript(false);
  };

  const playAudio = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      speechSynthesis.speak(utterance);
    }
  };

  const selectAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    setQuizCompleted(true);
  };

  const calculateScore = () => {
    if (!selectedMaterial) return 0;
    let score = 0;
    selectedMaterial.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        score += 50;
      }
    });
    return score;
  };

  const goBack = () => {
    setShowQuiz(false);
    setSelectedMaterial(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            听力练习
          </h1>
          <p className="text-gray-600 text-lg">提升你的英语听力理解能力</p>
        </div>

        {!showQuiz ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listeningMaterials.map((material) => (
              <div 
                key={material.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-3 bg-gradient-to-r from-pink-500 to-orange-500"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{material.title}</h3>
                    <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 rounded-full text-xs font-medium">
                      {material.level === 'beginner' ? '初级' : material.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Volume2 className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-700 font-medium">听力文本长度</span>
                    </div>
                    <p className="text-gray-600 text-sm">{Math.round(material.transcript.split(' ').length / 10) * 10} 词</p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 text-sm">{material.questions.length} 道题</span>
                  </div>

                  <button
                    onClick={() => startListening(material)}
                    className="w-full py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    开始练习
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* 返回按钮 */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-all"
            >
              <CheckCircle2 className="w-5 h-5 rotate-180" />
              返回听力列表
            </button>

            {selectedMaterial && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedMaterial.title}</h2>
                
                {/* 听力播放器 */}
                <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <button
                      onClick={() => playAudio(selectedMaterial.transcript)}
                      className="w-16 h-16 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      <Play className="w-8 h-8" />
                    </button>
                  </div>
                  <p className="text-center text-gray-600">点击播放按钮听听力材料</p>
                  
                  {/* 显示原文按钮 */}
                  <button
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="mt-4 mx-auto flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    {showTranscript ? '隐藏原文' : '查看原文'}
                  </button>
                  
                  {showTranscript && (
                    <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{selectedMaterial.transcript}</p>
                    </div>
                  )}
                </div>

                {/* 题目 */}
                <div className="space-y-8">
                  {selectedMaterial.questions.map((question, qIdx) => (
                    <div key={qIdx} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {qIdx + 1}
                        </span>
                        <div className="text-lg font-medium text-gray-800">{question.question}</div>
                      </div>
                      
                      <div className="space-y-3">
                        {question.options.map((option, oIdx) => {
                          const isSelected = answers[qIdx] === option;
                          const isCorrect = option === question.answer;
                          const showResult = quizCompleted;
                          
                          let buttonClass = '';
                          if (!showResult) {
                            buttonClass = isSelected 
                              ? 'bg-pink-100 border-2 border-pink-500 text-pink-800' 
                              : 'bg-white border-2 border-gray-200 hover:border-pink-300';
                          } else {
                            if (isCorrect) {
                              buttonClass = 'bg-green-100 border-2 border-green-500 text-green-800';
                            } else if (isSelected) {
                              buttonClass = 'bg-red-100 border-2 border-red-500 text-red-800';
                            } else {
                              buttonClass = 'bg-gray-100 border-2 border-gray-200 text-gray-500';
                            }
                          }
                          
                          return (
                            <button
                              key={oIdx}
                              onClick={() => !quizCompleted && selectAnswer(qIdx, option)}
                              disabled={quizCompleted}
                              className={`w-full text-left p-4 rounded-xl font-medium transition-all ${buttonClass}`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{option}</span>
                                {showResult && (
                                  isCorrect ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                                  ) : isSelected ? (
                                    <span className="w-5 h-5 text-red-600 ml-auto flex items-center justify-center font-bold">✗</span>
                                  ) : null
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 提交按钮 */}
                {!quizCompleted && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={checkAnswers}
                      disabled={answers.length < selectedMaterial.questions.length}
                      className="px-10 py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      检查答案
                    </button>
                  </div>
                )}

                {/* 结果显示 */}
                {quizCompleted && (
                  <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">练习完成！</h3>
                    
                    <div className="grid grid-cols-2 gap-6 max-w-xs mx-auto my-6">
                      <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                          {calculateScore()}
                        </div>
                        <div className="text-gray-600">得分</div>
                      </div>
                      <div className="bg-white rounded-xl p-5 shadow-sm">
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          {selectedMaterial.questions.filter((q, idx) => answers[idx] === q.answer).length}
                        </div>
                        <div className="text-gray-600">正确题数</div>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => {
                          setAnswers([]);
                          setQuizCompleted(false);
                          setShowTranscript(false);
                        }}
                        className="px-8 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                      >
                        再练一次
                      </button>
                      <button
                        onClick={goBack}
                        className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-all"
                      >
                        继续学习
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listening;
