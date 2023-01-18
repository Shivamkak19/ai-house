import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

import './navbar.css'

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const header = [
    {
      content: ['<p> AI<span style="color: #ff0;">@</span><span style="color: #f1883d;">PRINCETON</span> </p>']
    }
  ];

  return (
    <><div className='site__navbar'>
      <div className='site__navbar-links'>
        <div className='site__navbar-links_logo'>
          {header[0].content.map(paragraph =>
            (<p dangerouslySetInnerHTML={{ __html: paragraph }} />)
          )}
        </div>
        <div className='site__navbar-links_container'>
          <p><a href="#home"> Home </a></p>
          <p><a href="#about"> About </a></p>
          <p><a href="#next"> Our Plans </a></p>
          <p><a href="#timeline"> Timeline </a></p>
          <p><a href="#join"> Join </a></p>
        </div>
      </div>
    </div><div className='site__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="site__navbar-menu_container scale-up-center">
            <div className="site__navbar-menu_container-links">
              <p><a href="#home"> Home </a></p>
              <p><a href="#about"> About </a></p>
              <p><a href="#next"> Our Plans </a></p>
              <p><a href="#timeline"> Timeline </a></p>
              <p><a href="#join"> Join </a></p>
            </div>
          </div>
        )}
      </div></>
  );
}

export default Navbar