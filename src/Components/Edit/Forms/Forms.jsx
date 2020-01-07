import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Author from './Author/Author';
import Title from './Title/Title';
import Subtitle from './Subtitle/Subtitle';
import OthersBooks from './OthersBooks/OthersBooks';
import Congrats1 from '../../Congrats1/Congrats1';
import Congrats2 from '../../Congrats2/Congrats2';
import Dedication from './Dedication/Dedication';
import Quotes from './Quotes/Quotes';
import Thanks from './Thanks/Thanks';
import Preface from './Preface/Preface';
import BookBody from './BookBody/BookBody';
import ModifBookBody from './ModifBookBody/ModifBookBody';
import ChoicePdf from '../../ChoicePdf/ChoicePdf';
import './Forms.css';

function Forms({ view }) {
  return (
    <div>
      {view === 'Author' && <Author />}
      {view === 'Title' && <Title />}
      {view === 'Subtitle' && <Subtitle />}
      {view === 'OthersBooks' && <OthersBooks />}
      {view === 'Congrats1' && <Congrats1 />}
      {view === 'Dedication' && <Dedication />}
      {view === 'Quotes' && <Quotes />}
      {view === 'Thanks' && <Thanks />}
      {view === 'Preface' && <Preface />}
      {view === 'Congrats2' && <Congrats2 />}
      {view === 'Bookbody' && <BookBody />}
      {view === 'ModifBookBody' && <ModifBookBody />}
      {view === 'ChoicePdf' && <ChoicePdf />}
    </div>
  );
}

const mapStateToProps = state => ({
  view: state.view,
});

export default connect(mapStateToProps)(Forms);

Forms.propTypes = {
  view: PropTypes.string,
};

Forms.defaultProps = {
  view: null,
};
