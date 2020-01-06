import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table } from 'reactstrap';
import { toast } from 'react-toastify'; // Toaster
import { errorToasterStyle } from '../../../toasterConfig';
import switchView from '../../../Action/viewAction';
import modifBookBody from '../../../Action/modifBookBodyAction';
import 'react-toastify/dist/ReactToastify.css'; // Toaster
import './Sidebar.css';

toast.configure(
  {
    autoClose: 8000,
    draggable: false,
  },
);

function Sidebar(props) {
  const [authorValidate, setAuthorValidate] = useState('');
  const [titleValidate, setTitleValidate] = useState('');
  const [subtitleValidate, setSubtitleValidate] = useState('');
  const [othersBooksValidate, setOthersBooksValidate] = useState('');
  const [dedicationValidate, setDedicationValidate] = useState('');
  const [quotesValidate, setQuotesValidate] = useState('');
  const [thanksValidate, setThanksValidate] = useState('');
  const [prefaceValidate, setPrefaceValidate] = useState('');
  const [listPartBook, setListPartBook] = useState([]);
  const [etape1, setEtape1] = useState(false);
  const [etape2, setEtape2] = useState(true);
  const [etape3, setEtape3] = useState(true);

  useEffect(() => {
    if (props.view === 'Author' || props.view === 'Title' || props.view === 'Subtitle' || props.view === 'OthersBooks') {
      setEtape1(false);
      setEtape2(true);
      setEtape3(true);
    }
    if (props.view === 'Congrats1' || props.view === 'Dedication' || props.view === 'Quotes' || props.view === 'Thanks' || props.view === 'Preface') {
      setEtape1(true);
      setEtape2(false);
      setEtape3(true);
    }
    if (props.view === 'Congrats2' || props.view === 'Bookbody' || props.view === 'ModifBookBody') {
      setEtape1(true);
      setEtape2(true);
      setEtape3(false);
    }
  }, [props.view]);

  useEffect(() => {
    setListPartBook(props.body);
    if (props.head.author.length > 0) {
      setAuthorValidate('validateAuthor');
    }
    if (props.view === 'Author') {
      setAuthorValidate('activeAuthor');
    }
    if (props.head.title.length > 0) {
      setTitleValidate('validateTitle');
    }
    if (props.head.title.length === 0) {
      setTitleValidate('colorTitle');
    }
    if (props.view === 'Title') {
      setTitleValidate('activeTitle');
    }
    if (props.head.subtitle.length > 0) {
      setSubtitleValidate('validateSubtitle');
    }
    if (props.head.subtitle.length === 0) {
      setSubtitleValidate('colorSubTitle');
    }
    if (props.view === 'Subtitle') {
      setSubtitleValidate('activeSubtitle');
    }
    if (props.head.otherBooks.length > 0) {
      setOthersBooksValidate('validateOthersBooks');
    }
    if (props.head.otherBooks.length === 0) {
      setOthersBooksValidate('colorOthersBooks');
    }
    if (props.view === 'OthersBooks') {
      setOthersBooksValidate('activeOthersBooks');
    }
    if (props.head.dedication.length > 0) {
      setDedicationValidate('validateDedication');
    }
    if (props.head.dedication.length === 0) {
      setDedicationValidate('colorDedication');
    }
    if (props.view === 'Dedication') {
      setDedicationValidate('activeDedication');
    }
    if (props.head.thanks.text.length > 0) {
      setThanksValidate('validateThanks');
    }
    if (props.head.thanks.text.length === 0) {
      setThanksValidate('colorThanks');
    }
    if (props.view === 'Thanks') {
      setThanksValidate('activeThanks');
    }
    if (
      props.head.preface.length > 0
      || props.head.prologue.length > 0
      || props.head.foreword.length > 0
      || props.head.preambule.length > 0
    ) {
      setPrefaceValidate('validatePreface');
    } else {
      setPrefaceValidate('colorPreface');
    }
    if (props.view === 'Preface') {
      setPrefaceValidate('activePreface');
    }
    if (props.head.quotes.length > 0) {
      setQuotesValidate('validateQuotes');
    }
    if (props.head.quotes.length === 0) {
      setQuotesValidate('colorQuotes');
    }
    if (props.view === 'Quotes') {
      setQuotesValidate('activeQuotes');
    }
  });
  const authorView = () => {
    props.dispatch(switchView('Author'));
  };

  const titleView = () => {
    if (props.head.author.length > 0) {
      props.dispatch(switchView('Title'));
    } else {
      toast.error('Merci de valider l\'auteur de votre livre', errorToasterStyle);
    }
  };

  const subtitleView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('Subtitle'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const othersBooksView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('OthersBooks'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const dedicationView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('Dedication'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const thanksView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('Thanks'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const prefaceView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('Preface'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const quotesView = () => {
    if (props.head.author.length > 0 && props.head.title.length > 0) {
      props.dispatch(switchView('Quotes'));
    } else {
      toast.error('Merci de valider l\'auteur et le titre de votre livre', errorToasterStyle);
    }
  };

  const modifBookBodyView = (index) => {
    props.dispatch(modifBookBody(index));
    props.dispatch(switchView('ModifBookBody'));
  };

  let partie = 0;
  let chap = 0;
  let subChap = 0;

  const partBook = (part) => {
    chap = 0;
    return `${part.type} ${partie += 1}`;
  };

  const chapterBook = (part) => {
    subChap = 0;
    return `${part.type} ${chap += 1}`;
  };

  const subChapterBook = part => `${part.type} ${subChap += 1}`;

  return (
    <div>
      <Table responsive>
        <tbody className="table">
          {
            etape1
              ? (

                <tr className="etape1" onClick={() => setEtape1(!etape1)}>
                  <th scope="row" className="Auteur">Etape 1</th>
                </tr>
              )
              : (
                <Fragment>
                  <tr className="etape1" onClick={() => setEtape1(!etape1)}>
                    <th scope="row">Etape 1</th>
                  </tr>
                  <tr className={authorValidate} onClick={() => authorView()}>
                    <th scope="row">Auteur</th>
                  </tr>
                  <tr className={titleValidate} onClick={() => titleView()}>
                    <th scope="row">Titre</th>
                  </tr>
                  <tr className={subtitleValidate} onClick={() => subtitleView()}>
                    <th scope="row">Sous-titre</th>
                  </tr>
                  <tr className={othersBooksValidate} onClick={() => othersBooksView()}>
                    <th scope="row">Autres livres</th>
                  </tr>
                </Fragment>
              )
          }
          {
            etape2
              ? (
                <tr className="etape2" onClick={() => setEtape2(!etape2)}>
                  <th scope="row">Etape 2</th>
                </tr>
              )
              : (
                <Fragment>
                  <tr className="etape2" onClick={() => setEtape2(!etape2)}>
                    <th scope="row">Etape 2</th>
                  </tr>
                  <tr className={dedicationValidate} onClick={() => dedicationView()}>
                    <th scope="row">Dédicaces</th>
                  </tr>
                  <tr className={quotesValidate} onClick={() => quotesView()}>
                    <th scope="row">Citations</th>
                  </tr>
                  <tr className={thanksValidate} onClick={() => thanksView()}>
                    <th scope="row">Remerciements</th>
                  </tr>
                  <tr className={prefaceValidate} onClick={() => prefaceView()}>
                    <th scope="row">Préface</th>
                  </tr>
                </Fragment>
              )
          }
          {etape3
            ? (
              <tr className="etape3" onClick={() => { setEtape3(!etape3); props.dispatch(switchView('Bookbody')); }}>
                <th scope="row">Etape 3</th>
              </tr>
            )
            : (
              <Fragment>
                <tr className="etape3" onClick={() => setEtape3(!etape3)}>
                  <th scope="row">Etape 3</th>
                </tr>
                {
                  listPartBook.length > 0 && listPartBook.map((part, index) => (
                    <tr
                      key={[index]}
                      className="listPartBookSidebar"
                      onClick={() => modifBookBodyView(index)}
                    >
                      <th>
                        <span>
                          {
                            part.type === 'Partie'
                              ? partBook(part)

                              : (
                                null)
                          }
                          {
                            part.type === 'Chapitre'
                              ? chapterBook(part)

                              : (
                                null)
                          }
                          {
                            part.type === 'Sous-chapitre'
                              ? subChapterBook(part)
                              : (
                                null)
                          }
                          {
                            part.type === 'Texte'
                              ? (
                                `${part.type}`
                              )
                              : (
                                null)
                          }
                        </span>
                      </th>
                    </tr>
                  ))
                }
              </Fragment>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}

const mapStateToProps = state => ({
  head: state.head,
  body: state.body,
  view: state.view,
});

export default connect(mapStateToProps)(Sidebar);

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  head: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    otherBooks: PropTypes.array,
    dedication: PropTypes.array,
    quotes: PropTypes.array,
    thanks: PropTypes.objectOf({
      position: PropTypes.string,
      text: PropTypes.string,
    }),
    preface: PropTypes.string,
    prologue: PropTypes.string,
    foreword: PropTypes.string,
    preambule: PropTypes.string,
  }),
  body: PropTypes.shape({
    edit: PropTypes.bool,
    type: PropTypes.string,
    text: PropTypes.string,
  }),
  view: PropTypes.string,
};

Sidebar.defaultProps = {
  dispatch: null,
  head: null,
  body: null,
  view: null,
};
