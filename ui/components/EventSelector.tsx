import { Community } from '../../types';
import React from 'react';

interface EventSelectorProps {
  communities: Community[];
  selectedCommunityId: string;
  onCommunityChange: (communityId: string) => void;
}

const EventSelector: React.FC<EventSelectorProps> = ({
  communities,
  selectedCommunityId,
  onCommunityChange,
}) => (
  <div className="mb-8 rounded-lg bg-white p-6 shadow-sm">
    <label
      htmlFor="event-selector"
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      Select Event
    </label>
    <select
      id="event-selector"
      value={selectedCommunityId}
      onChange={(e) => onCommunityChange(e.target.value)}
      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-80"
    >
      <option value="">Select an event</option>
      {communities.map((community) => (
        <option key={community._id} value={community._id}>
          {community.name}
        </option>
      ))}
    </select>
  </div>
);

export default EventSelector;
