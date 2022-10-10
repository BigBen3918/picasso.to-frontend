import React, { useMemo, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';
import { useBlockchainContext } from '../../context';
import InfiniteScroll from 'react-infinite-scroll-component';
import NFTList from './nfts';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

export default function ColumnOne(props) {
    const { correctItem } = props;
    const [state] = useBlockchainContext();
    const [filter, setFilter] = useState(null);
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const NFTs = useMemo(() => {
        let res = correctItem.items.filter(
            (item) => item.owner.toLowerCase() !== state.addresses.Marketplace.toLowerCase()
        );
        let result = res.slice(0, renderCount);
        if (result.length === res.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [correctItem, filter]);

    return (
        <Reveal className="onStep" keyframes={fadeInUp} delay={800} duration={600}>
            <div>
                {NFTs.length > 0 ? (
                    <InfiniteScroll
                        dataLength={NFTs.length}
                        next={() => setRenderCount(renderCount + 10)}
                        hasMore={hasMore}
                        loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                        style={{ overflowX: 'hidden' }}>
                        <NFTList data={NFTs} />
                    </InfiniteScroll>
                ) : (
                    <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
                )}
            </div>
        </Reveal>
    );
}
