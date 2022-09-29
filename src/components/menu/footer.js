import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter, BsTelegram, BsDiscord, BsInstagram, BsYoutube } from 'react-icons/bs';
// import { useBlockchainContext } from '../../context';

const Footer = () => {
    return (
        <footer className="footer-light">
            <div className="container">
                <div>
                    {/* <h3>See what's minting now</h3>
                    <span>
                        <Link to="/create/nft">Explore new collections</Link>
                    </span> */}
                </div>
                <div>
                    <div>
                        <h4>Stay in the loop</h4>
                        <p>
                            Join our mailing list to stay in the loop with our newest feature
                            releases, NFT drops, and tips and tricks for navigating PICASSO.
                        </p>
                        <div className="spacer-10"></div>
                        <span>
                            <input type={'email'} placeholder="Your email address" />
                            <button>Subscribe</button>
                        </span>
                    </div>
                    <div>
                        <h4>Join the community</h4>
                        <div>
                            <span>
                                <a href="/#">
                                    <BsTwitter />
                                </a>
                            </span>
                            <span>
                                <a href="/#">
                                    <BsInstagram />
                                </a>
                            </span>
                            <span>
                                <a href="/#">
                                    <BsDiscord />
                                </a>
                            </span>
                            <span>
                                <a href="/#">
                                    <BsYoutube />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <span className="spacer-40"></span>
                <div>
                    <p>&copy; Copyright {new Date().getFullYear()} All Right Resserved</p>
                    <div></div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
