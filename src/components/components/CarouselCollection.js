import React, { useMemo } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';
import addresses from '../../contracts/contracts/addresses.json';

const settings = {
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false
            }
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
            }
        }
    ]
};

export default function CarouselCollection() {
    const navigate = useNavigate();
    const [state, {}] = useBlockchainContext();

    const NFTItem = (props) => {
        const { title, coverImage, id, address, nftsCount } = props;

        const handle = () => {
            navigate(`/collection/${address}`);
        };

        return (
            <div index={id}>
                <div className="nft_coll" onClick={handle}>
                    <span>
                        <div className="nft_wrap">
                            <img src={coverImage} className="lazy img-fluid" alt="" />
                        </div>
                    </span>
                    <div className="nft_coll_title">
                        <button>{title.length > 10 ? title.slice(0, 10) + '...' : title}</button>
                    </div>
                    <div className="nft_coll_info">
                        <div>
                            <div>
                                <h4>{nftsCount} items</h4>
                                <p>Total Items</p>
                                <div className="spacer-10"></div>
                            </div>
                            <div>
                                <button>View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const someNFTs = useMemo(() => {
        // var count = 0;
        var result = [
            state.collectionNFT.find((item) => {
                return item.address === addresses.NFT1;
            })
        ];
        result.push(state.collectionNFT[0]);
        result.push(state.collectionNFT[3]);
        result.push(state.collectionNFT[8]);
        // result = [
        //     ...result,
        //     ...state.collectionNFT.map((item) => {
        //         if (count < 3 && item.address !== addresses.NFT1) {
        //             count++;
        //             return item;
        //         } else {
        //             return null;
        //         }
        //     })
        // ];
        return result.filter((item) => {
            if (item) {
                return item;
            }
        });
    }, [state.collectionNFT]);

    return (
        <div>
            <Slider {...settings}>
                {someNFTs.map((item, index) => (
                    <NFTItem
                        key={index}
                        id={index}
                        title={item.metadata.name}
                        coverImage={item.metadata.coverImage}
                        address={item.address}
                        nftsCount={item.items.length}
                    />
                ))}
            </Slider>
        </div>
    );
}
