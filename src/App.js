import React from 'react';
import { Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import GifContainer from './components/GifContainer';

function App() {

  return (
    <Container>
      <div className='py-5'>
        <motion.h1
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
        >Ohana Coding Challenge 🎇</motion.h1>
        <h5
          className='text-secondary'>Click a GIF to show some more info!</h5>
      </div>
      <GifContainer />
    </Container>
  )
}

export default App;
