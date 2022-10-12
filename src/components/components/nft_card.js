import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useBlockchainContext } from '../../context';

export default function NFTCard(props) {
    const { nftdata } = props;
    const [state, { getCurrency }] = useBlockchainContext();
    const navigate = useNavigate();

    const nft = useMemo(() => {
        return nftdata;
    }, []);

    const convertImageURLToBlob = async (imageInputURL) => {
        const blobImage = window
            .fetch(imageInputURL)
            .then((res) => res.blob()) // Gets the response and returns it as a blob
            .then((blob) => {
                // Here's where you get access to the blob
                // And you can use it for whatever you want
                // Like calling ref().put(blob)
                return blob;
            });
        return blobImage;
    };

    const handleItem = (item) => {
        navigate(`/ItemDetail/${item.collectionAddress}/${item.tokenID}`);
    };

    return (
        <div
            className="d-item col-2-5 col-lg-3 col-md-4 col-sm-6 col-xs-12"
            onClick={() => handleItem(nft)}>
            <div className="nft__item m-0">
                <div className="nft__item_wrap">
                    <span>
                        <img
                            src={
                                nft.metadata.coverImage ||
                                nft.metadata.image ||
                                './img/collections/coll-item-3.jpg'
                            }
                            className="lazy nft__item_preview"
                            loading="lazy"
                            alt=""
                        />
                        <div className="item__user__info">
                            <button>{nft.owner.slice(0, 4) + '...' + nft.owner.slice(-4)}</button>

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
    );
}
