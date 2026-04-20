import { courses } from '../lib/mockData';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">全部课程</h1>
          <p className="text-gray-600 text-lg">选择您想学习的语言课程</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              <div className={`h-48 bg-gradient-to-r ${course.imageColor} flex items-center justify-center`}>
                <h3 className="text-2xl font-bold text-white">{course.title}</h3>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {course.language}
                  </span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">⏱️ {course.duration} 小时</span>
                  <span className="font-bold text-lg">
                    {course.isPremium ? '¥99.99' : '🆓 免费'}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">📚 {course.lessons.length} 节课</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition">
                  开始学习
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;