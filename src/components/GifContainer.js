import { useEffect, useState, useCallback } from 'react';
import { getGifs } from '../api/giphyAPI';
import { mapGifsToRows } from '../util/util';
import GifSearch from './GifSearch';
import GifGrid from './GifGrid';
import { debounce } from 'lodash';
import useBreakpoint from '../util/useBreakpoint';

/**
 * Container for GIFs. This is the top level component which contains the state of
 * the GIF data and sends it down to its children.
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
  const [offset, setOffset] = useState(48);

  // True if user is at the bottom of the screen
  const [isBottom, setIsBottom] = useState(false);

  const breakpoint = useBreakpoint();

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
        const res = await getGifs(48, 0);
        const gifRows = mapGifsToRows(res.data.data, breakpoint);
        setGifResponse(res.data);
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
    // Make sure that there's still GIFs to load before sending the request.
    if (isBottom && offset < gifResponse.pagination.total_count) {
      const getMoreGifData = async () => {
        // Await GIFs (if input is blank, search from trending, otherwise use query)
        try {
        const res = await getGifs(12, offset, input ? 'search' : 'trending', input ? input : undefined);
        const gifRows = mapGifsToRows(res.data.data, breakpoint);
        setGifs((gifs) => {
          return ([...gifs, ...gifRows]);
        });

        setOffset((offset) => (offset + 12));
        }
        catch (e) {
          console.log(e.message);
        }
      }
      setIsBottom(false);
      getMoreGifData();
    }
  }, [gifResponse, isBottom, offset, input, breakpoint]);

  // If the gifResponse gets modified (ex. typically when the user tries to search for something new), we will
  // need to map the new values to the state.
  useEffect(() => {
    if (gifResponse) {
      const gifRows = mapGifsToRows([...gifResponse.data], breakpoint);
      setGifs([...gifRows]);
    }
  }, [gifResponse, breakpoint]);

  return (
    <div>
      <GifSearch setGifs={setGifs} containerInput={input} setContainerInput={setInput} gifResponse={gifResponse} setGifResponse={setGifResponse} setOffset={setOffset} />
      <GifGrid gifs={gifs} input={input} loading={loading} offset={offset} totalCount={gifResponse ? gifResponse.pagination.total_count : 0} />
    </div>
  )

}
