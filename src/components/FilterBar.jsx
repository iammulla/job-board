import React from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const filters = {
  roleType: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  workType: ['Remote', 'Hybrid', 'On-site'],
  hourlyRate: { min: 0, max: 200, step: 10 }
};

const FilterButton = ({ label, isOpen, children }) => (
  <Popover.Button
    className={`
      ${isOpen ? 'text-primary-600' : 'text-gray-700'}
      group inline-flex items-center rounded-md px-3 py-2 text-base font-medium hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    `}
  >
    <span>{label}</span>
    <ChevronDownIcon
      className={`${isOpen ? 'text-primary-600' : 'text-gray-400'} 
        ml-2 h-5 w-5 group-hover:text-primary-600`}
      aria-hidden="true"
    />
  </Popover.Button>
);

const FilterBar = ({ filters: activeFilters, onFilterChange }) => {
  const handleFilterSelect = (filterType, value) => {
    if (Array.isArray(activeFilters[filterType])) {
      const newValues = activeFilters[filterType].includes(value)
        ? activeFilters[filterType].filter(item => item !== value)
        : [...activeFilters[filterType], value];
      onFilterChange({ ...activeFilters, [filterType]: newValues });
    } else {
      onFilterChange({ ...activeFilters, [filterType]: value });
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        {/* Role Type Filter */}
        <Popover className="relative">
          {({ open }) => (
            <>
              <FilterButton label="Role Type" isOpen={open} />
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white p-6">
                      {filters.roleType.map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={activeFilters.roleType?.includes(type)}
                            onChange={() => handleFilterSelect('roleType', type)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label className="ml-3 text-sm text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/* Work Type Filter */}
        <Popover className="relative">
          {({ open }) => (
            <>
              <FilterButton label="Work Type" isOpen={open} />
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative grid gap-6 bg-white p-6">
                      {filters.workType.map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={activeFilters.workType?.includes(type)}
                            onChange={() => handleFilterSelect('workType', type)}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label className="ml-3 text-sm text-gray-700">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/* Hourly Rate Filter */}
        <Popover className="relative">
          {({ open }) => (
            <>
              <FilterButton label="Hourly Rate" isOpen={open} />
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white p-6">
                      <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-900">
                          Rate Range: ${activeFilters.hourlyRate?.[0] || 0} - ${activeFilters.hourlyRate?.[1] || 200}/hr
                        </label>
                        <div className="relative pt-1">
                          <input
                            type="range"
                            min={filters.hourlyRate.min}
                            max={filters.hourlyRate.max}
                            step={filters.hourlyRate.step}
                            value={activeFilters.hourlyRate?.[1] || filters.hourlyRate.max}
                            onChange={(e) => handleFilterSelect('hourlyRate', [
                              activeFilters.hourlyRate?.[0] || filters.hourlyRate.min,
                              parseInt(e.target.value)
                            ])}
                            className="w-full h-2 bg-primary-200 rounded-lg appearance-none cursor-pointer"
                          />
                          <input
                            type="range"
                            min={filters.hourlyRate.min}
                            max={filters.hourlyRate.max}
                            step={filters.hourlyRate.step}
                            value={activeFilters.hourlyRate?.[0] || filters.hourlyRate.min}
                            onChange={(e) => handleFilterSelect('hourlyRate', [
                              parseInt(e.target.value),
                              activeFilters.hourlyRate?.[1] || filters.hourlyRate.max
                            ])}
                            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/* Location Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search location..."
            value={activeFilters.location || ''}
            onChange={(e) => handleFilterSelect('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
