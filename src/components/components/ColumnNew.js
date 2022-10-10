import React, { useMemo, useState } from 'react';
import { useBlockchainContext } from '../../context';
import InfiniteScroll from 'react-infinite-scroll-component';
import NFTList from './nfts';

export default function Responsive() {
    const [state] = useBlockchainContext();
    const [filter, setFilter] = useState(null);
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const NFTs = useMemo(() => {
        let res = state.allNFT.filter(
            (item) => item.owner.toLowerCase() == state.addresses.Marketplace.toLowerCase()
        );

        let result = res.slice(0, renderCount);
        if (result.length === res.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [state.allNFT, filter]);

    return (
        <div className="row">
            {NFTs.length > 0 ? (
                <InfiniteScroll
                    dataLength={renderCount}
                    next={() => setRenderCount(renderCount + 10)}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv">
                    <NFTList data={NFTs} />
                </InfiniteScroll>
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}

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
