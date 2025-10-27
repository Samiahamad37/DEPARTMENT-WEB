import React from 'react';
import { X, Mail, Phone, MapPin, GraduationCap, Award, BookOpen, ExternalLink, Calendar } from 'lucide-react';
import { Team } from '../types/api';

interface StaffProfileModalProps {
  staff: Team;
  isOpen: boolean;
  onClose: () => void;
}

const StaffProfileModal: React.FC<StaffProfileModalProps> = ({ staff, isOpen, onClose }) => {
  if (!isOpen) return null;

  const parseJsonField = (field: string | undefined): string[] => {
    if (!field) return [];
    try {
      return JSON.parse(field);
    } catch {
      return field.split(',').map(item => item.trim()).filter(item => item);
    }
  };

  const education = parseJsonField(staff.education);
  const researchAreas = parseJsonField(staff.research_areas);
  const awards = parseJsonField(staff.awards);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                {staff.photo ? (
                  <img 
                    src={staff.photo} 
                    alt={staff.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-lg font-medium">
                    {staff.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{staff.name}</h2>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-gray-600">{staff.title || staff.get_role_display || staff.role}</p>
                  {staff.is_on_study_leave && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      On Study Leave
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-8">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staff.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <a 
                      href={`mailto:${staff.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {staff.email}
                    </a>
                  </div>
                )}
                {staff.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <a 
                      href={`tel:${staff.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {staff.phone}
                    </a>
                  </div>
                )}
                {staff.office_location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{staff.office_location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Specialization */}
            {staff.specialization && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Specialization</h3>
                <p className="text-gray-700">{staff.specialization}</p>
              </div>
            )}

            {/* Biography */}
            {staff.bio && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Biography</h3>
                <p className="text-gray-700 leading-relaxed">{staff.bio}</p>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                  Education
                </h3>
                <ul className="space-y-2">
                  {education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Research Areas */}
            {researchAreas.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-600" />
                  Research Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {researchAreas.map((area, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {staff.publications_count && staff.publications_count > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Publications
                </h3>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-purple-800 font-medium">
                    {staff.publications_count} publication{staff.publications_count !== 1 ? 's' : ''}
                  </p>
                  <p className="text-purple-600 text-sm mt-1">
                    Detailed publication list available upon request
                  </p>
                </div>
              </div>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-600" />
                  Awards & Recognitions
                </h3>
                <ul className="space-y-2">
                  {awards.map((award, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;
