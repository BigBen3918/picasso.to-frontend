import React, { useMemo } from 'react';
import { useBlockchainContext } from '../../context';
import NFTList from './nfts';

export default function MyNFTs(props) {
    const { address } = props;
    const [state, {}] = useBlockchainContext();

    const mynfts = useMemo(() => {
        return state.allNFT.filter((item) => {
            if (item.owner === address) {
                return item;
            }
        });
    }, [state.allNFT, address]);

    return (
        <div className="row">
            {mynfts && mynfts.length > 0 ? (
                <NFTList data={mynfts} />
            ) : (
                <h1 style={{ textAlign: 'center', padding: '73px' }}>No Data</h1>
            )}
        </div>
    );
}
