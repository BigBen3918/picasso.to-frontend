import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useBlockchainContext } from '../../context';

export default function NewNotable() {
    const navigate = useNavigate();
    const [state] = useBlockchainContext();
    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: 400,
        responsive: [
            {
                breakpoint: 1900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
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

    const handle = (address) => {
        navigate(`/collection/${address}`);
    };

    return (
        <div className="nft-big">
            <Slider {...settings}>
                {state.collectionNFT.slice(-5).map((item, index) => (
                    <div index={index + 1}>
                        <div className="nft_pic" onClick={() => handle(item.address)}>
                            <span>
                                <span className="nft_pic_info">
                                    <span className="nft_pic_title">{item.metadata.name}</span>
                                    <span className="nft_pic_by">
                                        {item.items.length + ' items'}
                                    </span>
                                </span>
                            </span>
                            <div className="nft_pic_wrap">
                                <img
                                    src={item.metadata.coverImage}
                                    className="lazy img-fluid"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
