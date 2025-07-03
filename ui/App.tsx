import React, { useState } from 'react';
import { usePeople } from './hooks/usePeople';
import { PeopleList } from './components/PeopleList';
import { EventSummary } from './components/EventSummary';
import { useCommunity } from './hooks/useCommunity';
import EventSelector from './components/EventSelector';

const App = () => {
  const { people, loading, errors, checkIn, checkOut, formatDateTime } =
    usePeople();
  const {
    communities,
    selectedCommunityId,
    setSelectedCommunityId,
  } = useCommunity();
  const [showSummary, setShowSummary] = useState(false);
  const [visibleCount, setVisibleCount] = useState(25);
  const visiblePeople = people.slice(0, visibleCount);

  const handleCheckIn = async (id: string): Promise<void> => {
    if (!selectedCommunityId) {
      alert('Please select an event before checking in.');
      return;
    }
    await checkIn(id, selectedCommunityId);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold">Event Check-In</h1>
      <button
        onClick={() => setShowSummary(true)}
        className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Event Summary
      </button>
      <EventSelector
        communities={communities}
        selectedCommunityId={selectedCommunityId}
        onCommunityChange={setSelectedCommunityId}
      />

      {showSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Event Summary</h2>
            <EventSummary
              people={people}
              selectedCommunityId={selectedCommunityId}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowSummary(false)}
                className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[600px] overflow-y-auto">
        <PeopleList
          people={visiblePeople}
          loading={loading}
          errors={errors}
          onCheckIn={handleCheckIn}
          onCheckOut={checkOut}
          formatDateTime={formatDateTime}
        />
      </div>
      <div className="mt-4 flex justify-center">
        {visibleCount < people.length && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 25)}
              className="mt-4 flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
