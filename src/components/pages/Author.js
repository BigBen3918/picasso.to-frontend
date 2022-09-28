import React, { useEffect, useState } from 'react';

import MyNFT from '../components/mynfts';
import Profile from '../components/profile';
import Footer from '../menu/footer';
import { createGlobalStyle } from 'styled-components';
import { useBlockchainContext } from '../../context';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: "#212428";
  }
`;

export default function Author() {
    const [state, { translateLang }] = useBlockchainContext();
    const [openMenu, setOpenMenu] = useState(0);

    const handleBtnClick = () => {
        setOpenMenu(0);
        document.getElementById('Mainbtn0').classList.add('active');
        document.getElementById('Mainbtn1').classList.remove('active');
    };
    const handleBtnClick1 = () => {
        setOpenMenu(1);
        document.getElementById('Mainbtn0').classList.remove('active');
        document.getElementById('Mainbtn1').classList.add('active');
    };

    return (
        <div style={{ paddingBottom: '260px' }}>
            <GlobalStyles />

            <section className="container no-bottom">
                <div className="row">
                    <div className="spacer-double"></div>
                    <div className="col-md-12">
                        <div className="d_profile de-flex">
                            <div className="de-flex-col">
                                <div className="profile_avatar">
                                    <img
                                        src={state.auth.image || 'img/author/author-1.jpg'}
                                        alt=""
                                    />
                                    <div className="profile_name">
                                        <h4>
                                            {state.auth.name}
                                            <span className="profile_username">
                                                {state.auth.email === ''
                                                    ? 'unknown'
                                                    : state.auth.email}
                                            </span>
                                            <span id="wallet" className="profile_wallet">
                                                {state.auth.address.slice(0, 20) + '...'}
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container no-top">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="items_filter">
                            <ul className="de_nav text-left">
                                <li id="Mainbtn0" className="active">
                                    <span onClick={handleBtnClick}>{translateLang('mynft')}</span>
                                </li>
                                <li id="Mainbtn1">
                                    <span onClick={handleBtnClick1}>
                                        {translateLang('profile')}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {openMenu === 0 && (
                    <div id="zero0" className="onStep fadeIn">
                        <MyNFT />
                    </div>
                )}
                {openMenu === 1 && (
                    <div id="zero1" className="onStep fadeIn">
                        <Profile />
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
