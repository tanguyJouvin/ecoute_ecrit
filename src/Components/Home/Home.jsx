import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
// import bgIndex from '../../pics/bgIndex.png';
import './Home.css';

function Home() {
  const [text, setText] = useState('');
  const [width, setWidth] = useState(0) 

  let i = 0;
  let type = '';
  const sentence = 'Bonjour et bienvenue sur EditéOnline !';

  const typeWriter1 = () => {
    if (i < sentence.length) {
      type = [...type, sentence[i]].join('');
      setText(type);
      i += 1;
      setTimeout(typeWriter1, 70);
    }
  };

  useEffect(() => {
    typeWriter1(text);
    setWidth(window.innerWidth)
  }, []);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <div>
    {width>=1335 ?
    <div className="inputContainer" id="backgroundHome">
          
      <div className="Home">
        <p className="content">
          <span className="typewrite anim-typewrite js-typewrite">{text}</span>
        </p>
        <p className="homeText">La plateforme de mise en page assistée et de correction de livre en ligne.</p>
        <Link to={`${process.env.PUBLIC_URL}/menu`} component={Menu}>
          <Button className="pinkHomeButton">Entrez</Button>
        </Link>
      </div>
    </div>
          :
      <div className="screenTooLittle">
        <Container>
          <p className="content">
            <span className="typewrite anim-typewrite js-typewrite">{text}</span>
          </p>
        <Card className="screenCard">
          <p className="homeText">La plateforme de mise en page assistée et de correction de livre en ligne.</p>
          <p className="homeText screen">Pour pouvoir profiter de cette plateforme, la largeur de votre écran doit être supérieure !</p>
        </Card>
        </Container>
      </div>
          }
</div>
  );
}

export default Home;
