import { useEffect } from 'react';
import { useUserStore, useCourseStore, useLearningStore } from '../store';
import { supabase } from '../lib/supabase';

const Home = () => {
  const { user } = useUserStore();
  const { courses, setCourses, setLoading } = useCourseStore();
  const { progress } = useLearningStore();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*');
        
        if (error) throw error;
        setCourses(data || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [setCourses, setLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              多语种沉浸式学习平台
            </h1>
            <p className="text-xl mb-8 opacity-90">
              支持英语、日语、韩语等主流语言，打造个性化学习体验
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
                开始学习
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition">
                了解更多
              </button>
            </div>
          </div>
        </div>
        
        {/* Language Selection Carousel */}
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">选择你的目标语言</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {['English', 'Japanese', 'Korean', 'Spanish', 'French', 'German'].map((language) => (
              <div key={language} className="flex-shrink-0 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 w-48 text-center hover:bg-opacity-20 transition">
                <h3 className="text-xl font-medium mb-2">{language}</h3>
                <p className="text-sm opacity-80">开始你的学习之旅</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Recommendations */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">推荐课程</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.language}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.duration} 小时</span>
                  <span className="font-medium">
                    {course.is_premium ? '¥99.99' : '免费'}
                  </span>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    查看课程
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Overview */}
      {user && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">学习进度</h2>
            <div className="max-w-3xl mx-auto">
              {courses.map((course) => (
                <div key={course.id} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{course.title}</span>
                    <span>{progress[course.id] || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full" 
                      style={{ width: `${progress[course.id] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">准备好开始学习了吗？</h2>
          <p className="text-xl mb-8 opacity-90">
            注册账号，获取个性化学习路径
          </p>
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition">
            立即注册
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;