import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav() {
    const links = ['Home', 'Popular', 'Battle'];
    return (
        <nav>
            <ul className='nav'>
                {links.map((link, index) =>
                    <li key={index}>
                        <NavLink exact to={link === 'Home' ? '/' : link.toLowerCase()}>
                            {link}
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Nav;
