import React, { useState, useMemo, useLayoutEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { FaCog, FaShareAlt, FaTwitter, FaFacebook, FaCopy } from 'react-icons/fa';

import MyNFT from '../components/mynfts';
import SaledNFTs from '../components/salednft';
import Acitivity from './Activity';
import Footer from '../menu/footer';
import { createGlobalStyle } from 'styled-components';
import Jazzicon from 'react-jazzicon';
import { useBlockchainContext } from '../../context';
import { copyToClipboard } from '../../utils';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: "#212428";
  }
`;

export default function Author() {
    const { address } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [state] = useBlockchainContext();
    const [openMenu, setOpenMenu] = useState('forsale');
    const [openShare, setOpenShare] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copy');
    const [ownFlag, setOwnFlag] = useState(false);

    useLayoutEffect(() => {
        if (address === state.auth.address) setOwnFlag(true);
        else setOwnFlag(false);
    }, [address, state.auth.address]);

    const activitiesData = useMemo(() => {
        return state.activities.filter((item) => {
            if (item.userAddress === address) {
                return item;
            }
        });
    }, [address, state.activities]);

    const HandleCopy = () => {
        copyToClipboard(process.env.REACT_APP_DOMAIN + location.pathname)
            .then((res) => {
                console.log('copied');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const HandleAddressCopy = () => {
        copyToClipboard(address)
            .then((res) => {
                setCopyStatus('Copied');

                setTimeout(() => {
                    setCopyStatus('Copy');
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div style={{ paddingBottom: '500px' }}>
            <GlobalStyles />

            <div className="profile_image">
                {state.usersInfo[address]?.bannerImage ? (
                    <img src={state.usersInfo[address]?.bannerImage} alt="" />
                ) : (
                    <>
                        <img
                            src="img/background/bg-shape-1.png"
                            alt=""
                            style={{
                                backgroundColor: `rgb(${
                                    Math.round(
                                        (Number(address) /
                                            Number(
                                                '0xffffffffffffffffffffffffffffffffffffffffff'
                                            )) *
                                            1000000
                                    ) % 255
                                }, ${
                                    Math.round(
                                        (Number(address) /
                                            Number(
                                                '0xffffffffffffffffffffffffffffffffffffffffff'
                                            )) *
                                            1000000
                                    ) % 200
                                }, ${
                                    Math.round(
                                        (Number(address) /
                                            Number(
                                                '0xffffffffffffffffffffffffffffffffffffffffff'
                                            )) *
                                            1000000
                                    ) % 150
                                })`
                            }}
                        />
                    </>
                )}
                <div>
                    {state.usersInfo[address]?.image ? (
                        <img src={state.usersInfo[address]?.image || ''} alt="" />
                    ) : (
                        <Jazzicon
                            diameter={100}
                            seed={Math.round(
                                (Number(address) /
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
                        <h2>{state.usersInfo[address]?.name || 'unknown'}</h2>
                        <div
                            onBlur={() =>
                                setTimeout(() => {
                                    setOpenShare(false);
                                }, 100)
                            }>
                            <button onClick={() => setOpenShare(!openShare)}>
                                <FaShareAlt />
                            </button>
                            {ownFlag && (
                                <button onClick={() => navigate('/account/profile')}>
                                    <FaCog />
                                </button>
                            )}
                            {openShare && (
                                <div>
                                    <span>
                                        <span onClick={HandleCopy}>
                                            <FaCopy />
                                            <p>Copy Link</p>
                                        </span>
                                        {state.usersInfo[address]?.link2 && (
                                            <a href={state.usersInfo[address]?.link2}>
                                                <FaFacebook />
                                                <p>Share on Facebook</p>
                                            </a>
                                        )}
                                        {state.usersInfo[address]?.link1 && (
                                            <a href={state.usersInfo[address]?.link1}>
                                                <FaTwitter />
                                                <p>Share on Twitter</p>
                                            </a>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="profile_wallet">
                        <div onClick={HandleAddressCopy}>
                            <span>{copyStatus}</span>
                            {address.slice(0, 6) + '...' + address.slice(-4)}
                        </div>
                    </span>
                    <span className="profile_username">
                        {state.usersInfo[address]?.bio === '' ? '' : state.usersInfo[address]?.bio}
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
                    <Tab eventKey="forsale" title="For sale">
                        <div className="spacer-20"></div>
                        <div id="zero0" className="onStep fadeIn">
                            <SaledNFTs address={address} />
                        </div>
                    </Tab>
                    <Tab eventKey="collected" title="Collected">
                        <div className="spacer-20"></div>
                        <div id="zero1" className="onStep fadeIn">
                            <MyNFT address={address} />
                        </div>
                    </Tab>
                    <Tab eventKey="activity" title="Activity">
                        <div className="spacer-20"></div>
                        <div id="zero2" className="onStep fadeIn">
                            {activitiesData.length > 0 ? (
                                <Acitivity activitiesData={activitiesData} />
                            ) : (
                                <h1 style={{ textAlign: 'center', padding: '73px' }}>
                                    No items to display
                                </h1>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </section>

            <Footer />
        </div>
    );
}
