import React, { useMemo, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { useBlockchainContext } from '../../context';
import Action from '../../service';

const Outer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
`;

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

export default function ColumnZero(props) {
    const navigate = useNavigate();
    const { correctItem } = props;
    const [state, { getCurrency }] = useBlockchainContext();
    const [filter, setFilter] = useState(null);

    const NFTs = useMemo(() => {
        if (!filter)
            return correctItem.items.filter(
                (item) => item.owner.toLowerCase() === state.addresses.Marketplace.toLowerCase()
            );
        else {
            return correctItem.items.filter(
                (item) => item.owner.toLowerCase() === state.addresses.Marketplace.toLowerCase()
            );
        }
    }, [correctItem, filter]);

    const handleItem = (item) => {
        navigate(`/ItemDetail/${item.collectionAddress}/${item.tokenID}`);
    };

    return (
        <Reveal className="onStep" keyframes={fadeInUp} delay={300} duration={600}>
            <div className="row">
                {NFTs.length > 0 ? (
                    NFTs.map((nft, index) => (
                        <div
                            key={index}
                            className="d-item col-2-5 col-lg-3 col-md-6 col-sm-6 col-xs-12"
                            onClick={() => handleItem(nft)}>
                            <div className="nft__item">
                                <div className="nft__item_wrap">
                                    <span>
                                        <img
                                            src={nft.metadata.image}
                                            className="lazy nft__item_preview"
                                            alt=""
                                        />

                                        <div className="item__user__info">
                                            <button>
                                                {nft.owner.slice(0, 4) +
                                                    '...' +
                                                    nft.owner.slice(-4)}
                                            </button>

                                            <button>
                                                <i className="fa fa-heart-o"></i>
                                            </button>
                                        </div>
                                    </span>
                                </div>
                                <div className="nft__item_info">
                                    <div className="spacer-20"></div>
                                    <span>
                                        <Link to={`/collection/${nft.collectionAddress}`}>
                                            {state.collectionNFT.map((item) => {
                                                if (item.address === nft.collectionAddress)
                                                    return item.metadata.name;
                                            })}
                                        </Link>
                                    </span>
                                    <span>
                                        <h4>{nft.metadata.name || `#${nft.tokenID}`}</h4>
                                    </span>
                                    <div className="spacer-20"></div>
                                    <hr />
                                    <div className="spacer-10"></div>
                                    <div className="nft__item_price">
                                        <span>
                                            {nft.marketdata.price === '' ? (
                                                <div className="spacer-20"></div>
                                            ) : (
                                                nft.marketdata.price +
                                                ' ' +
                                                getCurrency(nft.marketdata.acceptedToken)?.label
                                            )}
                                        </span>

                                        <button>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
                )}
            </div>
        </Reveal>
    );
}
