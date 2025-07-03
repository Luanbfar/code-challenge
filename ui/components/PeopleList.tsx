import React, { useState, useMemo } from 'react';
import PersonRow from './PersonRow';
import { PersonViewModel } from '../../types';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';

interface PeopleListProps {
  people: PersonViewModel[];
  loading: Record<string, boolean>;
  errors: Record<string, string>;
  onCheckIn: (id: string) => Promise<void>;
  onCheckOut: (id: string) => Promise<void>;
  formatDateTime: (date?: Date | null) => string;
}

type SortKey = 'name' | 'company' | 'title' | 'checkIn' | 'checkOut';

export const PeopleList: React.FC<PeopleListProps> = ({
  people,
  loading,
  errors,
  onCheckIn,
  onCheckOut,
  formatDateTime,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getValue = (person: PersonViewModel, key: SortKey) => {
    switch (key) {
      case 'name':
        return person.fullName || '';
      case 'company':
        return person.companyName || '';
      case 'title':
        return person.title || '';
      case 'checkIn':
        return person.checkInTime ? new Date(person.checkInTime).getTime() : 0;
      case 'checkOut':
        return person.checkOutTime
          ? new Date(person.checkOutTime).getTime()
          : 0;
      default:
        return '';
    }
  };

  const sortedPeople = useMemo(() => {
    const sorted = [...people].sort((a, b) => {
      const aVal = getValue(a, sortKey);
      const bVal = getValue(b, sortKey);
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [people, sortKey, sortOrder]);

  const renderSortIcon = (key: SortKey) => {
    if (key !== sortKey) return null;
    return sortOrder === 'asc' ? (
      <ArrowUpIcon className="ml-1 inline-block h-4 w-4" />
    ) : (
      <ArrowDownIcon className="ml-1 inline-block h-4 w-4" />
    );
  };

  const headerClass = 'cursor-pointer select-none flex items-center';

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-700"
              onClick={() => handleSort('name')}
            >
              <span className={headerClass}>Name {renderSortIcon('name')}</span>
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-700"
              onClick={() => handleSort('company')}
            >
              <span className={headerClass}>
                Company {renderSortIcon('company')}
              </span>
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-700"
              onClick={() => handleSort('title')}
            >
              <span className={headerClass}>
                Title {renderSortIcon('title')}
              </span>
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-700"
              onClick={() => handleSort('checkIn')}
            >
              <span className={headerClass}>
                Check-in {renderSortIcon('checkIn')}
              </span>
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-medium text-gray-700"
              onClick={() => handleSort('checkOut')}
            >
              <span className={headerClass}>
                Check-out {renderSortIcon('checkOut')}
              </span>
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedPeople.map((person) => (
            <PersonRow
              key={person._id}
              person={person}
              loading={loading[person._id] || false}
              error={errors[person._id]}
              onCheckIn={onCheckIn}
              onCheckOut={onCheckOut}
              formatDateTime={formatDateTime}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleList;
