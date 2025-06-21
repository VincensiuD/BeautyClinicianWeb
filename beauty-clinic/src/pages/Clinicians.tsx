import React, { useState, useEffect } from "react";
import { ClinicianProfile } from "../components/CliniciansProfile";
import { customFetch } from "../services/customFetch";

export interface Clinician {
  ID: number;
  name: string;
  title: string;
  description: string;
  image?: string;
}

export const Clinicians = () => {
  const [clinicians, setClinicians] = useState<Clinician[]>([]);

  async function fetchData() {
    const data = await customFetch("http://127.0.0.1:3000/api/clinicians");
    if (data) {
      setClinicians(data);
      console.info(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="clinicians-main-div">
      <h1 className="std-background no-margin">Our Practitioners</h1>
      <div className="clinician-opening-div">
        <p>
        Meet our team! At Serenity, our team is made up of highly trained
        professionals who are dedicated to delivering exceptional care with a
        personal touch. With diverse backgrounds, years of experience, and just
        the right amount of personality, we believe great results start with
        great people.
      </p>
      </div>
      
      <div>
        {clinicians.map(({ name, description, title, image }, index) => (
          <ClinicianProfile
            key={index}
            name={name}
            description={description}
            title={title}
            image={image ? image : ""}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
