import { useEffect, useState, useCallback } from 'react';
import { getGifs } from '../api/giphyAPI';
import { Row, Col } from 'react-bootstrap';
import GifSearch from './GifSearch';
import GifGrid from './GifGrid';
import { debounce } from 'lodash';

/**
 * Container for GIFs. This is the top level component which contains the state of
 * the GIF data and sends it down to its children.
 */
export default function GifContainer() {

  // User input (after hitting submit)
  const [input, setInput] = useState('');

  // Array of GIFs
  const [gifs, setGifs] = useState([]);

  // Full GIF response
  const [gifResponse, setGifResponse] = useState();

  // Loading state for GifGrid
  const [loading, setLoading] = useState(true);

  // Offset for additional requests afterwards if user scrolls down
  const [offset, setOffset] = useState(48);

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
        const res = await getGifs(48, 0);
        setGifResponse(res.data);
        setGifs(res.data.data);
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
          setGifs((gifs) => {
            return ([...gifs, ...res.data.data]);
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
  }, [gifResponse, isBottom, offset, input]);

  // If the gifResponse gets modified (ex. typically when the user tries to search for something new), we will
  // need to map the new values to the state.
  useEffect(() => {
    if (gifResponse) {
      setGifs(gifResponse.data);
    }
  }, [gifResponse]);

  return (
    <div>
      <GifSearch containerInput={input} setContainerInput={setInput} gifResponse={gifResponse} setGifResponse={setGifResponse} setOffset={setOffset} />
      <GifGrid gifs={gifs} input={input} loading={loading} />
      {/* We check offset & total count in case there are no more records */}
      {offset < (gifResponse ? gifResponse.pagination.total_count : 0) &&
        <Row style={{ marginTop: '10em', marginBottom: '10em' }}>
          <Col className='text-center'>
            <h1>...</h1>
          </Col>
        </Row>
      }
    </div>
  )

}
