import { gql } from '@apollo/client';

/* ----- Query ----- */
const GET_COLLECTIONNFTS = gql`
    query Query {
        getCollectionNFTs {
            address
            metadata {
                name
                description
                coverImage
                image
                external_url1
                external_url2
                external_url3
                external_url4
                external_url5
                fee
                fee_recipent
            }
            items {
                metadata {
                    image
                    external_url1
                    external_url2
                    external_url3
                    external_url4
                    external_url5
                    description
                    name
                    attributes {
                        value
                        key
                        trait_type
                    }
                }
                tokenID
                collectionAddress
                likes
                creator
                owner
                isOffchain
                marketdata {
                    bidder
                    bidPrice
                    price
                    owner
                    startTime
                    endTime
                    prices
                    tokens
                    owners
                    bidders
                    bidPrices
                    bidTokens
                    bidTime
                    acceptedToken
                }
            }
        }
    }
`; // Get All NFTs by Collection

const GET_ALLNFTS = gql`
    query Query {
        getAllNFTs {
            tokenID
            collectionAddress
            likes
            creator
            owner
            isOffchain
            metadata {
                image
                external_url1
                external_url2
                external_url3
                external_url4
                external_url5
                description
                name
                attributes {
                    key
                    value
                    trait_type
                }
            }
            marketdata {
                price
                owner
                startTime
                endTime
                bidder
                bidPrice
                prices
                owners
                bidders
                bidPrices
                bidTime
                acceptedToken
            }
        }
    }
`; // Get All NFTs

const GET_USERSINFO = gql`
    query GetUserInfo {
        getUsersInfo {
            address
            name
            bio
            email
            image
            bannerImage
            link1
            link2
            link3
            link4
        }
    }
`;

const GET_PRICES = gql`
    query GetPrice {
        getPrice {
            ETHEURPrice
            ETHUSDPrice
            ETHJPYPrice
        }
    }
`;

const GET_ORDER = gql`
    query GetOrder {
        getOrder {
            orderId
            contractAddress
            assetId
            price
            acceptedToken
            assetOwner
            status
        }
    }
`;

const GET_ACTIVITIES = gql`
    query GetActivity {
        getActivity {
            event
            contractAddress
            tokenID
            price
            acceptedToken
            timeStamp
            userAddress
        }
    }
`;

export { GET_COLLECTIONNFTS, GET_ALLNFTS, GET_USERSINFO, GET_PRICES, GET_ORDER, GET_ACTIVITIES };
