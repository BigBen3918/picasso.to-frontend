import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';
import { useBlockchainContext } from '../../context';
import { copyToClipboard } from '../../utils';
import Jazzicon from 'react-jazzicon';

const SocialTab = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const SocialItemTab = styled.div`
    display: flex;
    align-items: center;
    font-size: 25px;
    gap: 10px;
`;

export default function Profile() {
    const [state, { updateAuth, setLanguage, translateLang }] = useBlockchainContext();
    const [newName, setNewName] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [link1, setLink1] = useState('');
    const [link2, setLink2] = useState('');
    const [logoImage, _setLogoImage] = useState(null);
    const [bannerImage, _setBannerImage] = useState(null);
    const [logoSelectedFile, setLogoSeletedFile] = useState(null);
    const [bannerSelectedFile, setBannerSeletedFile] = useState(null);
    const [loading, setLoadItem] = useState(false);
    const logoRef = useRef(null);
    const bannerRef = useRef(null);

    useEffect(() => {
        init(
            state.auth.name,
            state.auth.bio ? state.auth.bio : '',
            state.auth.email,
            state.auth?.link1,
            state.auth?.link2
        );
    }, []);

    const handleaddressCopy = () => {
        copyToClipboard(state.auth.address)
            .then((res) => {
                NotificationManager.success(translateLang('addresscopy_success'));
            })
            .catch((err) => {
                NotificationManager.success(translateLang('operation_error'));
            });
    };

    const handleSave = async () => {
        setLoadItem(true);
        try {
            const signMessage = await state.signer.signMessage(newName);

            var formData = new FormData();
            formData.append('image', logoSelectedFile);
            formData.append('bannerImage', bannerSelectedFile);
            formData.append('name', newName);
            formData.append('bio', newBio);
            formData.append('email', newEmail);
            formData.append('link1', link1);
            formData.append('link2', link2);
            formData.append('signature', signMessage);

            var res = await axios.post('/api/user-update', formData);
            updateAuth(res.data.data);

            NotificationManager.success(translateLang('update_success'));
        } catch (err) {
            console.log(err);
            NotificationManager.error(translateLang('operation_error'));
            setLoadItem(false);
        }
        setLoadItem(false);
    };

    const init = (p1, p2, p3, p4, p5) => {
        setNewName(p1);
        setNewBio(p2);
        setNewEmail(p3);
        setLink1(p4);
        setLink2(p5);
    };

    const handleLogoChange = async (event) => {
        const newImage = event.target?.files?.[0];
        if (newImage) {
            try {
                _setLogoImage(URL.createObjectURL(newImage));
                setLogoSeletedFile(newImage);
            } catch (err) {
                console.log(err);
                NotificationManager.error(translateLang('imageloading_error'));
            }
        }
    };

    const handleBannerChange = async (event) => {
        const newImage = event.target?.files?.[0];
        if (newImage) {
            try {
                _setBannerImage(URL.createObjectURL(newImage));
                setBannerSeletedFile(newImage);
            } catch (err) {
                console.log(err);
                NotificationManager.error(translateLang('imageloading_error'));
            }
        }
    };

    return (
        <section className="container setting">
            <h2>Profile details</h2>
            <div className="row">
                <div className="col-lg-7 col-md-6 col-sm-12">
                    <div className="field-set">
                        <div className="spacer-20"></div>
                        <h5>{translateLang('walletaddress')}</h5>
                        <div
                            className="text_copy noselect"
                            style={{ color: 'grey', textAlign: 'left' }}
                            onClick={handleaddressCopy}>
                            <span>
                                {state.auth.address.slice(0, 8) +
                                    '...' +
                                    state.auth.address.slice(-4)}
                            </span>
                            <span style={{ padding: '0 10px' }}>
                                <i className="bg-color-2 i-boxed icon_pencil-edit"></i>
                            </span>
                        </div>
                        <div className="spacer-20"></div>
                        <label htmlFor="item_name">
                            <h5>{translateLang('username')}</h5>
                        </label>
                        <input
                            type="text"
                            name="item_name"
                            id="item_name"
                            className="form-control"
                            placeholder="your name"
                            onChange={(e) => setNewName(e.target.value)}
                            value={newName}
                        />
                        <div className="spacer-20"></div>
                        <label htmlFor="item_bio">
                            <h5>{translateLang('bio')}</h5>
                        </label>
                        <textarea
                            name="item_bio"
                            id="item_bio"
                            className="form-control"
                            placeholder="your bio details"
                            onChange={(e) => setNewBio(e.target.value)}
                            value={newBio}
                        />
                        <div className="spacer-20"></div>
                        <label htmlFor="item_email">
                            <h5>{translateLang('emailaddress')}</h5>
                        </label>
                        <input
                            type="email"
                            name="item_email"
                            id="item_email"
                            className="form-control"
                            placeholder="your bio details"
                            onChange={(e) => setNewEmail(e.target.value)}
                            value={newEmail}
                        />
                        <div className="spacer-20"></div>
                        <label htmlFor="item_social">
                            <h5>Social Connections</h5>
                        </label>
                        <SocialTab>
                            <SocialItemTab>
                                <FaTwitterSquare />
                                <input
                                    type="text"
                                    name="item_social"
                                    id="item_social"
                                    className="form-control"
                                    placeholder="https://twitter.com/"
                                    value={link1}
                                    onChange={(e) => setLink1(e.target.value)}
                                />
                            </SocialItemTab>
                            <SocialItemTab>
                                <FaFacebookSquare />
                                <input
                                    type="text"
                                    name="item_social"
                                    id="item_social"
                                    className="form-control"
                                    placeholder="https://facebook.com/"
                                    value={link2}
                                    onChange={(e) => setLink2(e.target.value)}
                                />
                            </SocialItemTab>
                        </SocialTab>

                        <div className="spacer-30"></div>
                        <input
                            type="button"
                            id="submit"
                            className="btn-main"
                            value={translateLang('btn_save')}
                            onClick={handleSave}
                            disabled={loading}
                        />
                        <div className="spacer-20"></div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-6 col-sm-12">
                    <div className="profile__item">
                        <div>
                            <h5>Profile Image</h5>
                            {logoSelectedFile ? (
                                <div onClick={() => logoRef.current.click()}>
                                    <img
                                        src={logoImage}
                                        className="lazy nft__item_preview noselect"
                                        alt=""
                                    />
                                </div>
                            ) : state.auth.image ? (
                                <div onClick={() => logoRef.current.click()}>
                                    <img
                                        src={state.auth.image}
                                        className="lazy nft__item_preview noselect"
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <div onClick={() => logoRef.current.click()}>
                                    <Jazzicon
                                        diameter={100}
                                        seed={Math.round(
                                            (Number(state.auth.address) /
                                                Number(
                                                    '0xffffffffffffffffffffffffffffffffffffffffff'
                                                )) *
                                                10000000
                                        )}
                                    />
                                </div>
                            )}
                            <input
                                ref={logoRef}
                                id="fileUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="fileUpload"
                            />
                        </div>
                        <div className="spacer-double"></div>
                        <div>
                            <h5>Profile Banner</h5>
                            {bannerSelectedFile ? (
                                <div onClick={() => bannerRef.current.click()}>
                                    <img
                                        src={bannerImage}
                                        className="lazy nft__item_preview noselect"
                                        alt=""
                                    />
                                </div>
                            ) : state.auth.bannerImage ? (
                                <div onClick={() => bannerRef.current.click()}>
                                    <img
                                        src={state.auth.bannerImage}
                                        className="lazy nft__item_preview noselect"
                                        alt=""
                                    />
                                </div>
                            ) : (
                                <div onClick={() => bannerRef.current.click()}>
                                    <img
                                        src="../img/background/bg-shape-1.png"
                                        alt=""
                                        style={{
                                            backgroundColor: `rgb(${
                                                Math.round(
                                                    (Number(state.auth.address) /
                                                        Number(
                                                            '0xffffffffffffffffffffffffffffffffffffffffff'
                                                        )) *
                                                        1000000
                                                ) % 255
                                            }, ${
                                                Math.round(
                                                    (Number(state.auth.address) /
                                                        Number(
                                                            '0xffffffffffffffffffffffffffffffffffffffffff'
                                                        )) *
                                                        1000000
                                                ) % 200
                                            }, ${
                                                Math.round(
                                                    (Number(state.auth.address) /
                                                        Number(
                                                            '0xffffffffffffffffffffffffffffffffffffffffff'
                                                        )) *
                                                        1000000
                                                ) % 150
                                            })`
                                        }}
                                    />
                                </div>
                            )}
                            <input
                                ref={bannerRef}
                                id="fileUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="fileUpload"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
