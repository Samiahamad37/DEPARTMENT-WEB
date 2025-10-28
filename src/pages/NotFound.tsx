import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Layout from '../components/Layout';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Icon/Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-9xl font-bold text-gray-300">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-orange-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </p>
          <p className="text-gray-500 mb-12">
            Don't worry, you can use the navigation menu to find your way back.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center mb-3">
              <Search className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Looking for something specific?</h3>
            <p className="text-sm text-gray-600">
              Try using the navigation menu or visit our homepage to explore our department.
            </p>
          </div>

          {/* Popular Links */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/about/department')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="font-semibold text-gray-900">Our Department</div>
              <div className="text-sm text-gray-600">Learn about us</div>
            </button>
            <button
              onClick={() => navigate('/about/people')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="font-semibold text-gray-900">Our People</div>
              <div className="text-sm text-gray-600">Meet the team</div>
            </button>
            <button
              onClick={() => navigate('/programmes')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="font-semibold text-gray-900">Programmes</div>
              <div className="text-sm text-gray-600">View courses</div>
            </button>
            <button
              onClick={() => navigate('/research')}
              className="p-4 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="font-semibold text-gray-900">Research</div>
              <div className="text-sm text-gray-600">Explore projects</div>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
