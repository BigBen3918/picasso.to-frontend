import { useState, useMemo } from 'react';
import { useBlockchainContext } from '../../context';
import { Link } from 'react-router-dom';
import { styledText } from '../../utils';
import styled from 'styled-components';
import moment from 'moment';
import { BiPurchaseTag, BiX, BiCheckCircle } from 'react-icons/bi';
import Jazzicon from 'react-jazzicon';
import InfiniteScroll from 'react-infinite-scroll-component';

const StyledSpan = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export default function Acitivity(props) {
    const { activitiesData } = props;
    const [state, { getCurrency }] = useBlockchainContext();
    const [renderCount, setRenderCount] = useState(6);
    const [hasMore, setHasMore] = useState(false);

    const activeData = useMemo(() => {
        var result = activitiesData.slice(0, renderCount);
        if (result.length === activitiesData.length) setHasMore(false);
        else setHasMore(true);
        return result;
    }, [activitiesData, renderCount]);

    return (
        <div className="container">
            <InfiniteScroll
                dataLength={activeData.length}
                next={() => setRenderCount(renderCount + 6)}
                hasMore={hasMore}
                loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                style={{ overflowX: 'hidden' }}>
                <div className="row activity">
                    <table>
                        <tbody>
                            {activeData.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="active_info">
                                            {state.collectionNFT.map((collect) => {
                                                if (collect.address === item.contractAddress) {
                                                    return (
                                                        <img
                                                            src={
                                                                collect.items[item.tokenID].metadata
                                                                    .image
                                                            }
                                                            alt=""
                                                        />
                                                    );
                                                }
                                            })}
                                            <span>
                                                <Link to={`/collection/${item.contractAddress}`}>
                                                    {styledText(item.contractAddress)}
                                                </Link>
                                                <Link
                                                    to={`/ItemDetail/${item.contractAddress}/${item.tokenID}`}>
                                                    {state.collectionNFT.map((collect) => {
                                                        if (
                                                            collect.address === item.contractAddress
                                                        )
                                                            return styledText(
                                                                collect.items[item.tokenID].metadata
                                                                    .name
                                                            );
                                                    })}
                                                </Link>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        {item.event === 'OrderCreated' ? (
                                            <StyledSpan style={{ color: 'purple' }}>
                                                <BiPurchaseTag />
                                                <p>{'Listed'}</p>
                                            </StyledSpan>
                                        ) : item.event === 'OrderCancelled' ? (
                                            <StyledSpan style={{ color: 'red' }}>
                                                <BiX />
                                                <p>{'Unlisted'}</p>
                                            </StyledSpan>
                                        ) : (
                                            <StyledSpan style={{ color: 'green' }}>
                                                <BiCheckCircle />
                                                <p>{'Purchased'}</p>
                                            </StyledSpan>
                                        )}
                                    </td>
                                    <td>
                                        <p>
                                            {parseFloat(Number(item.price).toFixed(2)) +
                                                ' ' +
                                                getCurrency(item.acceptedToken).label}
                                        </p>
                                    </td>
                                    <td>
                                        <Link to={`/${item.userAddress}`}>
                                            <div className="active_user">
                                                {state.usersInfo[item.userAddress]?.image ? (
                                                    <img
                                                        src={
                                                            state.usersInfo[item.userAddress].image
                                                        }
                                                        alt=""
                                                    />
                                                ) : (
                                                    <Jazzicon
                                                        diameter={100}
                                                        seed={Math.round(
                                                            (Number(item.userAddress) /
                                                                Number(
                                                                    '0xffffffffffffffffffffffffffffffffffffffffff'
                                                                )) *
                                                                10000000
                                                        )}
                                                    />
                                                )}
                                                <p>
                                                    {item.userAddress.slice(0, 6) +
                                                        '...' +
                                                        item.userAddress.slice(-4)}
                                                </p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <p>
                                            {moment
                                                .unix(item.timeStamp / 1000)
                                                .format('DD MMM YYYY hh:mm A')}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </InfiniteScroll>
        </div>
    );
}
