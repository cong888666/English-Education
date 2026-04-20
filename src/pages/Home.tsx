import { Link } from 'react-router-dom';
import { BookOpen, Volume2, MessageSquare, TrendingUp } from 'lucide-react';
import { vocabWords, grammarTopics, listeningMaterials, speakingTopics, dailySentences } from '../data/englishContent';

const Home = () => {
  const todaySentence = dailySentences[new Date().getDate() % dailySentences.length];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              英语学习平台
            </h1>
            <p className="text-xl md:text-2xl mb-10 opacity-95">
              轻松学英语，每天进步多一点
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/vocabulary"
                className="bg-white text-blue-700 px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                开始学习
              </Link>
              <Link
                to="/grammar"
                className="bg-transparent border-3 border-white text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all hover:-translate-y-1"
              >
                查看课程
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Sentence */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">每日一句</h2>
            <p className="text-gray-600 mb-8">每天积累一句，英语自然好</p>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg border border-blue-100">
              <p className="text-2xl font-medium text-gray-800 mb-4">{todaySentence.english}</p>
              <p className="text-xl text-gray-600">{todaySentence.chinese}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">学习模块</h2>
            <p className="text-xl text-gray-600">选择你感兴趣的内容开始学习</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Vocabulary */}
            <Link
              to="/vocabulary"
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-blue-100"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">词汇学习</h3>
              <p className="text-gray-600 mb-4">{vocabWords.length} 个单词</p>
              <p className="text-gray-500 text-sm">闪卡学习 + 互动练习</p>
              <div className="mt-4 text-blue-600 font-semibold flex items-center gap-2">
                开始学习
                <TrendingUp className="w-4 h-4" />
              </div>
            </Link>

            {/* Grammar */}
            <Link
              to="/grammar"
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-indigo-100"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">语法学习</h3>
              <p className="text-gray-600 mb-4">{grammarTopics.length} 个语法点</p>
              <p className="text-gray-500 text-sm">规则讲解 + 练习巩固</p>
              <div className="mt-4 text-indigo-600 font-semibold flex items-center gap-2">
                开始学习
                <TrendingUp className="w-4 h-4" />
              </div>
            </Link>

            {/* Listening */}
            <Link
              to="/listening"
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-pink-100"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">听力练习</h3>
              <p className="text-gray-600 mb-4">{listeningMaterials.length} 篇听力材料</p>
              <p className="text-gray-500 text-sm">音频播放 + 理解练习</p>
              <div className="mt-4 text-pink-600 font-semibold flex items-center gap-2">
                开始学习
                <TrendingUp className="w-4 h-4" />
              </div>
            </Link>

            {/* Speaking */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-orange-100 opacity-50">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">口语练习</h3>
              <p className="text-gray-600 mb-4">敬请期待</p>
              <p className="text-gray-500 text-sm">话题练习 + 发音指导</p>
              <div className="mt-4 text-orange-600 font-semibold">
                即将上线
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">学习统计</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {vocabWords.length}
                </div>
                <p className="text-gray-600 text-lg">单词总数</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-3xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {grammarTopics.length}
                </div>
                <p className="text-gray-600 text-lg">语法点总数</p>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl">
                <div className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {listeningMaterials.length}
                </div>
                <p className="text-gray-600 text-lg">听力材料数</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">开始你的英语学习之旅</h2>
            <p className="text-xl mb-10 opacity-90">每天坚持学习，你会看到显著的进步</p>
            <Link
              to="/vocabulary"
              className="inline-block bg-white text-blue-700 px-12 py-5 rounded-2xl font-semibold text-xl hover:shadow-2xl transition-all hover:scale-105"
            >
              立即开始学习
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
