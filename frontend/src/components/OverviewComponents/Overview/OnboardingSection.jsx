import React from 'react';
import { CheckCircle, HelpCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnboardingSection = () => {
  const steps = [
    {
      id: 'enableStatusChecks',
      label: 'Enable status checks',
      status: 'completed',
      actionLabel: 'Edit',
      link: '/organizations/gh/azadgupta1/integrations/provider',
    },
    {
      id: 'addRepositories',
      label: 'Add repositories',
      status: 'completed',
      actionLabel: 'Add',
      link: '/organizations/gh/azadgupta1/dashboard/add',
    },
    {
      id: 'createDefaultCodingStandard',
      label: 'Create default coding standard',
      status: 'pending',
      actionLabel: 'Add',
      link: '/organizations/gh/azadgupta1/policies/coding-standards',
    },
  ];

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 space-y-6 h-90 w-100 mx-auto">
      <p className="text-gray-700 text-lg font-medium">
        Configure key defaults and optimize Codacy for your organization.
      </p>
      <div className="w-full h-2 bg-gray-200 rounded">
        <div className="h-2 bg-blue-500 rounded" style={{ width: '66%' }}></div>
      </div>
      <p className="text-sm text-gray-600">2/3 completed</p>

      <div className="space-y-5">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {step.status === 'completed' ? (
                <CheckCircle className="text-green-600 w-5 h-5" />
              ) : (
                <Circle className="text-gray-400 w-5 h-5" />
              )}
              <p className="text-gray-800">{step.label}</p>
              <HelpCircle className="text-gray-400 w-4 h-4" />
            </div>
            <Link to={step.link}>
              <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded">
                {step.actionLabel}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingSection;
