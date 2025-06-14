import React from 'react';
import { getImageByName } from '../services/imageLoader';

interface ClinicianProfileProps {
  image: string;
  name: string;
  title: string;
  description: string;
  index: number;
}

export const ClinicianProfile: React.FC<ClinicianProfileProps> = ({
  image,
  name,
  title,
  description,
  index
}) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`profile-main ${isEven ? 'image-left' : 'image-right'}`}>
      <div className="profile-image-div">
        <img src={getImageByName(name)} alt={`${name}-image`} className="profile-image" />
      </div>
      <div className="profile-text-div">
        <p className="profile-title">{name} - {title}</p>
        <p className="profile-description">{description}</p>
      </div>
    </div>
  );
};
