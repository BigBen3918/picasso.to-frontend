import { Link, useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';

export default function NFTList(props) {
    const { data } = props;
    const navigate = useNavigate();
    const [state, { getCurrency }] = useBlockchainContext();

    const handleItem = (item) => {
        navigate(`/ItemDetail/${item.collectionAddress}/${item.tokenID}`);
    };

    return (
        <div className="row">
            {data.map((nft, index) => (
                <div
                    key={index}
                    className="d-item col-2-5 col-lg-3 col-md-4 col-sm-6 col-xs-12"
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
                                    <button>
                                        {nft.owner.slice(0, 4) + '...' + nft.owner.slice(-4)}
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
        </div>
    );
}
