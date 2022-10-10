import React, { useState, useMemo } from 'react';
import { useBlockchainContext } from '../../context';
import InfiniteScroll from 'react-infinite-scroll-component';
import NFTList from './nfts';

export default function MyNFTs(props) {
    const { address } = props;
    const [state, {}] = useBlockchainContext();
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const mynfts = useMemo(() => {
        let res = state.allNFT.filter((item) => {
            if (item.owner === address || item.marketdata.owner === address) {
                return item;
            }
        });
        let result = res.slice(0, renderCount);
        if (result.length === res.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [state.allNFT, address, renderCount]);

    return (
        <div className="row">
            {mynfts !== null && mynfts.length !== 0 ? (
                <InfiniteScroll
                    dataLength={mynfts.length}
                    next={() => setRenderCount(renderCount + 10)}
                    hasMore={hasMore}
                    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                    style={{ overflowX: 'hidden' }}>
                    <NFTList data={mynfts} />
                </InfiniteScroll>
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}
        </div>
    );
}
