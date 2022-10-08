import { useEffect } from 'react';
import { useBlockchainContext } from '../../context';
import { Link } from 'react-router-dom';
import { styledText, styledAddress } from '../../utils';

export default function Acitivity(props) {
    const { address } = props;
    const [state] = useBlockchainContext();

    useEffect(() => {
        console.log(state.activities);
    }, []);

    const mockdata = [
        {
            image: 'https://png.pngtree.com/background/20210710/original/pngtree-dark-blue-neon-grid-stereo-background-picture-image_989378.jpg',
            collection: 'asdfasdfasdfasdfasdf',
            id: 'asdfasf',
            status: 'listed',
            price: 400,
            address: '0x334343434',
            time: '2'
        },
        {
            image: 'https://png.pngtree.com/background/20210710/original/pngtree-dark-blue-neon-grid-stereo-background-picture-image_989378.jpg',
            collection: 'abc',
            id: 'dfdfdf',
            status: 'listed',
            price: 400,
            address: '0x334343434',
            time: '2'
        },
        {
            image: 'https://png.pngtree.com/background/20210710/original/pngtree-dark-blue-neon-grid-stereo-background-picture-image_989378.jpg',
            collection: 'abc',
            id: 'dfdfdf',
            status: 'listed',
            price: 400,
            address: '0x334343434',
            time: '2'
        },
        {
            image: 'https://png.pngtree.com/background/20210710/original/pngtree-dark-blue-neon-grid-stereo-background-picture-image_989378.jpg',
            collection: 'abc',
            id: 'dfdfdf',
            status: 'listed',
            price: 400,
            address: '0x334343434',
            time: '2'
        },
        {
            image: 'https://png.pngtree.com/background/20210710/original/pngtree-dark-blue-neon-grid-stereo-background-picture-image_989378.jpg',
            collection: 'abc',
            id: 'dfdfdf',
            status: 'listed',
            price: 400,
            address: '0x334343434',
            time: '2'
        }
    ];

    return (
        <div className="container">
            <div className="row activity">
                <table>
                    <tbody>
                        {mockdata.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="active_info">
                                        <img src={item.image} alt="" />
                                        <span>
                                            <Link to="">{styledText(item.id)}</Link>
                                            <Link to="">{styledText(item.collection)}</Link>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <p>{item.status}</p>
                                </td>
                                <td>
                                    <p>{parseFloat(Number(item.price).toFixed(2))} FTM</p>
                                </td>
                                <td>
                                    <p>
                                        {item.address.slice(0, 6) + '...' + item.address.slice(-4)}
                                    </p>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <p>{item.time}m ago</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
