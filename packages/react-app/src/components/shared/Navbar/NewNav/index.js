import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
  FaFileUpload,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { GiDoctorFace, GiDna2 } from "react-icons/gi";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./style.css";
const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome size={20} />,
  },
  {
    path: "/upload",
    name: "Upload",
    icon: <FaFileUpload size={20} />,
  },
  {
    path: "/myreports",
    name: "My Reports",
    icon: <AiTwotoneFileExclamation size={20} />,
  },
  {
    path: "/register",
    name: "Registerr",
    icon: <GiDoctorFace size={20} />,
  },
  {
    path: "/search",
    name: "Search",
    icon: <BiSearch size={20} />,
  },
  {
    path: "/research",
    name: "Research",
    icon: <GiDna2 size={20} />,
  },
//   {
//     path: "/settings",
//     name: "Settings",
//     icon: <BiCog size={20} />,
//     exact: true,
//     subRoutes: [
//       {
//         path: "/settings/profile",
//         name: "Profile ",
//         icon: <FaUser />,
//       },
//       {
//         path: "/settings/2fa",
//         name: "2FA",
//         icon: <FaLock />,
//       },
//       {
//         path: "/settings/billing",
//         name: "Billing",
//         icon: <FaMoneyBill />,
//       },
//     ],
//   },
//   {
//     path: "/saved",
//     name: "Saved",
//     icon: <AiFillHeart size={20} />,
//   },
];

const NewNav = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container hidden sm:block ">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar overflow-x-hidden `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Docthereum
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default NewNav;
