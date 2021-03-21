import { Row, Col, Spinner } from 'react-bootstrap';
import GifRow from './GifRow';

/**
 * A grid for strictly displaying GIFs. Uses GridRow.
 * Takes a loading prop in case the request hasn't been resolved yet.
 * @param {object} props 
 * @param {object} props.gifs An array of rows of GIFs
 * @param {string} props.input User input
 * @param {boolean} props.loading A boolean denoting if the component is loading or not
 * @param {number} props.offset Current offset of GIFs
 * @param {number} props.totalCount Total count of GIFs from query
 */
export default function GifGrid(props) {
    const input = props.input;
    const gifs = props.gifs;
    const loading = props.loading;
    const offset = props.offset;
    const totalCount = props.totalCount;

    // Animation for end of viewport
    // const { scrollYProgress } = useViewportScroll();
    // const scale = useTransform(scrollYProgress, [0.85, 1], [1, 4]);

    if (gifs.length) {
        return (
            <div className='py-2'>
                {
                    gifs.map((row, index) => {
                        return (
                            <GifRow row={row} key={index} />
                        )
                    })}

                {/* We check offset & total count in case there are no more records */}
                {offset < totalCount &&
                    <Row style={{ marginTop: '10em', paddingBottom: '10em' }}>
                        <Col className='text-center'>
                            <h1>...</h1>
                        </Col>
                    </Row>
                }
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