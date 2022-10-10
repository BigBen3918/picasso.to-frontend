import React, { useCallback, useState, useMemo } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Select from 'react-select';

import NFTLists from '../components/NFTLists';
import Acitivity from './Activity';
import Footer from '../menu/footer';
import { useBlockchainContext } from '../../context';

const customStyles = {
    option: (base, state) => ({
        ...base,
        background: '#fff',
        color: '#000',
        borderRadius: 0,
        '&:hover': {
            background: '#ddd'
        }
    }),
    menu: (base) => ({
        ...base,
        background: '#fff !important',
        borderRadius: '20px',
        marginTop: 0
    }),
    menuList: (base) => ({
        ...base,
        padding: 0
    }),
    control: (base, state) => ({
        ...base,
        padding: 2
    })
};

const options = [
    { value: 'All categories', label: 'All categories' },
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Domain Names', label: 'Domain Names' }
];
const options2 = [
    { value: 'Rating', label: 'Rating' },
    { value: 'PriceLTH', label: 'Price (Low to High)' },
    { value: 'PriceHTL', label: 'Price (High to Low)' },
    { value: 'NameASC', label: 'Name (ASC)' },
    { value: 'NameDESC', label: 'Name (DESC)' }
];

export default function Explore() {
    const [state, { translateLang }] = useBlockchainContext();
    const [searchWord, setSearchWord] = useState('');

    const [selectedOption2, setSelectedOption2] = useState(options2[0]);
    const [option1, setOption1] = useState('forsale');

    // status filter
    const filter1 = useCallback(
        (item) => {
            switch (option1) {
                case 'forsale':
                    return (
                        item?.owner?.toUpperCase() === state.addresses?.Marketplace?.toUpperCase()
                    );
                case 'all':
                    return (
                        item?.owner?.toUpperCase() !== state.addresses?.Marketplace?.toUpperCase()
                    );
                default:
                    return true;
            }
        },
        [option1]
    );

    const filter2 = useCallback((item) => {
        return true;
    }, []);

    //search filter
    const filter3 = useCallback(
        (item) => {
            const searchParams = ['owner', 'name', 'description', 'collectionAddress'];
            return searchParams.some((newItem) => {
                return (
                    item[newItem]?.toString().toLowerCase().indexOf(searchWord.toLowerCase()) >
                        -1 ||
                    item['metadata'][newItem]
                        ?.toString()
                        .toLowerCase()
                        .indexOf(searchWord.toLowerCase()) > -1
                );
            });
        },
        [searchWord]
    );

    // sort option
    const sortBy = useCallback(
        (a, b) => {
            let res = true;
            switch (selectedOption2.value) {
                case 'Rating':
                    res = Number(a.likes?.length) < Number(b.likes?.length);
                    break;
                case 'PriceLTH':
                    if (a.marketdata?.price == null || Number(b.marketdata?.price) == 0) return -1;
                    res = Number(a.marketdata?.price) > Number(b.marketdata?.price);
                    break;
                case 'PriceHTL':
                    if (a.marketdata?.price == null || Number(b.marketdata?.price) == 0) return -1;
                    res = Number(b.marketdata?.price) > Number(a.marketdata?.price);
                    break;
                case 'NameASC':
                    res = a.metadata?.name > b.metadata?.name;
                    break;
                case 'NameDESC':
                    res = b.metadata?.name > a.metadata?.name;
                    break;
                default:
                    res = true;
            }
            return res ? 1 : -1;
        },
        [selectedOption2]
    );

    return (
        <div style={{ paddingBottom: '500px' }}>
            <div className="jumbotron no-bg">
                <div className="container">
                    <h1>{translateLang('allnft_title')}</h1>
                </div>
            </div>

            <section className="container" style={{ paddingTop: '30px', position: 'relative' }}>
                {/* <div className="search_group">
                    <form className="form-dark" id="form_quick_search" name="form_quick_search">
                        <input
                            type="text"
                            className="form-control"
                            id="name_1"
                            name="name_1"
                            placeholder={translateLang('seachtext')}
                            onChange={(e) => setSearchWord(e.target.value)}
                            value={searchWord}
                        />
                    </form>
                <div className="spacer-single"></div> */}
                <div className="dropdownSelect">
                    <Select
                        className="select1"
                        styles={customStyles}
                        defaultValue={options2[0]}
                        options={options2}
                        onChange={setSelectedOption2}
                    />
                </div>
                <Tabs
                    activeKey={option1}
                    onSelect={(k) => {
                        setOption1(k);
                    }}
                    className="mb-3">
                    <Tab eventKey="forsale" title="For Sale">
                        <div className="spacer-20"></div>
                        <NFTLists
                            filter1={filter1}
                            filter2={filter2}
                            filter3={filter3}
                            sortBy={sortBy}
                        />
                    </Tab>
                    <Tab eventKey="all" title="All NFT">
                        <div className="spacer-20"></div>
                        <NFTLists
                            filter1={filter1}
                            filter2={filter2}
                            filter3={filter3}
                            sortBy={sortBy}
                        />
                    </Tab>
                    <Tab eventKey="activity" title="Activity">
                        <div className="spacer-20"></div>
                        <Acitivity activitiesData={state.activities} />
                    </Tab>
                </Tabs>
            </section>

            <Footer />
        </div>
    );
}
