import { useTracker } from 'meteor/react-meteor-data';
import { useState } from 'react';
import { People } from '../../people/people';
import { PersonViewModel, Person as IPerson } from '../../types';

export const usePeople = () => {
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rawPeople = useTracker(() => {
    const handle = Meteor.subscribe('people');

    if (!handle.ready()) {
      return [];
    }

    return People.find({}, { sort: { lastName: 1 } }).fetch();
  }, []);

  const people: PersonViewModel[] = rawPeople.map((person) => ({
    ...person,
    fullName: `${person.firstName} ${person.lastName}`,
    isCheckedIn: !!person.checkInTime && !person.checkOutTime,
    isCheckedOut: !!person.checkOutTime,
  }));

  const handleAction = async (
    method: 'people.checkIn' | 'people.checkOut',
    id: string,
    communityId?: string
  ) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: '' }));

    if (method === 'people.checkIn' && !communityId) {
      setErrors((prev) => ({
        ...prev,
        [id]: 'Community must be selected to check in',
      }));
      setLoading((prev) => ({ ...prev, [id]: false }));
      return;
    }

    Meteor.call(method, id, communityId, (error: any) => {
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [id]: error.reason || error.message,
        }));
      }
      setLoading((prev) => ({ ...prev, [id]: false }));
    });
  };

  const checkIn = (id: string, communityId: string) =>
    handleAction('people.checkIn', id, communityId);
  const checkOut = (id: string) => handleAction('people.checkOut', id);

  return {
    people,
    loading,
    errors,
    checkIn,
    checkOut,
    formatDateTime: (d?: Date | null) =>
      d ? new Date(d).toLocaleString() : 'N/A',
  };
};
