import { Row, Col, Spinner } from 'react-bootstrap';
import GifRow from './GifRow';

/**
 * A grid for strictly displaying GIFs. Uses GridRow.
 * Takes a loading prop in case the request hasn't been resolved yet.
 * @param {object} props 
 * @param {object} props.gifs An array of rows of GIFs
 * @param {string} props.input User input
 * @param {boolean} props.loading A boolean denoting if the component is loading or not
 */
export default function GifGrid(props) {
    const input = props.input;
    const gifs = props.gifs;
    const loading = props.loading;


    if (gifs.length) {
        return (
            <div className='py-2'>
                {
                    gifs.map((row, index) => {
                        return (
                            <GifRow row={row} key={index} />
                        )
                    })}
                <Row>
                    <Col className='text-center p-5'>
                        <h2>...</h2>
                    </Col>
                </Row>
            </div>

        )
    }

    else if (loading) {
        return (
            <div className='py-2'>
                <Spinner animation='border' />
            </div>
        )
    }

    return (
        <div className='py-2'>
            <h5>No GIFs found for {input}.</h5>
        </div>
    );

}