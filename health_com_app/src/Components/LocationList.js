import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    allLocations {
      id
      name
      description
      beaconId
    }
  }
`;

function LocationList() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.allLocations.map(({ id, name, description, beaconId }) => (
        <div key={id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Beacon ID: {beaconId}</p>
        </div>
      ))}
    </div>
  );
}

export default LocationList;