import React from "react";
import { NavBar } from "../../navbar/Navbar";

export default function Projects() {
  const ref = React.createRef<HTMLDivElement>();
  return (
    <>
      <NavBar index={1} ref={ref} />
      <p>Projects</p>
    </>
  );
}
