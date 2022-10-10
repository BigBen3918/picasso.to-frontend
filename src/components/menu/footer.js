import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter, BsTelegram, BsDiscord, BsInstagram, BsYoutube } from 'react-icons/bs';
// import { useBlockchainContext } from '../../context';

const Footer = () => {
    return (
        <footer className="footer-light">
            <div className="container">
                <span className="spacer-20"></span>
                <div className="part_1">
                    <div>
                        <h4>Stay in the loop</h4>
                        <p>
                            Join our mailing list to stay in the loop with our newest feature
                            releases, NFT drops, and tips and tricks for navigating PICASSO.
                        </p>
                        <div className="spacer-10"></div>
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
                            <span>
                                <a href="/#">
                                    <BsTelegram />
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <span className="spacer-40"></span>
                <div className="part_2">
                    <div className="row">
                        <div className="col-4">
                            <h5>Marketplace</h5>
                            <span>
                                <Link to="/explore">All NFTs</Link>
                            </span>
                            <span>
                                <Link to="/Collections">All Collections</Link>
                            </span>
                        </div>
                        <div className="col-4">
                            <h5>Resources</h5>
                            <span>
                                <Link to="/create/nft">Minting Now</Link>
                            </span>
                            <span>
                                <Link to="/create/collection">Submit Collection</Link>
                            </span>
                        </div>
                        <div className="col-4">
                            <h5>Support</h5>
                            <span>
                                <a href="#">@picassosupport</a>
                            </span>
                            <span>
                                <a href="#">support@picasso.to</a>
                            </span>
                        </div>
                    </div>
                </div>
                <span className="spacer-40"></span>
                <div className="part_3">
                    <p>&copy; Copyright {new Date().getFullYear()} All Right Resserved</p>
                    <div></div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
