import React, { useMemo, useState } from 'react';
import { useBlockchainContext } from '../../context';
import NFTList from './nfts';

export default function Responsive() {
    const [state] = useBlockchainContext();
    const [filter, setFilter] = useState(null);

    const NFTs = useMemo(() => {
        return state.allNFT.filter(
            (item) => item.owner.toLowerCase() == state.addresses.Marketplace.toLowerCase()
        );
    }, [state.allNFT, filter]);

    return (
        <div className="row">
            {NFTs && NFTs.length > 0 ? (
                <NFTList data={NFTs} />
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}

            <div className="spacer-30"></div>
        </div>
    );
}
