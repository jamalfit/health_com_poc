import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './Locations.css';  // Import the CSS file

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

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  return (
    <div className="location-list">
      {data.allLocations.map(({ id, name, description, beaconId }) => (
        <div key={id} className="location-card">
          <h2>{name}</h2>
          <p>{description}</p>
          <p className="beacon-id">Beacon ID: {beaconId}</p>
        </div>
      ))}
    </div>
  );
}

export default LocationList;