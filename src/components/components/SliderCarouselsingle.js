import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useBlockchainContext } from '../../context';

class CustomSlide extends Component {
    render() {
        const { index, ...props } = this.props;
        return <div {...props}></div>;
    }
}

const settings = {
    infinite: false,
    speed: 50000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: 400,
    responsive: [
        {
            breakpoint: 1900,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
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
export default function SlideCarousel() {
    const [state, {}] = useBlockchainContext();

    return (
        <div className="nft-big">
            <Slider {...settings}>
                <CustomSlide>
                    <div className="nft_pic">
                        <div>
                            <img
                                src={
                                    state.allNFT[Math.floor(Math.random() * state.allNFT.length)]
                                        ?.metadata?.image || '../img/collections/coll-item-3.jpg'
                                }
                                className="lazy img-fluid"
                                alt=""
                            />
                        </div>
                    </div>
                </CustomSlide>
            </Slider>
        </div>
    );
}
