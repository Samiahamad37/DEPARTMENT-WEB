import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About_fixed';
import Collaboration from './pages/Collaboration';
import Research from './pages/Research';
import Facilities from './pages/Facilities';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Data from './pages/Data';
import Information from './pages/Information';
import Networking from './pages/Networking';
import Masters from './pages/Masters';
import News from './pages/News';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/collaboration" element={<Collaboration />} />
          <Route path="/research" element={<Research />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/data" element={<Data />} />
          <Route path="/information" element={<Information />} />
          <Route path="/networking" element={<Networking/>} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/news" element={<News/>} />

          



        </Routes>
      </Layout>
    </Router>
  );
}

export default App;