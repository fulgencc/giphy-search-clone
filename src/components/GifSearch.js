import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { getAutocomplete, getGifs } from '../api/giphyAPI';
import { debounce } from 'lodash';
import './GifSearch.css'

/**
 * Input component to search for GIFs.
 * @param {object} props
 * @param {function} props.containerInput State of the user input.
 * @param {function} props.setContainerInput State function to set the container input. 
 * This is to show what the user searched for in the container. I was thinking of
 * potentially putting this in the GifSearch component, but ultimately thought it would be best
 * to separate them.
 * @param {object} props.gifResponse The full http response from GIPHY.
 * @param {function} props.setGifResponse State function to set the full http response from GIPHY.
 * @param {function} props.setOffset State function to set the offset of GIFs for the request.
 */
export default function GifSearch(props) {
  // User input (real-time)
  const [input, setInput] = useState('');

  // AutoComplete data
  const [autoComplete, setAutocomplete] = useState();

  // Array index of which AutoComplete suggestion is selected (-1 for none)
  const [autoCompleteSelected, setAutoCompleteSelected] = useState(-1);

  // The full AutoComplete rquest
  const [autoCompleteRequest, setAutoCompleteRequest] = useState();

  // The container's input (after user search)
  const [containerInput, setContainerInput] = [props.containerInput, props.setContainerInput];

  // Full GIPHY response
  const [gifResponse, setGifResponse] = [props.gifResponse, props.setGifResponse];

  const setOffset = props.setOffset

  const styles = {
    autoComplete: 'autoComplete',
    autoCompleteItem: 'autoCompleteItem py-2',
    autoCompleteText: 'autoCompleteText'
  };

  /**
   * useEffect to grab autocomplete data if the user types something
   */
  useEffect(() => {

    if (input !== '') {
      const getAutocompleteData = async (source) => {
        try {
          const autocompleteData = await getAutocomplete(input, source.token);
          setAutocomplete(autocompleteData.data.data);
        }
        catch (e) {
          console.log(e.message);
        }
      }
      // We create a cancel token in axios that we pass to the
      // request in case we need to cancel the request when the
      // user searches before auto complete data has been returned.
      const newCancelToken = axios.CancelToken;
      const source = newCancelToken.source();
      setAutoCompleteRequest(source);

      // Debounce auto complete request by 1 second so then the server doesn't
      // get overloaded.
      const timeOut = setTimeout(() => getAutocompleteData(source), 1000);
      return () => clearTimeout(timeOut);
    }
    else {
      resetAutocomplete();
    }
  }, [input])

  /**
   * Asynchronous call to get search gif data, map to
   * gif rows, and then set the gif array.
   */
  const getSearchGifData = async () => {
    if (input === '') {
      const searchGifData = await getGifs(48, 0);
      setGifResponse(searchGifData.data);
    }
    else {
      const searchGifData = await getGifs(48, 0, 'search', input);
      setGifResponse(searchGifData.data);
    }
    // Reset offset if searching for something new.
    setOffset(48);
  }

  const handleKeydown = (e) => {
    if (autoComplete) {
      // Arrow key down
      if (e.keyCode === 40 && autoCompleteSelected < autoComplete.length - 1) {
        setAutoCompleteSelected(autoCompleteSelected + 1);
      }
      // Arrow key up
      else if (e.keyCode === 38 && autoCompleteSelected > -1) {
        setAutoCompleteSelected(autoCompleteSelected - 1);
      }
      // Enter
      else if (e.keyCode === 13) {

        // If the user presses enter to select an auto complete suggestion.
        if (autoCompleteSelected > -1) {
          setInput(autoComplete[autoCompleteSelected].name);
          resetAutocomplete();
        }

        // The user pressed enter to search their input.
        else {
          handleSubmit();
        }
      }
    }

    // If the user has no auto complete suggestions (either the request is still
    // pending or there are no results), and presses enter to submit their input.
    else if (e.keyCode === 13) {
      handleSubmit();
    }


  }

  /**
   * Function to reset auto complete state
   * variables.
   */
  const resetAutocomplete = () => {
    setAutocomplete(null);
    setAutoCompleteSelected(-1);
  }

  /**
   * Function to handle when a user wants to search GIFs.
   */
  const handleSubmit = () => {
    // Don't send another request if the input is the same as the previous request.
    if (input !== containerInput) {
      // We always want to immediately cancel the auto complete request if a user tries to submit
      // so we omit it from the debounce.
      if (autoCompleteRequest) {
        autoCompleteRequest.cancel('Canceled autocomplete request because user searched.');
      }
      debounceHandleSubmit();
    }
  }

  /**
   * The rest of handleSubmit that we want to debounce.
   */
  const handleSubmitRest = () => {
    getSearchGifData();
    resetAutocomplete();
    setContainerInput(input);
  }

  // Callback for handleSubmit debounce. Dependency arry includes input (so that the
  // search query doesn't become stale)
  const debounceHandleSubmit = useCallback(debounce(handleSubmitRest, 500), [input]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for something!"
          value={input}
          onKeyDown={handleKeydown}
          onChange={(e) => {
            setInput(e.target.value)
          }} />
        <InputGroup.Append>
          <Button variant="light" onClick={() => { handleSubmit(); }}>Search!</Button>
        </InputGroup.Append>
        {autoComplete && autoComplete.length > 0 &&
          <Row className='text-light rounded mx-0 mt-5' style={{ position: 'absolute', zIndex: 10, width: 'inherit', backgroundColor: 'rgba(0, 0, 0, 0.5' }}>
            <Col className='pt-2 px-0'>
              <ul className={styles.autoComplete} role='listbox'>
                {autoComplete.map((val, index) => {
                  return <li className={styles.autoCompleteItem} key={index} aria-selected={autoCompleteSelected === index} role='option' onClick={() => {
                    setInput(val.name);
                    setAutoCompleteSelected(-1);
                    setAutocomplete(null);
                  }}>
                    <div className={styles.autoCompleteText}>{val.name}</div>
                  </li>
                })}
              </ul>
            </Col>
          </Row>}
      </InputGroup>
      <h3
        className='text-light'><strong>{containerInput ? containerInput : 'trending'}</strong></h3>
      { gifResponse &&
        <h5 className='text-secondary'>{gifResponse.pagination.total_count ? gifResponse.pagination.total_count + ' GIFs found.' : ''}</h5>}
    </div>
  )
}