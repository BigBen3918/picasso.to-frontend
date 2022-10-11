import React, { useMemo, useState } from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from '@emotion/react';
import { useBlockchainContext } from '../../context';
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

    const NFTs = useMemo(() => {
        return correctItem.items.filter(
            (item) => item.owner.toLowerCase() !== state.addresses.Marketplace.toLowerCase()
        );
    }, [correctItem, filter]);

    return (
        <Reveal className="onStep" keyframes={fadeInUp} delay={800} duration={600}>
            <div>
                {NFTs && NFTs.length > 0 ? (
                    <NFTList data={NFTs} />
                ) : (
                    <h1 style={{ textAlign: 'center', padding: '73px' }}>No items to display</h1>
                )}
            </div>
        </Reveal>
    );
}
