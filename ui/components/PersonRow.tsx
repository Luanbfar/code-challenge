import React from 'react';
import ActionButton from './ActionButton';
import { PersonViewModel } from '../../types';

interface PersonRowProps {
  person: PersonViewModel;
  loading: boolean;
  error?: string;
  onCheckIn: (personId: string) => Promise<void>;
  onCheckOut: (personId: string) => Promise<void>;
  formatDateTime: (date?: Date) => string;
}

const PersonRow: React.FC<PersonRowProps> = ({
  person,
  loading,
  error,
  onCheckIn,
  onCheckOut,
  formatDateTime,
}) => {
  const rowBgClass = person.isCheckedIn
    ? 'bg-green-50'
    : person.isCheckedOut
      ? 'bg-gray-50'
      : '';

  return (
    <tr className={rowBgClass} key={person._id}>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm font-medium text-gray-900">
          {person.fullName}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">{person.companyName || '-'}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">{person.title || '-'}</div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">
          {formatDateTime(person.checkInTime ?? undefined)}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <div className="text-sm text-gray-900">
          {formatDateTime(person.checkOutTime ?? undefined)}
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
        <div className="space-y-1">
          <div className="space-x-2">
            {!person.checkInTime && (
              <ActionButton
                onClick={() => onCheckIn(person._id)}
                loading={loading}
                disabled={loading}
                variant="primary"
              >
                Check-in
              </ActionButton>
            )}
            {person.isCheckedIn && (
              <ActionButton
                onClick={() => onCheckOut(person._id)}
                loading={loading}
                disabled={loading}
                variant="danger"
              >
                Check-out
              </ActionButton>
            )}
            {person.isCheckedOut && (
              <span className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                Checked out
              </span>
            )}
          </div>
          {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
        </div>
      </td>
    </tr>
  );
};

export default PersonRow;
