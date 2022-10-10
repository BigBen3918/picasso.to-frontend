import { useState } from 'react';
import React, { useMemo } from 'react';
import { useBlockchainContext } from '../../context';
import InfiniteScroll from 'react-infinite-scroll-component';
import NFTList from './nfts';

export default function NFTLists(props) {
    const { filter1, filter2, filter3, sortBy } = props;
    const [state, {}] = useBlockchainContext();
    const [renderCount, setRenderCount] = useState(10);
    const [hasMore, setHasMore] = useState(false);

    const NFTs = useMemo(() => {
        let res = state.allNFT.filter(filter1).filter(filter2).filter(filter3).sort(sortBy);
        let result = res.slice(0, renderCount);
        if (result.length === res.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [state.allNFT, filter1, filter2, filter3, sortBy, renderCount]);

    return (
        <div>
            <InfiniteScroll
                dataLength={NFTs.length}
                next={() => setRenderCount(renderCount + 10)}
                hasMore={hasMore}
                loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                style={{ overflowX: 'hidden' }}>
                <NFTList data={NFTs} />
            </InfiniteScroll>
            {/* <div
                className="nft__item_like"
                id={'like' + index}
                style={nft.likes.indexOf(state.auth.address) === -1 ? null : { color: '#c5a86a' }}>
                <i className="fa fa-heart"></i>
            </div> */}

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
