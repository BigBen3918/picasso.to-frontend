import { useState, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NFTCard from './nft_card';

export default function NFTList(props) {
    const { data } = props;
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const NFTs = useMemo(() => {
        if (!data) {
            return [];
        }
        let result = data.slice(0, renderCount);
        if (result.length === data.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [data, renderCount]);

    return (
        <InfiniteScroll
            dataLength={NFTs.length}
            next={() => setRenderCount(renderCount + 10)}
            hasMore={hasMore}
            loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
            style={{ overflowX: 'hidden' }}>
            <div className="row">
                {NFTs.map((nft, index) => (
                    <NFTCard index={index} nftdata={nft} />
                ))}
            </div>
        </InfiniteScroll>
    );
}
