import { Row, Col } from 'react-bootstrap';
import GifItem from './GifItem';

/**
 * A row of GIFs, which maps its values to GifItems.
 * @param {object} props 
 * @param {object} props.row A row of GIFs
 */
export default function GifRow(props) {

  const row = props.row;

  return (
    <Row className='pb-3'>{
      row.map((gif, index) => {
        return (
          <Col xs={3} key={index}>
            <GifItem gif={gif} />
          </Col>
        )
      })}
    </Row>
  )
}