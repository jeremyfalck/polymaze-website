export interface SocialMediaLinkProps {
  url: string;
  logo: string;
}

const SocialMediaLink = ({ url, logo }: SocialMediaLinkProps) => (
  <a
    className="px-2 flex rounded-md h-full align-middle hover:bg-gray-700 hover:bg-opacity-60"
    href={url}
    target="_blank"
    rel="noreferrer noopener"
  >
    <img className="m-auto w-6" alt="Social Media" src={logo} />
  </a>
);

export default SocialMediaLink;
