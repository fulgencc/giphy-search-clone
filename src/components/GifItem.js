import { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';

/**
 * A GIF item. Just a Card with some animation.
 * The GifItem also makes sure images have been loaded before displaying.
 * @param {object} props 
 * @param {object} props.gif A GIF.
 */
export default function GifItem(props) {

    const gif = props.gif;
    const [isLoaded, setIsLoaded] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    // Placeholder for GifItem when image is still loading.
    const Placeholder = () => {
        return (
            <div style={{ height: `${gif.images.fixed_height.height}px`, width: '100%' }}>
                <Spinner style={{ position: 'relative', top: '40%', left: '45%' }} animation='border' />
            </div>
        )
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            onClick={() => { setShowInfo(!showInfo) }}
        >
            <Card key={gif.id}>
                {!showInfo && <Card.Img src={gif.images.fixed_height.url} style={isLoaded ? {} : { display: 'none' }} onLoad={() => setIsLoaded(true)} alt={gif.title} />}
                {!showInfo && !isLoaded && <Placeholder />}
                {showInfo && <Card.Body style={{ height: `${gif.images.fixed_height.height}px`, width: '100%' }}>
                    <h6><small>{gif.title}</small></h6>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        <li>
                            <small className='text-muted'>user - {gif.username ? gif.username : 'None'}</small>
                        </li>
                        <li>
                            {gif.source_tld && <small className='text-muted'>{gif.source_tld}</small>}
                        </li>
                        <li>
                            {<small className='text-muted'>{new Date(gif.import_datetime).toLocaleDateString('en-us')}</small>}
                        </li>
                    </ul>
                </Card.Body>}

            </Card>
        </motion.div>
    )

}