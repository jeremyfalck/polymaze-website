import React from "react";
import { NavBar } from "../../navbar/Navbar";

export default function Contact() {
  const ref = React.createRef<HTMLDivElement>();
  return (
    <>
      <NavBar index={3} ref={ref} />
      <p>Contact</p>
    </>
  );
}
