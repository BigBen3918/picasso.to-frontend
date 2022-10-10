import React, { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useBlockchainContext } from '../../context';
import NFTList from './nfts';

export default function SaledNFTs(props) {
    const { address } = props;
    const [state, {}] = useBlockchainContext();
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const salednfts = useMemo(() => {
        let res = state.allNFT.filter((item) => {
            if (item.marketdata?.owner === address) {
                return item;
            }
        });
        let result = res.slice(0, renderCount);
        if (result.length === res.length) setHasMore(false);
        else setHasMore(true);

        return result;
    }, [state.allNFT, address]);

    return (
        <div>
            {salednfts !== null && salednfts.length !== 0 ? (
                <InfiniteScroll
                    dataLength={salednfts.length}
                    next={() => setRenderCount(renderCount + 10)}
                    hasMore={hasMore}
                    loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                    style={{ overflowX: 'hidden' }}>
                    <NFTList nfts={salednfts} />
                </InfiniteScroll>
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}
        </div>
    );
}
