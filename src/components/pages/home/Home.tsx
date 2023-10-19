import NavBar from "../../navbar/Navbar";
import { BandHeader } from "./BandHeader";
import { MembersPresentation } from "./MembersPresentation";
import { WhoAreWe } from "./WhoAreWe";

export default function Home() {
  return (
    <>
      <main className="bg-gray-400">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col justify-center">
          <BandHeader />
          <WhoAreWe />
          <MembersPresentation />
        </div>
      </main>
    </>
  );
}
