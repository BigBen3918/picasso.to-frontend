import React, { useMemo, useState } from 'react';
import { useBlockchainContext } from '../../context';
import NFTList from './nfts';

export default function SaledNFTs(props) {
    const { address } = props;
    const [state, {}] = useBlockchainContext();

    const salednfts = useMemo(() => {
        return state.allNFT.filter((item) => {
            if (item.marketdata?.owner === address) {
                return item;
            }
        });
    }, [state.allNFT, address]);

    return (
        <div>
            {salednfts && salednfts.length > 0 ? (
                <NFTList data={salednfts} />
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No items to display</h1>
            )}
        </div>
    );
}
