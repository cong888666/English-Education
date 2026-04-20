import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../lib/mockData';
import { BookOpen, Volume2, MessageSquare, Headphones, CheckCircle } from 'lucide-react';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">课程未找到</h2>
          <button 
            onClick={() => navigate('/courses')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            返回课程列表
          </button>
        </div>
      </div>
    );
  }

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'vocabulary': return <BookOpen size={20} />;
      case 'grammar': return <BookOpen size={20} />;
      case 'speaking': return <MessageSquare size={20} />;
      case 'listening': return <Headphones size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/courses')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
        >
          ← 返回课程列表
        </button>

        <div className={`bg-gradient-to-r ${course.imageColor} rounded-2xl p-8 mb-8 text-white`}>
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl opacity-90 mb-6">{course.description}</p>
          <div className="flex gap-4 flex-wrap">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              {course.language}
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              {course.level}
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              ⏱️ {course.duration} 小时
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 课程内容</h2>
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div 
                  key={lesson.id}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => {
                    if (lesson.type === 'vocabulary') {
                      navigate('/practice/vocabulary');
                    } else if (lesson.type === 'grammar') {
                      navigate('/practice/grammar');
                    }
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {lesson.completed ? <CheckCircle size={20} /> : getLessonIcon(lesson.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">第 {index + 1} 课</span>
                        <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {lesson.type === 'vocabulary' && '单词记忆'}
                        {lesson.type === 'grammar' && '语法练习'}
                        {lesson.type === 'speaking' && '口语练习'}
                        {lesson.type === 'listening' && '听力训练'}
                        · {lesson.duration} 分钟
                      </p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                      开始
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
              <h3 className="font-bold text-lg mb-4 text-gray-800">📊 学习进度</h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>总体进度</span>
                  <span>0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-700 mb-3">快速开始</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/practice/vocabulary')}
                    className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-500 hover:to-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    单词记忆
                  </button>
                  <button 
                    onClick={() => navigate('/practice/grammar')}
                    className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-purple-500 hover:to-purple-700 transition flex items-center justify-center gap-2"
                  >
                    <BookOpen size={18} />
                    语法练习
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;