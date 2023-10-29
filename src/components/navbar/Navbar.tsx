import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import PolyMazeIcon from "../../assets/images/polymaze_logo.png";
import { useNavigate } from "react-router-dom";
import SpotifyLogo from "../../assets/images/spotify_logo.png";
import YoutubeLogo from "../../assets/images/youtube_logo.png";
import InstagramLogo from "../../assets/images/instagram_logo.svg";

import paths from "../../constants/paths.json";
import { ForwardedRef, forwardRef } from "react";

interface NavBarProps {
  index: number;
}

const navigation = [
  { name: "Accueil", href: paths.root, current: true },
  { name: "Nos Projets", href: paths.projects, current: false },
  { name: "Team", href: paths.team, current: false },
  { name: "Contacter", href: paths.contact, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  (props: NavBarProps, ref: ForwardedRef<HTMLDivElement>) => {
    const navigate = useNavigate();
    return (
      <Disclosure
        as="nav"
        className="bg-black bg-opacity-80 flex-none absolute top-0 left-0 w-full"
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8" ref={ref}>
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto hover:bg-gray-700 rounded-md p-2"
                      src={PolyMazeIcon}
                      onClick={() => navigate(navigation[0].href)}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:flex sm:flex-1 sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item, position) => (
                        <a
                          key={item.name}
                          href={"#" + item.href}
                          className={classNames(
                            position == props.index
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-60 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium bg-opacity-60"
                          )}
                          aria-current={
                            position == props.index ? "page" : undefined
                          }
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:justify-end">
                    <a
                      className="px-2 flex rounded-md h-full align-middle hover:bg-gray-700 hover:bg-opacity-60"
                      href="https://open.spotify.com/intl-fr/artist/3Na8vjbjF6idXfqYNNkgWg"
                      target="_blank"
                    >
                      <img className="m-auto  w-6" src={SpotifyLogo} />
                    </a>
                    <a
                      className="px-2 flex rounded-md h-full align-middle hover:bg-gray-700 hover:bg-opacity-60"
                      href="https://www.youtube.com/channel/UC3WL9tVLviLhWUlwqX02GhQ"
                      target="_blank"
                    >
                      <img className="m-auto w-6" src={YoutubeLogo} />
                    </a>
                    <a
                      className="px-2 flex rounded-md h-full align-middle hover:bg-gray-700 hover:bg-opacity-60"
                      href="https://www.instagram.com/polymaze.music/"
                      target="_blank"
                    >
                      <img className="m-auto  w-6" src={InstagramLogo} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden absolute bg-black bg-opacity-90 w-full">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item, position) => {
                  return (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={() => {
                        navigate(item.href);
                      }}
                      className={classNames(
                        position == props.index
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-60 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium bg-opacity-60"
                      )}
                      aria-current={
                        position == props.index ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
);
