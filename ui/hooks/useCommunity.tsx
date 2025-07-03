// hooks/useCommunity.ts
import { useTracker } from 'meteor/react-meteor-data';
import { useState } from 'react';
import { Communities } from '../../communities/communities';

export const useCommunity = () => {
  const [selectedCommunityId, setSelectedCommunityId] = useState('');

  const { communities, isLoading } = useTracker(() => {
    const handle = Meteor.subscribe('communities');

    const isLoading = !handle.ready();
    const communities = handle.ready()
      ? Communities.find({}, { sort: { name: 1 } }).fetch()
      : [];

    return { communities, isLoading };
  }, []);

  return {
    communities,
    selectedCommunityId,
    setSelectedCommunityId,
    isLoading,
  };
};
