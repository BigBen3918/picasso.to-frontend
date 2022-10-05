import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { FaCog, FaShareAlt, FaTwitter, FaFacebook, FaCopy } from 'react-icons/fa';

import MyNFT from '../components/mynfts';
import Profile from '../components/profile';
import Footer from '../menu/footer';
import { createGlobalStyle } from 'styled-components';
import Jazzicon from 'react-jazzicon';
import { useBlockchainContext } from '../../context';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: "#212428";
  }
`;

export default function Author() {
    const [state, { translateLang }] = useBlockchainContext();
    const [openMenu, setOpenMenu] = useState('collected');
    const [openShare, setOpenShare] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copy');

    const HandleCopy = () => {
        console.log('clicked');
    };

    const HandleAddressCopy = () => {
        setCopyStatus('Copied');

        setTimeout(() => {
            setCopyStatus('Copy');
        }, 2000);
    };

    return (
        <div style={{ paddingBottom: '500px' }}>
            <GlobalStyles />

            <div className="profile_image">
                <img src="img/background/1.jpg" alt="" />
                <div>
                    {state.auth.image ? (
                        <img src={state.auth.image || ''} alt="" />
                    ) : (
                        <Jazzicon
                            diameter={100}
                            seed={Math.round(
                                (Number(state.auth.address) /
                                    Number('0xffffffffffffffffffffffffffffffffffffffffff')) *
                                    10000000
                            )}
                        />
                    )}
                </div>
            </div>
            <div className="container">
                <div className="spacer-40"></div>
                <div className="profile_name">
                    <div>
                        <h2>{state.auth.name}</h2>
                        <div
                            onBlur={() =>
                                setTimeout(() => {
                                    setOpenShare(false);
                                }, 100)
                            }>
                            <button onClick={() => setOpenShare(!openShare)}>
                                <FaShareAlt />
                            </button>
                            <button>
                                <FaCog />
                            </button>
                            {openShare && (
                                <div>
                                    <span>
                                        <span onClick={HandleCopy}>
                                            <FaCopy />
                                            <p>Copy Link</p>
                                        </span>
                                        <a href="#">
                                            <FaFacebook />
                                            <p>Share on Facebook</p>
                                        </a>
                                        <a href="#">
                                            <FaTwitter />
                                            <p>Share on Twitter</p>
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="profile_wallet">
                        <div onClick={HandleAddressCopy}>
                            <span>{copyStatus}</span>
                            {state.auth.address.slice(0, 6) + '...' + state.auth.address.slice(-4)}
                        </div>
                    </span>
                    <span className="profile_username">
                        {state.auth.bio === '' ? '' : state.auth.bio}
                    </span>
                </div>
                <div className="spacer-20"></div>
            </div>

            <section className="container no-top">
                <Tabs
                    activeKey={openMenu}
                    onSelect={(k) => {
                        setOpenMenu(k);
                    }}
                    className="mb-3">
                    <Tab eventKey="collected" title="Collected">
                        <div className="spacer-20"></div>
                        <div id="zero0" className="onStep fadeIn">
                            <MyNFT />
                        </div>
                    </Tab>
                    <Tab eventKey="forsale" title="For sale">
                        <div className="spacer-20"></div>
                        <div id="zero1" className="onStep fadeIn">
                            <Profile />
                        </div>
                    </Tab>
                </Tabs>
            </section>

            <Footer />
        </div>
    );
}
