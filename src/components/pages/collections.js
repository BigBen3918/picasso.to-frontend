import { useState, useEffect } from 'react';
import Footer from '../menu/footer';
import { useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';

export default function Collections() {
    const [state, { translateLang }] = useBlockchainContext();
    const navigate = useNavigate();
    const [floorPrice, setFloorPrice] = useState(0);
    const [volumns, setVolumns] = useState([]);

    useEffect(() => {
        if (state.orderList.length !== 0) {
            let bump = 0;
            let bumpArr = [];
            state.collectionNFT.map((collectionItem) => {
                const currentVolumn = state.orderList.filter((item) => {
                    return item.contractAddress === collectionItem && item.status === 'success';
                });

                currentVolumn.map((item) => {
                    bump += Number(item.price);
                });
                bumpArr.push(parseFloat(bump.toFixed(3)));
            });

            setVolumns(bumpArr);
        }
    }, [state.orderList]);

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
            else bump.push(parseFloat(floorBump[0].toFixed(3)));
        });
        setFloorPrice(bump);
    }, [state.collectionNFT]);

    const handle = (address) => {
        navigate(`/collection/${address}`);
    };

    return (
        <div style={{ paddingBottom: '240px' }}>
            <section className="jumbotron no-bg" style={{ paddingBottom: '30px' }}>
                <div className="container">
                    <h1>{translateLang('allcollection_title')}</h1>
                </div>
            </section>

            <div className="container">
                <div className="row">
                    <table className="collections_table">
                        <thead>
                            <th style={{ padding: '0 30px' }}>#</th>
                            <th>Collection</th>
                            <th>Sales Volume</th>
                            <th>Floor price</th>
                            <th>Items</th>
                        </thead>
                        <tbody>
                            {state.collectionNFT.map((item, index) => (
                                <tr key={index} onClick={() => handle(item.address)}>
                                    <td style={{ padding: '5px 30px' }}>{index + 1}</td>
                                    <td>
                                        <div className="collection_name">
                                            <img
                                                className="lazy"
                                                src={item.metadata.image}
                                                alt=""
                                            />
                                            <h4 className="card-title text-center">
                                                {item.metadata.name}
                                            </h4>
                                        </div>
                                    </td>
                                    <td>{volumns[index]} ETH</td>
                                    <td>{floorPrice[index]} ETH</td>
                                    <td>{item.items.length}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="spacer-single"></div>
            </div>

            <Footer />
        </div>
    );
}
