import { useState } from 'react';
import { grammarTopics } from '../data/englishContent';
import { BookOpen, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const Grammar = () => {
  const [selectedTopic, setSelectedTopic] = useState<typeof grammarTopics[0] | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // 生成语法练习题
  const generateQuiz = (topic: typeof grammarTopics[0]) => {
    const questions = [
      {
        question: `选择正确的句子：${topic.examples[0].translation}`,
        options: [
          topic.examples[0].sentence,
          topic.examples[0].sentence.replace(/\s+/g, ' ').split(' ').sort(() => Math.random() - 0.5).join(' '),
          topic.examples[0].sentence.replace(/\w+/g, (match, idx) => idx === 0 ? match.toUpperCase() : match.toLowerCase()).replace(/\./g, '!')
        ],
        answer: topic.examples[0].sentence
      },
      {
        question: `填空：${topic.examples[1].translation}`,
        options: [
          topic.examples[1].sentence,
          topic.examples[1].sentence.replace('is', 'are').replace('am', 'is').replace('are', 'was'),
          topic.examples[1].sentence.replace(/\w+ly/g, 'quick')
        ],
        answer: topic.examples[1].sentence
      }
    ];
    return questions;
  };

  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);

  const startQuiz = (topic: typeof grammarTopics[0]) => {
    setSelectedTopic(topic);
    setQuizQuestions(generateQuiz(topic));
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const answerQuestion = (answer: string) => {
    const isCorrect = answer === quizQuestions[currentQuestion].answer;
    setUserAnswers([...userAnswers, answer]);
    if (isCorrect) setQuizScore(prev => prev + 50);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    if (selectedTopic) {
      setQuizQuestions(generateQuiz(selectedTopic));
      setCurrentQuestion(0);
      setQuizScore(0);
      setUserAnswers([]);
      setQuizCompleted(false);
    }
  };

  const goBack = () => {
    setShowQuiz(false);
    setSelectedTopic(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            语法学习
          </h1>
          <p className="text-gray-600 text-lg">掌握英语语法，提升你的写作和表达能力</p>
        </div>

        {!showQuiz ? (
          <div className="space-y-8">
            {/* 语法主题列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grammarTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{topic.title}</h3>
                      <span className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-xs font-medium">
                        {topic.level === 'beginner' ? '初级' : topic.level === 'intermediate' ? '中级' : '高级'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6">{topic.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-semibold text-gray-700">语法规则：</h4>
                      {topic.rules.slice(0, 3).map((rule, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-indigo-500 font-bold">•</span>
                          {rule}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => startQuiz(topic)}
                      className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <BookOpen className="w-4 h-4" />
                      开始学习
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* 返回按钮 */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              返回语法列表
            </button>

            {/* 学习内容 */}
            {selectedTopic && !quizCompleted && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">{selectedTopic.title}</h2>
                
                {/* 语法规则 */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">语法规则</h3>
                  <div className="space-y-3">
                    {selectedTopic.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="text-gray-700">{rule}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 例句 */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">例句</h3>
                  <div className="space-y-4">
                    {selectedTopic.examples.map((example, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-500">
                        <div className="text-xl font-medium text-gray-800 mb-2">{example.sentence}</div>
                        <div className="text-gray-600">{example.translation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 练习部分 */}
                <div className="border-t pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800">语法练习</h3>
                    <div className="text-indigo-600 font-medium">
                      第 {currentQuestion + 1} / {quizQuestions.length} 题
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="text-lg font-medium text-gray-800 mb-6">{quizQuestions[currentQuestion].question}</div>
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option: string, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => answerQuestion(option)}
                          className="w-full text-left p-4 rounded-xl bg-white border-2 border-gray-200 hover:border-indigo-500 hover:shadow-md transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-gray-800">{option}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 测验完成 */}
            {quizCompleted && (
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">练习完成！</h2>
                  <p className="text-gray-600 text-lg">你做得很棒！</p>
                </div>

                <div className="grid grid-cols-2 gap-6 max-w-md mx-auto mb-8">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {quizScore}
                    </div>
                    <div className="text-gray-600">得分</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {userAnswers.filter((a, i) => a === quizQuestions[i].answer).length}
                    </div>
                    <div className="text-gray-600">正确题数</div>
                  </div>
                </div>

                {/* 答案解析 */}
                <div className="text-left mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">答案解析</h3>
                  <div className="space-y-4">
                    {quizQuestions.map((q, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border-2 ${userAnswers[idx] === q.answer ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                        <div className="font-medium text-gray-800 mb-2">{q.question}</div>
                        <div className="text-sm text-gray-600">你的答案：{userAnswers[idx]}</div>
                        <div className={`text-sm font-medium ${userAnswers[idx] === q.answer ? 'text-green-600' : 'text-red-600'}`}>
                          正确答案：{q.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={restartQuiz}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
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
    </div>
  );
};

export default Grammar;
