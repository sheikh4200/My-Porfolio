import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import React from "react";
import LiveClock from "./DateAndTime";

const NavBar = () => {
  return (
    <nav>
      <div >
        <img src="/images/logo.svg" alt="logo" width={20} />
        <p className="font-semibold">Rizwan's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
      
            </ul>
            </div>
          <div>
            <ul>
             {navIcons.map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt="icons" className="icon-hover" />
              </li>
            ))}
         </ul>
         <LiveClock/>
          </div>
    </nav>
  );
};

export default NavBar;
