import paths from "../constants/paths.json";

const LegalLink = () => (
  <footer className="py-6 text-center text-sm">
    <a
      href={"#" + paths.legal}
      className="text-gray-400 hover:text-white underline"
    >
      Mentions légales
    </a>
  </footer>
);

export default LegalLink;
