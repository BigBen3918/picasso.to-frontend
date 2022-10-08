import { ethers } from 'ethers';
function delay(delayTimes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

function toBigNum(value, d = 18) {
    return ethers.utils.parseUnits(String(value), d);
}

function fromBigNum(value, d = 18) {
    try {
        return parseFloat(ethers.utils.formatUnits(value, d));
    } catch (err) {
        console.log('fromBigNum error', value);
        return '0';
    }
}

const styledAddress = (s = '') => {
    if (s && s.length > 10) return s.slice(0, 4) + '...' + s.slice(-4);
    else return s;
};

const styledText = (s) => {
    if (s.length > 20) return s.slice(0, 15) + '...';
    else return s;
};

function copyToClipboard(textToCopy) {
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

/**
 * change network in metamask
 */
const networks = {
    polygon: {
        chainId: `0x${Number(137).toString(16)}`,
        chainName: 'Polygon Mainnet',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
    },
    fantom_test: {
        chainId: `0x${Number(4002).toString(16)}`,
        chainName: 'Fantom Testnet',
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18
        },
        rpcUrls: ['https://ftm-test.babylonswap.finance'],
        blockExplorerUrls: ['https://testnet.ftmscan.com/']
    },
    fantom: {
        chainId: `0x${Number(250).toString(16)}`,
        chainName: 'Fantom Opera',
        nativeCurrency: {
            name: 'Fantom',
            symbol: 'FTM',
            decimals: 18
        },
        rpcUrls: ['https://rpcapi.fantom.network'],
        blockExplorerUrls: ['https://ftmscan.com/']
    },
    bsc: {
        chainId: `0x${Number(56).toString(16)}`,
        chainName: 'Binance Smart Chain Mainnet',
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: [
            'https://bsc-dataseed1.binance.org',
            'https://bsc-dataseed2.binance.org',
            'https://bsc-dataseed3.binance.org',
            'https://bsc-dataseed4.binance.org',
            'https://bsc-dataseed1.defibit.io',
            'https://bsc-dataseed2.defibit.io',
            'https://bsc-dataseed3.defibit.io',
            'https://bsc-dataseed4.defibit.io',
            'https://bsc-dataseed1.ninicoin.io',
            'https://bsc-dataseed2.ninicoin.io',
            'https://bsc-dataseed3.ninicoin.io',
            'https://bsc-dataseed4.ninicoin.io',
            'wss://bsc-ws-node.nariox.org'
        ],
        blockExplorerUrls: ['https://bscscan.com']
    }
};
const changeNetwork = async (networkName) => {
    if (!window.ethereum) throw new Error('No crypto wallet found');
    await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                ...networks[networkName]
            }
        ]
    });
};

export { delay, toBigNum, fromBigNum, styledAddress, copyToClipboard, changeNetwork, styledText };
