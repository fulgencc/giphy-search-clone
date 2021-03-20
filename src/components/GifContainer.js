import { useEffect, useState ,useCallback } from 'react';
import { getGifs } from '../api/giphyAPI';
import { mapGifsToRows } from '../util/util';
import GifSearch from './GifSearch';
import GifGrid from './GifGrid';
import {debounce} from 'lodash';

/**
 * Container for gifs. It handles all of the http requests, and sends them down to
 * the children components
 */
export default function GifContainer() {

  // User input (after hitting submit)
  const [input, setInput] = useState('');

  // Array of GIFs (in rows)
  const [gifs, setGifs] = useState([]);

  // Full GIF response
  const [gifResponse, setGifResponse] = useState();

  // Loading state for GifGrid
  const [loading, setLoading] = useState(true);

  // Offset for additional requests afterwards if user scrolls down
  const [offset, setOffset] = useState(40);

  // True if user is at the bottom of the screen
  const [isBottom, setIsBottom] = useState(false);

  const debounceIsBottom = useCallback(debounce(setIsBottom, 1000), []); // eslint-disable-line react-hooks/exhaustive-deps
  /**
   * Sets isBottom boolean to true or false if the user is at the bottom of the
   * page.
   */
  const handleScroll = () => {
    const bottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
    if (bottom !== isBottom) {
      debounceIsBottom(bottom);
    }
  };

  /**
   * On Mount useEffect.
   */
  useEffect(() => {
    // Get initial gif data
    const getGifData = async () => {
      try {
        setLoading(true);
        const res = await getGifs(40, 0);
        const gifRows = mapGifsToRows(res.data.data);
        setGifs(gifRows);
        setLoading(false);
      }
      catch (e) {
        console.log(e.message);
      }
    }
    getGifData();

    // Add listener for scroll (infinite scrolling)
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    }
    // Disabled react-hooks/exhaustive-deps (eventListener function does not change)
    // eslint-disable-next-line
  }, []);

  // Infinite scroll
  useEffect(() => {
    if (isBottom) {
      const getMoreGifData = async () => {
        // Await GIFs (if input is blank, search from trending, otherwise use query)
        const res = await getGifs(8, offset, input ? 'search' : 'trending', input ? input : undefined);
        const gifRows = mapGifsToRows(res.data.data);
        setGifs((gifs) => ([...gifs, ...gifRows]));

        setOffset((offset) => (offset + 8));
      }
      setIsBottom(false);
      getMoreGifData();
    }
  }, [isBottom, offset, input]);

  // If the gifResponse gets modified (ex. user tries to search), we will
  // need to map the new values to the state.
  useEffect(() => {
    if (gifResponse) {
      const gifRows = mapGifsToRows([...gifResponse.data]);
      setGifs([...gifRows]);
    }
  }, [gifResponse]);

  return (
    <div>
      <GifSearch setGifs={setGifs} containerInput={input} setContainerInput={setInput} setGifResponse={setGifResponse} gifResponse={gifResponse} />
      <GifGrid gifs={gifs} input={input} loading={loading} />
    </div>
  )

}
