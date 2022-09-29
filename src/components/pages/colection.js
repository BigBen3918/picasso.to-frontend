import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import ColumnZero from '../components/ColumnZero';
import CoulmnOne from '../components/CoulmnOne';
import Footer from '../menu/footer';
import { useBlockchainContext } from '../../context';
import { copyToClipboard } from '../../utils';
import { NotificationManager } from 'react-notifications';
import { BsTwitter, BsFacebook, BsInstagram } from 'react-icons/bs';
import { Tab, Tabs } from 'react-bootstrap';

export default function Collection() {
    const navigate = useNavigate();
    const { collection } = useParams();
    const [state, { translateLang }] = useBlockchainContext();
    const [correctItem, setCorrectItem] = useState(null);
    const [owners, setOwners] = useState([]);
    const [avgAmount, setAvgAmount] = useState(0);
    const [floorPrice, setFloorPrice] = useState(0);
    const [volumn, setVolumn] = useState(0);
    const [option1, setOption1] = useState('OnSaled');

    useEffect(() => {
        if (state.orderList.length !== 0) {
            let bump = 0;
            const currentVolumn = state.orderList.filter((item) => {
                return item.contractAddress === collection && item.status === 'success';
            });
            currentVolumn.map((item) => {
                bump += Number(item.price);
            });
            setVolumn(parseFloat(bump.toFixed(3)));
        }
    }, [state.orderList]);

    useEffect(() => {
        if (!collection) return;
        let itemData;
        state.collectionNFT.map((item) => {
            if (item.address === collection) {
                itemData = item;
            }
        });
        if (!itemData) navigate('/collections');
        setCorrectItem(itemData);
    }, [collection]);

    useEffect(() => {
        if (correctItem !== null) {
            let bump = [];
            let count = 0;
            let sum = 0;
            let floorBump = [];
            for (let i = 0; i < correctItem.items.length; i++) {
                if (bump.indexOf(correctItem.items[i].owner) === -1) {
                    bump.push(correctItem.items[i].owner);
                }
                if (correctItem.items[i].marketdata.price !== '') {
                    floorBump.push(Number(correctItem.items[i].marketdata.price));
                    sum += Number(correctItem.items[i].marketdata.price);
                    count++;
                }
            }
            floorBump.sort();
            if (floorBump.length === 0) setFloorPrice(0);
            else setFloorPrice(parseFloat(floorBump[0].toFixed(3)));
            setOwners(bump);
            setAvgAmount(sum / count / 1000);
        }
    }, [correctItem]);

    const handleaddressCopy = () => {
        copyToClipboard(correctItem.address)
            .then((res) => {
                NotificationManager.success(translateLang('addresscopy_success'));
            })
            .catch((err) => {
                NotificationManager.error(translateLang('operation_error'));
            });
    };

    return (
        <div style={{ paddingBottom: '500px' }}>
            <section
                id="profile_banner"
                className="jumbotron breadcumb no-bg"
                style={{
                    backgroundImage: `url(${correctItem?.metadata?.coverImage})`
                }}>
                <div className="mainbreadcumb"></div>
            </section>

            {correctItem !== null ? (
                <div>
                    <section className="container d_coll no-top no-bottom">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="profile_avatar">
                                    <div className="d_profile_img">
                                        <img src={correctItem.metadata.image} alt="" />
                                    </div>

                                    <div className="profile_name">
                                        <h4>
                                            <h2>{correctItem.metadata.name}</h2>
                                            <span id="wallet" className="profile_wallet">
                                                <span>
                                                    {correctItem.address.slice(0, 20) + '...'}
                                                </span>
                                                <button
                                                    id="btn_copy"
                                                    title="Copy Text"
                                                    onClick={handleaddressCopy}>
                                                    <FaRegCopy />
                                                </button>
                                            </span>
                                        </h4>
                                        <div>
                                            {correctItem.metadata?.external_url1 != '' && (
                                                <a href={correctItem.metadata?.external_url1}>
                                                    <BsTwitter />
                                                </a>
                                            )}
                                            {correctItem.metadata?.external_url2 != '' && (
                                                <a href={correctItem.metadata?.external_url2}>
                                                    <BsFacebook />
                                                </a>
                                            )}
                                            {correctItem.metadata?.external_url3 != '' && (
                                                <a href={correctItem.metadata?.external_url3}>
                                                    <BsInstagram />
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <div className="collection_info">
                                        {/* <p className="text-center">
                                                {translateLang('by')}{' '}
                                                <b className="color">CLOUD9</b>
                                            </p> */}
                                        <div className="spacer-10"></div>
                                        <span>
                                            <div>
                                                <h3>{correctItem.items.length}</h3>
                                                <p>{translateLang('items')}</p>
                                            </div>
                                            <div>
                                                <h3>{owners.length}</h3>
                                                <p>{translateLang('owners')}</p>
                                            </div>
                                            <div>
                                                <h3>{volumn}</h3>
                                                <p>{'Volumn'}</p>
                                            </div>
                                            <div>
                                                <h3>{floorPrice}</h3>
                                                <p>{'Floor'}</p>
                                            </div>
                                            {/* <div>
                                                    <h3>
                                                        {isNaN(avgAmount)
                                                            ? 0
                                                            : avgAmount.toFixed(2)}
                                                        K
                                                    </h3>
                                                    <p>{translateLang('prices')}</p>
                                                </div> */}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="container no-top">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="items_filter">
                                    <Tabs
                                        activeKey={option1}
                                        onSelect={(k) => {
                                            setOption1(k);
                                        }}
                                        className="mb-3">
                                        <Tab eventKey="OnSaled" title="OnSaled">
                                            <div className="spacer-20"></div>
                                            <ColumnZero correctItem={correctItem} />
                                        </Tab>
                                        <Tab eventKey="Owned" title="Owned">
                                            <div className="spacer-20"></div>
                                            <CoulmnOne correctItem={correctItem} />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            ) : (
                'Loading...'
            )}

            <Footer />
        </div>
    );
}
