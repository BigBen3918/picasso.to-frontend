import React from 'react';
import { Link } from 'react-router-dom';
import { BsTwitter, BsTelegram, BsDiscord } from 'react-icons/bs';
// import { useBlockchainContext } from '../../context';

const Footer = () => {
    return (
        <footer className="footer-light">
            <div className="container">
                <div>
                    <h3>See what's minting now</h3>
                    <span>
                        <Link to="/create/nft">Explore new collections</Link>
                    </span>
                </div>
                <div>
                    <p>&copy; Copyright {new Date().getFullYear()} All Right Resserved</p>
                    <div>
                        <a href="/#">
                            <BsTwitter />
                        </a>
                        <a href="/#">
                            <BsDiscord />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
