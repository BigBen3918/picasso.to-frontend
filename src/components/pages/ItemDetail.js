import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../menu/footer';
import moment from 'moment';
import M_itemdetailRedux from '../components/M_ItemdetailRedex';
import { useBlockchainContext } from '../../context';
import BuyModal from '../components/BuyModal';
import { styledAddress } from '../../utils';
import { NotificationManager } from 'react-notifications';
import { useWallet } from 'use-wallet';

export default function Colection() {
    const wallet = useWallet();
    const { id, collection } = useParams();
    const navigate = useNavigate();
    const [state, { buyNFT, cancelOrder, translateLang, bidApprove, getCurrency }] =
        useBlockchainContext();
    const [correctCollection, setCorrectCollection] = useState(null);
    const [pageFlag, setPageFlag] = useState(0); // 1 is mine, 2 is saled mine, 3 is others, 4 is saled others
    const [modalShow, setModalShow] = useState(false);
    const [expireTime, setExpireTime] = useState([]);
    const [timeFlag, setTimeFlag] = useState(true);
    const [loading, setLoading] = useState(false);

    // item data
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        if (itemData !== null)
            if (itemData.marketdata.endTime !== '')
                setInterval(() => {
                    let endTime = moment(Number(itemData.marketdata.endTime));
                    let nowTime = moment(new Date());
                    // test
                    if (endTime < nowTime) setTimeFlag(true);
                    else {
                        let ms = moment(endTime.diff(nowTime));
                        let bump = [];
                        bump.push(Math.floor(moment.duration(ms).asHours() / 24));
                        bump.push(Math.floor(moment.duration(ms).asHours()) % 24);
                        bump.push(moment.utc(ms).format('mm'));
                        bump.push(moment.utc(ms).format('ss'));
                        setExpireTime(bump);
                        setTimeFlag(false);
                    }
                }, 1000);
    }, [itemData]);

    useEffect(() => {
        if (itemData !== null) {
            if (itemData.owner?.toLowerCase() === state.addresses.Marketplace?.toLowerCase()) {
                // on market
                if (!state.auth?.address?.toLowerCase()) {
                    setPageFlag(4);
                    return;
                }
                itemData.marketdata.owner?.toLowerCase() === state.auth?.address?.toLowerCase()
                    ? setPageFlag(2)
                    : setPageFlag(4);
            } else {
                itemData.owner?.toLowerCase() === state.auth?.address?.toLowerCase()
                    ? setPageFlag(1)
                    : setPageFlag(3);
            }
        }
    }, [itemData]);

    useEffect(() => {
        for (let i = 0; i < state.collectionNFT.length; i++) {
            if (state.collectionNFT[i].address === collection) {
                setCorrectCollection(state.collectionNFT[i]);
                var itemData = state.collectionNFT[i].items.find((item) => item.tokenID === id);

                let attributeRarityies = itemData?.metadata?.attributes.map((attribute, index) => {
                    let itemsWithSameAttributes = state.collectionNFT[i].items.filter((item) => {
                        let hasSameAttribute = item.metadata?.attributes.find((itemAttribute) => {
                            if (
                                itemAttribute.key === attribute.key &&
                                itemAttribute.value === attribute.value
                            ) {
                                return true;
                            }
                        });

                        if (hasSameAttribute == -1) {
                            return false;
                        }
                        return true;
                    });

                    return (
                        (itemsWithSameAttributes.length * 100) / state.collectionNFT[i].items.length
                    );
                });

                if (!itemData) navigate('/explorer');
                else setItemData({ ...itemData, attributeRarityies });
                break;
            }
        }
    }, [state.collectionNFT, id, collection]);

    const handleBuy = async () => {
        if (!state.signer) {
            wallet.connect();
            // navigate('/signPage');
            return;
        }
        try {
            setLoading(true);
            await buyNFT({
                nftAddress: itemData?.collectionAddress,
                assetId: itemData?.tokenID,
                price: itemData?.marketdata.price,
                acceptedToken: itemData?.marketdata.acceptedToken
            });
            NotificationManager.success(translateLang('buynft_success'));
            setLoading(false);
        } catch (err) {
            console.log(err.message);
            NotificationManager.error(translateLang('buynft_error'));
            setLoading(false);
        }
    };

    const handleApproveBid = async () => {
        try {
            if (itemData !== null) {
                setLoading(true);
                console.log(itemData.marketdata.bidPrice);

                await bidApprove({
                    address: collection,
                    id: id,
                    price: itemData.marketdata.bidPrice
                });
                NotificationManager.success(translateLang('approve_succeess'));
                setLoading(false);
            }
        } catch (err) {
            console.log(err.message);
            setLoading(false);
            NotificationManager.error(translateLang('approve_error'));
        }
    };

    const handleSell = () => {
        navigate(`/Auction/${collection}/${id}`);
    };

    const handleCancel = async () => {
        if (itemData !== null) {
            setLoading(true);
            try {
                await cancelOrder({
                    nftAddress: collection,
                    assetId: id
                });
                NotificationManager.success(translateLang('cancelorder_success'));

                setLoading(false);
            } catch (err) {
                console.log(err.message);
                NotificationManager.error(translateLang('cancelorder_error'));
                setLoading(false);
            }
        }
    };

    return (
        <div style={{ paddingBottom: '260px' }}>
            <section className="container">
                {correctCollection === null ? (
                    'Loading...'
                ) : (
                    <>
                        <div className="row mt-md-5 pt-md-4">
                            <div className="col-md-5 text-center">
                                <div style={{ position: 'sticky', top: '120px' }}>
                                    <img
                                        src={
                                            itemData?.metadata?.image ||
                                            '../../img/collections/coll-item-3.jpg'
                                        }
                                        className="mb-sm-30 item_image"
                                        alt=""
                                    />
                                    {/* <div className="social-link">
                                        {itemData?.metadata?.external_url1 != '' && (
                                            <a href={itemData?.metadata?.external_url1}>
                                                <i className="fa fa-twitter-square"></i>
                                            </a>
                                        )}
                                        {itemData?.metadata?.external_url2 != '' && (
                                            <a href={itemData?.metadata?.external_url2}>
                                                <i className="fa fa-facebook-square"></i>
                                            </a>
                                        )}
                                        {itemData?.metadata?.external_url3 != '' && (
                                            <a href={itemData?.metadata?.external_url3}>
                                                <i className="fa fa-instagram"></i>
                                            </a>
                                        )}
                                        {itemData?.metadata?.external_url4 != '' && (
                                            <a href={itemData?.metadata?.external_url4}>
                                                <i className="fa fa-pinterest-square"></i>
                                            </a>
                                        )}
                                    </div> */}
                                    <div className="item_info_like">
                                        <div>
                                            <i className="fa fa-heart"></i>
                                            {'  '}
                                            {itemData?.likes?.length}
                                        </div>
                                        <div className="item_author">
                                            <p>{'Owned by'}</p>
                                            <span>
                                                <img
                                                    className="lazy"
                                                    src={
                                                        state.usersInfo[itemData?.owner]?.image ===
                                                        undefined
                                                            ? '../../img/author/author-1.jpg'
                                                            : state.usersInfo[itemData?.owner]
                                                                  .image ||
                                                              '../../img/author/author-1.jpg'
                                                    }
                                                    alt=""
                                                />
                                                <div className="author_list_info">
                                                    <span>{styledAddress(itemData?.owner)}</span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* main panel */}
                            <div className="col-md-7">
                                <div className="item_info">
                                    {/* end time */}
                                    <Link to={`/collection/${correctCollection.address}`}>
                                        {state.collectionNFT.map((item) => {
                                            if (item.address === itemData.collectionAddress)
                                                return item.metadata.name;
                                        })}
                                    </Link>
                                    <h2>{itemData?.metadata?.name || 'unknown'}</h2>
                                    <div className="spacer-10"></div>
                                    <h3>
                                        {itemData?.marketdata?.price === '' ? (
                                            <span style={{ color: 'grey' }}>
                                                Not listed for sale
                                            </span>
                                        ) : (
                                            <span style={{ color: 'grey' }}>
                                                Listed for{' '}
                                                <b style={{ color: 'black' }}>
                                                    {itemData?.marketdata?.price +
                                                        ' ' +
                                                        getCurrency(
                                                            itemData.marketdata?.acceptedToken
                                                        )?.label}
                                                </b>
                                            </span>
                                        )}
                                    </h3>
                                    <p>{itemData?.metadata?.description}</p>
                                    <div>
                                        {itemData === null ? (
                                            'Loading...'
                                        ) : (
                                            <div className="mainside">
                                                {pageFlag === 1 ? (
                                                    <div className="attribute">
                                                        <button
                                                            className="btn-main round-button"
                                                            onClick={handleSell}>
                                                            {translateLang('btn_sell')}
                                                        </button>
                                                    </div>
                                                ) : pageFlag === 2 ? (
                                                    <div>
                                                        {loading ? (
                                                            <button className="btn-main round-button">
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    aria-hidden="true"></span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-main round-button"
                                                                onClick={handleCancel}>
                                                                {translateLang('btn_cancel')}
                                                            </button>
                                                        )}
                                                        {loading ? (
                                                            <button className="btn-main round-button">
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    aria-hidden="true"></span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-main round-button"
                                                                onClick={handleApproveBid}>
                                                                {translateLang('btn_approvebid')}
                                                            </button>
                                                        )}
                                                    </div>
                                                ) : pageFlag === 3 ? null : (
                                                    <div>
                                                        {loading ? (
                                                            <button className="btn-main round-button">
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    aria-hidden="true"></span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-main round-button"
                                                                onClick={handleBuy}>
                                                                {translateLang('btn_buynow')}
                                                            </button>
                                                        )}
                                                        {loading ? (
                                                            <button className="btn-main round-button">
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    aria-hidden="true"></span>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn-main round-button"
                                                                onClick={() => setModalShow(true)}>
                                                                {translateLang('btn_makeoffer')}
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="spacer-40"></div>
                                    <hr />
                                    <div className="spacer-20"></div>
                                    {itemData.marketdata.bidders.length > 0 && (
                                        <p>
                                            Current High Bid{' '}
                                            {itemData?.marketdata?.bidPrices[0] +
                                                ' ' +
                                                itemData?.marketdata?.bidTokens[0]}{' '}
                                            by{' '}
                                            {itemData?.marketdata?.bidders[0].slice(0, 4) +
                                                '...' +
                                                itemData?.marketdata?.bidders[0].slice(-4)}
                                        </p>
                                    )}
                                    {itemData?.marketdata?.endTime === '' ? null : (
                                        <>
                                            <div className="titme_track">
                                                <p>{translateLang('saletime')}</p>
                                                <div>
                                                    {timeFlag ? null : (
                                                        <>
                                                            <h3>{expireTime[0]}d : </h3>
                                                            <h3>{expireTime[1]}h : </h3>
                                                            <h3>{expireTime[2]}m : </h3>
                                                            <h3>{expireTime[3]}s</h3>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="spacer-10"></div>
                                        </>
                                    )}
                                    {itemData?.metadata?.attributes.length > 0 && (
                                        <>
                                            <div className="spacer-10"></div>
                                            <p style={{ fontSize: '20px' }}>Attributes</p>
                                        </>
                                    )}
                                    <div className="de_tab">
                                        <div className="row">
                                            {itemData?.metadata?.attributes.map((item, index) => (
                                                <M_itemdetailRedux
                                                    key={index}
                                                    type={item.key}
                                                    per={item.value}
                                                    percent={
                                                        itemData.attributeRarityies[index] + '%'
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="spacer-10"></div>
                                        {pageFlag === 2 || pageFlag === 4 ? (
                                            <>
                                                <div className="spacer-10"></div>
                                                <p style={{ fontSize: '20px' }}>Bid History</p>
                                                <hr />
                                                <div className="spacer-20"></div>
                                                {itemData.marketdata.bidders.length > 0 ? (
                                                    <div className="de_tab_content">
                                                        <div className="tab-1 onStep fadeIn">
                                                            {itemData?.marketdata?.bidders.map(
                                                                (bidder, index) => (
                                                                    <div className="p_list">
                                                                        <div className="p_list_pp">
                                                                            <span>
                                                                                <img
                                                                                    className="lazy"
                                                                                    src={
                                                                                        state
                                                                                            .usersInfo[
                                                                                            bidder
                                                                                        ]?.image ||
                                                                                        '../../img/author/author-1.jpg'
                                                                                    }
                                                                                    alt=""
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                        <div className="p_list_info">
                                                                            <b>
                                                                                {
                                                                                    itemData
                                                                                        ?.marketdata
                                                                                        ?.bidPrices[
                                                                                        index
                                                                                    ]
                                                                                }{' '}
                                                                                {
                                                                                    itemData
                                                                                        ?.marketdata
                                                                                        ?.bidTokens[
                                                                                        index
                                                                                    ]
                                                                                }
                                                                            </b>{' '}
                                                                            {translateLang('bid')}
                                                                            {translateLang(
                                                                                'by'
                                                                            )}{' '}
                                                                            <b>
                                                                                {styledAddress(
                                                                                    bidder
                                                                                )}
                                                                            </b>{' '}
                                                                            {translateLang('at')}{' '}
                                                                            <b>
                                                                                {itemData
                                                                                    ?.marketdata
                                                                                    ?.bidTime
                                                                                    ? moment(
                                                                                          Number(
                                                                                              itemData
                                                                                                  ?.marketdata
                                                                                                  ?.bidTime[
                                                                                                  index
                                                                                              ]
                                                                                          )
                                                                                      ).format(
                                                                                          'lll'
                                                                                      )
                                                                                    : ''}
                                                                            </b>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    'No bid history'
                                                )}
                                            </>
                                        ) : null}
                                    </div>
                                    <div className="spacer-40"></div>
                                </div>
                            </div>
                        </div>

                        <BuyModal show={modalShow} setShow={setModalShow} correctItem={itemData} />
                    </>
                )}
            </section>

            <Footer />
        </div>
    );
}
