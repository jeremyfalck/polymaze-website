import React from "react";
import strings from "../../../assets/text/strings.json";
import ClementPhoto from "../../../assets/images/clement_photo.png";
import ThibautPhoto from "../../../assets/images/thibaut_photo.png";
import SebastienPhoto from "../../../assets/images/sebastien_photo.png";

interface MemberPresentation {
  image: string;
  name: string;
  instrument: string;
  description: string;
}

const presentations = [
  {
    image: SebastienPhoto,
    name: strings.member1_name,
    instrument: strings.member1_instrument,
    description: strings.member1_description,
  },
  {
    image: ThibautPhoto,
    name: strings.member2_name,
    instrument: strings.member2_instrument,
    description: strings.member2_description,
  },
  {
    image: ClementPhoto,
    name: strings.member3_name,
    instrument: strings.member3_instrument,
    description: strings.member3_description,
  },
];

export const MembersPresentation = () => {
  return (
    <ul role="list" className="flex flex-row py-6 self-center">
      {presentations.map((member: MemberPresentation) => (
        <li key={member.name} className="flex justify-between gap-x-6 px-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              className="h-20 w-20 flex-none rounded-full bg-gray-50"
              src={member.image}
              alt=""
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {member.name}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {member.instrument}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
