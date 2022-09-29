import { useEffect, useState } from 'react';
// import SliderCarousel from '../components/SliderCarouselsingle';
// import FeatureBox from '../components/FeatureBox';
import CarouselCollection from '../components/CarouselCollection';
import Footer from '../menu/footer';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: white;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(0,0,0, .3);
  }
  header#myHeader.navbar .search #quick_search{
    color: $color;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader .dropdown-toggle::after{
    color: $color;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

export default function Homethree() {
    const navigate = useNavigate();
    const [state, { translateLang, getCurrency }] = useBlockchainContext();
    const [floorPrice, setFloorPrice] = useState(0);

    useEffect(() => {
        let bump = [];
        state.collectionNFT.map((collectionItem) => {
            let floorBump = [];
            for (let i = 0; i < collectionItem.items.length; i++) {
                if (collectionItem.items[i].marketdata.price !== '') {
                    floorBump.push(Number(collectionItem.items[i].marketdata.price));
                }
            }
            floorBump.sort();
            if (floorBump.length === 0) bump.push(0);
            else bump.push(parseFloat(floorBump[0].toFixed(2)));
        });
        setFloorPrice(bump);
    }, [state.collectionNFT]);

    const handleClick = (nft) => {
        navigate(`/ItemDetail/${nft.collectionAddress}/${nft.tokenID}`);
    };

    return (
        <div style={{ paddingBottom: '260px' }}>
            <GlobalStyles />
            <section className="jumbotron no-bg">
                <div className="container">
                    <div className="row align-items-center slider-content">
                        <div className="col-lg-12">
                            <div className="spacer-single"></div>
                            <Reveal
                                className="onStep"
                                keyframes={fadeInUp}
                                delay={800}
                                duration={900}
                                triggerOnce>
                                <Link to="/explore" className="btn-main lead">
                                    {translateLang('explore')}
                                </Link>
                                <div className="spacer-20"></div>
                            </Reveal>
                            <Reveal
                                className="onStep"
                                keyframes={fadeInUp}
                                delay={300}
                                duration={600}
                                triggerOnce>
                                <h1 className="">{translateLang('home_txt1')}</h1>
                            </Reveal>
                            <Reveal
                                className="onStep"
                                keyframes={fadeInUp}
                                delay={600}
                                duration={600}
                                triggerOnce>
                                <p className=" lead">{translateLang('home_txt2')}</p>
                            </Reveal>
                            <div className="spacer-30"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container no-top">
                <div className="container no-top">
                    <div className="row">
                        <div className="col-lg-12 px-0">
                            <Reveal
                                className="onStep"
                                keyframes={fadeInUp}
                                delay={900}
                                duration={800}
                                triggerOnce>
                                <CarouselCollection />
                            </Reveal>
                        </div>
                    </div>
                </div>
                <div className="spacer-double"></div>
            </section>

            <section className="container no-top">
                <h2 className="style-2">Top collections</h2>
                <div className="spacer-20"></div>
                <div className="row top_collection">
                    {state.collectionNFT.slice(0, 15).map((item, index) => (
                        <div className="col-md-6 col-lg-4">
                            <Link to={`/collection/${item.address}`}>
                                <div className="top_coll_item">
                                    <p>{index + 1}</p>
                                    <img src={item.metadata.image} alt="" />
                                    <div>
                                        <h4>
                                            {item.metadata.name.length > 25
                                                ? item.metadata.name.slice(0, 10) + '...'
                                                : item.metadata.name}
                                        </h4>
                                        <p>
                                            {item.items.length} items * {floorPrice[index]} ETH
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="spacer-double"></div>
            </section>

            <section className="container no-top">
                <h2 className="style-2">{'Discover the latest'}</h2>
                <div className="row">
                    {state.allNFT
                        .filter((item) => {
                            return item.marketdata.price !== '';
                        })
                        .slice(0, 4)
                        .map((nft, index) => (
                            <div
                                key={index}
                                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                <div className="nft__item" onClick={() => handleClick(nft)}>
                                    <div className="nft__item_wrap">
                                        <span>
                                            <img
                                                src={nft.metadata.image}
                                                className="lazy nft__item_preview"
                                                alt=""
                                            />
                                        </span>
                                    </div>
                                    <div className="nft__item_info">
                                        <div className="spacer-10"></div>
                                        <span>
                                            {state.collectionNFT.map((item) => {
                                                if (item.address === nft.collectionAddress)
                                                    return item.metadata.name;
                                            })}
                                        </span>
                                        <span>
                                            <h4>{nft.metadata.name}</h4>
                                        </span>
                                        <div className="spacer-20"></div>
                                        <hr />
                                        <div className="spacer-20"></div>
                                        <div className="nft__item_price">
                                            {nft.marketdata.price === ''
                                                ? null
                                                : nft.marketdata.price +
                                                  ' ' +
                                                  getCurrency(nft.marketdata.acceptedToken)?.label}
                                        </div>
                                        <div
                                            className="nft__item_like"
                                            id={'like' + index}
                                            style={
                                                nft.likes.indexOf(state.auth.address) === -1
                                                    ? null
                                                    : { color: '#c5a86a' }
                                            }>
                                            <i className="fa fa-heart"></i>
                                            <span>{nft.likes.length}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
