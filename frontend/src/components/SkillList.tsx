
import React from 'react';
import { Skill } from '../types';
import { getCategoryColor } from '../utils/helpers';

interface SkillListProps {
  skills: Skill[];
  selectedSkill: number | null;
  onSelectSkill: (skillId: number) => void;
}

export const SkillList: React.FC<SkillListProps> = ({ 
  skills, 
  selectedSkill, 
  onSelectSkill 
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Available Skills
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {skills.map(skill => (
          <div
            key={skill.id}
            onClick={() => onSelectSkill(skill.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedSkill === skill.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {skill.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {skill.description}
                </p>
              </div>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(skill.category)}`}>
              {skill.category.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};