import React from 'react';
import { Link } from 'react-router-dom';
import {
    BsTwitter,
    BsTelegram,
    BsDiscord,
    BsInstagram,
    BsYoutube,
    BsEnvelope
} from 'react-icons/bs';
// import { useBlockchainContext } from '../../context';

const Footer = () => {
    return (
        <footer className="footer-light">
            <div className="container">
                <span className="spacer-20"></span>
                <div className="part_1">
                    <h2>Join the community</h2>
                    <span className="spacer-10"></span>
                    <div>
                        <span>
                            <a href="https://twitter.com/Picasso_FTM">
                                <BsTwitter /> @PICASSO
                            </a>
                        </span>
                        <span>
                            <a href="https://discord.com/invite/pumpkins">
                                <BsDiscord /> Discord
                            </a>
                        </span>
                        <span>
                            <a href="/#">
                                <BsEnvelope /> support@picasso.to
                            </a>
                        </span>
                        <span>
                            <a href="https://t.me/+wkQI-V3vrhowODg0">
                                <BsTelegram /> Telegram
                            </a>
                        </span>
                    </div>
                    <span className="spacer-20"></span>
                </div>
                <span className="spacer-20"></span>
                <div className="part_2">
                    <p>&copy; {new Date().getFullYear()} PICASSO</p>
                    <div>
                        <Link to="/explore">All NFTs</Link>
                        <Link to="/Collections">All Collections</Link>
                        <Link to="/create/nft">Create NFT</Link>
                        <Link to="/create/collection">Submit Collection</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
