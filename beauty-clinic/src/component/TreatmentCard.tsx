import React from "react";
export const TreatmentCard: React.FC<TreatmentCardProps> = ({ image, title, description, link }) => {
  return (
    <div className="treatment-card-div">
      <a href={link} className="treatment-card-a">
        <img src={image} alt={title} className="treatment-card-image" />
        <div className="treatment-card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};

interface TreatmentCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
}
