import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaFileMedicalAlt } from "react-icons/fa";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import useDarkMode from "../../hooks/useDarkMode";
import { useEthers } from "@usedapp/core";
import { NavLink } from "react-router-dom";
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Upload", href: "/upload", current: false },
  { name: "My Reports", href: "/myreports", current: false },
  { name: "Register", href: "/register", current: false },
  { name: "Search", href: "/search", current: false },
  { name: "Research", href: "/research", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(props) {
  const [theme, setTheme] = useDarkMode();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <Disclosure
      as="nav"
      className="bg-white/[0.25] dark:bg-black/[0.25] filter backdrop-blur-sm absolute w-screen top-0 left-0 z-20"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <ImCross className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <GiHamburgerMenu
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <FaFileMedicalAlt
                    className="h-6 w-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                  />
                  <p className="text-gray-800 dark:text-white pl-1 md:pl-3 text-[24px]">
                    <span className="font-medium text-[#0ac5a8]">Doc</span>
                    <span className="font-light">thereum</span>
                  </p>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <NavLink
                        onClick={() => setCurrentPage(index)}
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          currentPage === index
                            ? "bg-gray-900 text-white"
                            : "dark:text-gray-300 text-gray-700 hover:bg-gray-700 hover:text-white",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {props.children}
                <button
                  type="button"
                  className="bg-[#0AC5A8] p-1 rounded-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {theme === "dark" ? (
                    <BsFillMoonFill
                      onClick={() => setTheme(theme)}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <BsFillSunFill
                      onClick={() => setTheme(theme)}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-300 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://www.avatarsinpixels.com/Public/images/previews/minipix4.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  {account && (
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={() => {
                                if (account) {
                                  deactivate();
                                }
                              }}
                            >
                              Sign out
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="a"
                className={classNames(
                  "text-gray-700 hover:bg-gray-700 hover:text-white",
                  "block px-3 py-2 rounded-md text-base font-medium"
                )}
              >
                Connect Wallet
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
