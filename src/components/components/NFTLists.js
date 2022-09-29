import { useWallet } from 'use-wallet';
import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBlockchainContext } from '../../context';
import Action from '../../service';

export default function NFTLists(props) {
    const wallet = useWallet();
    const { filter1, filter2, filter3, sortBy } = props;
    const navigate = useNavigate();
    const [state, { getCurrency, translateLang }] = useBlockchainContext();

    const HandleLike = (item) => {
        if (state.auth.address === undefined) {
            wallet.connect();
            // navigate('/signPage');
            return;
        }
        Action.nft_like({
            collectAddress: item.collectionAddress,
            tokenId: item.tokenID,
            currentAddress: state.auth.address
        })
            .then((res) => {
                if (res) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleItem = (item) => {
        navigate(`/ItemDetail/${item.collectionAddress}/${item.tokenID}`);
    };

    const NFTs = useMemo(() => {
        console.log(state.allNFT);
        let res = state.allNFT.filter(filter1).filter(filter2).filter(filter3).sort(sortBy);
        return res;
    }, [state.allNFT, filter1, filter2, filter3, sortBy]);

    return (
        <div className="row">
            {NFTs.map((nft, index) => (
                <div
                    key={index}
                    className="d-item col-lg-3 col-md-4 col-sm-6 col-xs-12"
                    onClick={() => handleItem(nft)}>
                    <div className="nft__item m-0">
                        <div className="nft__item_wrap">
                            <span>
                                <img
                                    src={nft.metadata.image || './img/collections/coll-item-3.jpg'}
                                    className="lazy nft__item_preview"
                                    alt=""
                                />

                                <div className="item__user__info">
                                    <button>0x348d...3ba3</button>

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

                                {nft.marketdata.price !== '' ? (
                                    <button>Buy Now</button>
                                ) : (
                                    <button>Detail</button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* <div
                className="nft__item_like"
                id={'like' + index}
                style={nft.likes.indexOf(state.auth.address) === -1 ? null : { color: '#c5a86a' }}>
                <i className="fa fa-heart"></i>
            </div> */}

            <div className="spacer-30"></div>
            {/* <ul className="pagination">
                <li>
                    <span className="a">Prev</span>
                </li>
                <li className="active">
                    <span className="a">1</span>
                </li>
                <li>
                    <span className="a">2</span>
                </li>
                <li>
                    <span className="a">3</span>
                </li>
                <li>
                    <span className="a">4</span>
                </li>
                <li>
                    <span className="a">5</span>
                </li>
                <li>
                    <span className="a">Next</span>
                </li>
            </ul> */}
        </div>
    );
}
