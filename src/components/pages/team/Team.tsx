import React from "react";
import { NavBar } from "../../navbar/Navbar";

export default function Team() {
  const ref = React.createRef<HTMLDivElement>();
  return (
    <>
      <NavBar index={2} ref={ref} />
      <p>Team</p>
    </>
  );
}
