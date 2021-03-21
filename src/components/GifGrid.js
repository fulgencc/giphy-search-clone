import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { mapGifsToRows } from '../util/util';
import GifRow from './GifRow';
import useBreakpoint from '../util/useBreakpoint';

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

    const [gifRows, setGifRows] = useState([]);

    const breakpoint = useBreakpoint();

    // map the GIFs to rows
    useEffect(() => {
        setGifRows(mapGifsToRows(gifs, breakpoint));
    }, [gifs, breakpoint])

    if (gifRows.length) {
        return (
            <div className='py-2'>
                {
                    gifRows.map((row, index) => {
                        return (
                            <GifRow row={row} key={index} />
                        )
                    })}
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