import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';

export default function MyNFTs(props) {
    const navigate = useNavigate();
    const { address } = props;
    const [state, {}] = useBlockchainContext();

    const mynfts = useMemo(() => {
        return state.allNFT.filter((item) => {
            if (item.owner === address || item.marketdata.owner === address) {
                return item;
            }
        });
    }, [state.allNFT, address]);

    const handleItem = (item) => {
        navigate(`/ItemDetail/${item.collectionAddress}/${item.tokenID}`);
    };

    return (
        <div className="row">
            {mynfts !== null && mynfts.length !== 0 ? (
                mynfts.map((nft, index) => (
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
                                </span>
                            </div>
                            <div className="nft__item_info">
                                <div className="spacer-10"></div>
                                <span>
                                    <a>
                                        {state.collectionNFT.map((item) => {
                                            if (item.address === nft.collectionAddress)
                                                return item.metadata.name;
                                        })}
                                    </a>
                                </span>
                                <span>
                                    <h4>{nft.metadata.name}</h4>
                                </span>
                                <div className="spacer-20"></div>
                                <hr />
                                <div className="spacer-single"></div>
                                <div className="nft__item_like" style={{ color: '#c5a86a' }}>
                                    <i className="fa fa-heart"></i>
                                    <span>{nft.likes.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}
        </div>
    );
}
