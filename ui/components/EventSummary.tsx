import React from 'react';

interface Person {
  companyName?: string;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
  communityId?: string;
}

interface EventSummaryProps {
  people: Person[];
  selectedCommunityId: string;
}

export const EventSummary: React.FC<EventSummaryProps> = ({
  people,
  selectedCommunityId,
}) => {
  const filteredPeople = people.filter(
    (p) => p.communityId === selectedCommunityId
  );

  const currentlyCheckedIn = filteredPeople.filter(
    (p) => p.checkInTime && !p.checkOutTime
  );

  const notCheckedIn = filteredPeople.filter((p) => !p.checkInTime);

  const companyBreakdown: Record<string, number> = {};
  currentlyCheckedIn.forEach((p) => {
    const company = p.companyName || 'Unknown';
    companyBreakdown[company] = (companyBreakdown[company] || 0) + 1;
  });

  return (
    <div className="mt-6 rounded bg-blue-50 p-4 shadow">
      <h2 className="mb-2 text-xl font-semibold">Event Summary</h2>
      <p className="mb-1 text-sm">
        ✅ Current Attendee Count: <strong>{currentlyCheckedIn.length}</strong>
      </p>
      <p className="mb-1 text-sm">
        ❌ Not Checked In: <strong>{notCheckedIn.length}</strong>
      </p>
      <div className="mt-2">
        <p className="mb-1 text-sm font-medium">🏢 Company Breakdown:</p>
        <ul className="ml-4 list-disc text-sm">
          {Object.entries(companyBreakdown).map(([company, count]) => (
            <li key={company}>
              {company}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
