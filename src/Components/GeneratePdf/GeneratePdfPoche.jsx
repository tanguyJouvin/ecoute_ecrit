import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Button } from 'reactstrap';
import pdfMake from 'pdfmake/build/pdfmake';
// import PdfPrinter from 'pdfmake/build/pdfmake';
import pdfFonts from '../../fonts/vfs_fonts';
import logo from './logo';
import './GeneratePdf.css';
// import fs from 'fs';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
// Dimensions page A5 (pts)
const hauteur = 510.236;
const largeur = 311.811;
const marginSide = 45.35;
const marginTop = 36.85;
const marginBottom = 53.85;
const espace = 8;
// Calcul calibrage - normes éditoriales
const calibrageMarginLeft = hauteur / (2 * (1 + hauteur / largeur));
const calibrageMarginTop = (hauteur / 2) - calibrageMarginLeft;


pdfMake.fonts = {
  cinzel: {
    normal: 'Cinzel-Regular.ttf',
    bold: 'Cinzel-Bold.ttf',
  },
  cormorantGaramond: {
    normal: 'CormorantGaramond-Regular.ttf',
    bold: 'CormorantGaramond-Bold.ttf',
    italics: 'CormorantGaramond-Italic.ttf',
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
};

function GeneratePdf(props) {
  const generate = () => {
    const { head } = props;
    const { body } = props;
    const memeAuteur = () => {
      if (head.otherBooks.length > 0) {
        return (
          {
            text: ('Du même auteur'),
            style: 'Même Auteur',
            pageBreak: 'before',
          });
      } return null;
    };

    const otherbooks = head.otherBooks.map((book, index) => {
      if (index === 0 && head.otherBooks.length === 1) {
        return {
          style: 'Autres Livres',
          text: `${book.book}, ${book.edition}, ${book.year}`,
          margin: [0, calibrageMarginTop - marginTop, 0, 0],
          pageBreak: 'after',
        };
      } if (index === 0) {
        return {
          style: 'Autres Livres',
          text: `${book.book}, ${book.edition}, ${book.year}`,
          margin: [0, calibrageMarginTop - marginTop, 0, 0],
        };
      } if (index !== 0 && index < head.otherBooks.length - 1) {
        return {
          style: 'Autres Livres',
          text: `${book.book}, ${book.edition}, ${book.year}`,
          margin: [0, espace, 0, 0],
        };
      } if (index === head.otherBooks.length - 1) {
        return {
          style: 'Autres Livres',
          text: `${book.book}, ${book.edition}, ${book.year}`,
          margin: [0, espace, 0, 0],
          pageBreak: 'after',
        };
      } return null;
    });

    const title = () => { 
      if (head.otherBooks.length > 0) {
      return {
      text: head.title, style: 'Faux titre', margin: [0, calibrageMarginTop, 0, 0] 
      }
    }return {
      text: head.title, style: 'Faux titre', pageBreak: 'before', margin: [0, calibrageMarginTop, 0, 0] 
    }};
    const subtitle = {
      text: head.subtitle,
      style: 'Faux sous-titre',
      margin: [0, espace, 0, 0],
      pageBreak: 'after',
    };

    const dateOfDay = new Date();
    const mentionsLegales = {
      style: 'Mention Légales',
      text: [
        { text: 'Tous droits réservés pour tous pays.\n\n', italics: true, margin: [0, 2.8] },
        { text: `${dateOfDay.getFullYear().toString()}, ${head.author}\n` },
        'www.editeonline.fr\n',
        'ISBN : x-xxx-xxxx-x\n',
        { text: `Dépôt légal : ${dateOfDay.getMonth().toString()} ${dateOfDay.getFullYear().toString()}` },
      ],
      margin: [0, 340],
      alignment: 'center',
      pageBreak: 'after',
    };

    const author = { text: head.author, style: 'Auteur' };
    const title2 = {
      text: head.title,
      style: 'Titre',
      lineSpacing: espace,
      margin: [0, 90, 0, 0],
    };
    const subtitle2 = { text: head.subtitle, style: 'Sous-titre', margin: [20, espace, 20, 0] };
    const logoEditeOnline = {
      image: logo,
      style: 'logo',
      width: 30,
      pageBreak: 'after',
      absolutePosition: { x: largeur / 2 - marginSide * 2.30, y: hauteur - marginBottom - 30 },
      margin: [0, 180, 0, 0],
    };
    const dedicaces = head.dedication.map((dedicace, index) => {
      if (index === 0 && head.dedication.length === 1) {
        return {
          style: 'Dédicace',
          text: `${dedicace.name}`,
          margin: [calibrageMarginLeft - marginSide, calibrageMarginTop - marginTop, 0, espace],
          pageBreak: 'after',
        };
      } if (index === 0) {
        return {
          style: 'Dédicace',
          text: `${dedicace.name}`,
          margin: [calibrageMarginLeft - marginSide, calibrageMarginTop - marginTop, 0, espace],
        };
      } if (index !== 0 && index < head.dedication.length - 1) {
        return {
          style: 'Dédicace',
          text: `${dedicace.name}`,
          margin: [calibrageMarginLeft - marginSide, 0, 0, espace],
        };
      } if (index === head.dedication.length - 1) {
        return {
          style: 'Dédicace',
          text: `${dedicace.name}`,
          margin: [calibrageMarginLeft - marginSide, 0, 0, espace],
          pageBreak: 'after',
        };
      } return null;
    });

    const citations = head.quotes.map((quote, index) => {
      if (index === 0 && head.quotes.length === 1) {
        return {
          style: 'Citations',
          text: `«${quote.quote}»\n ${quote.author}`,
          margin: [calibrageMarginLeft - marginSide, calibrageMarginTop - marginTop, 0, espace],
          pageBreak: 'after',
        };
      }
      if (index === 0) {
        return {
          style: 'Citations',
          text: `«${quote.quote}»\n ${quote.author}`,
          margin: [calibrageMarginLeft - marginSide, calibrageMarginTop - marginTop, 0, espace],
        };
      } if (index !== 0 && index < head.quotes.length - 1) {
        return {
          style: 'Citations',
          text: `«${quote.quote}»\n ${quote.author}`,
          margin: [calibrageMarginLeft - marginSide, 0, 0, espace],
        };
      } if (index === head.quotes.length - 1) {
        return {
          style: 'Citations',
          text: `«${quote.quote}»\n ${quote.author}`,
          margin: [calibrageMarginLeft - marginSide, 0, 0, espace],
          pageBreak: 'after',
        };
      } return null;
    });

    const thanksBefore = () => {
      if (head.thanks.position === 'debut' && head.thanks.text.length>0) {
        return [
          {
            text: ('Remerciements'),
            style: 'Titre Remerciements',
          },
          {
            style: 'Remerciements',
            text: `${head.thanks.text}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } return null;
    };


    const preface = () => {
      if (head.prologue) {
        return [
          {
            text: ('Prologue'),
            style: 'Titre Preface',
          },
          {
            style: 'Preface',
            text: `${head.prologue}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } if (head.preface) {
        return [
          {
            text: ('Préface'),
            style: 'Titre Preface',
          },
          {
            style: 'Preface',
            text: `${head.preface}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } if (head.foreword) {
        return [
          {
            text: ('Avant-propos'),
            style: 'Titre Preface',
          },
          {
            style: 'Preface',
            text: `${head.foreword}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } if (head.preambule) {
        return [
          {
            text: ('Préambule'),
            style: 'Titre Preface',
          },
          {
            style: 'Preface',
            text: `${head.preambule}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } return null;
    };


    // Edition HEAD
    const headBook = [
      memeAuteur(),
      otherbooks,
      title(),
      subtitle,
      mentionsLegales,
      author,
      title2,
      subtitle2,
      logoEditeOnline,
      dedicaces,
      citations,
      thanksBefore(),
      preface(),
    ];

    let numPart = 0;
    let numChap = 0;
    let numSubChap = 0;
    const bodyBook = body.map((section, index) => {
      if (body[index].type === 'Partie') {
        numPart += 1;
        numChap = 0;
        if (numPart > 1) {
          return (
            {
              style: section.type,
              text: `${section.text}`,
              margin: [0, calibrageMarginTop - marginTop, 0, 0],
              pageBreak: 'before',
            }
          );
        }
        return (
          {
            style: section.type,
            text: `${section.text}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
          }
        );
      }
      if (body[index].type === 'Chapitre') {
        numChap += 1;
        numSubChap = 0;
        return (
          {
            style: section.type,
            text: `${section.text}`,
            margin: [calibrageMarginLeft - marginSide, calibrageMarginTop - marginTop, 0, 30],
            pageBreak: 'before',
          }
        );
      }
      if (body[index].type === 'Sous-chapitre') {
        numSubChap += 1;
        if (body[index - 1].type === 'Texte' && body[index - 2].type === 'Chapitre') {
          return (
            {
              style: section.type,
              text: `${section.text}`,
              margin: [calibrageMarginLeft - marginSide, 30, 0, 30],
            }
          );
        }
        if (numSubChap > 1) {
          return (
            {
              style: section.type,
              text: `${section.text}`,
              margin: [calibrageMarginLeft - marginSide, 30, 0, 30],
            }
          );
        } return (
          {
            style: section.type,
            text: `${section.text}`,
            margin: [calibrageMarginLeft - marginSide, 0, 0, 30],
          }
        );
      }
      if (body[index].type === 'Texte') {
        if (body[index - 1].type === 'Partie') {
          return (
            {
              pageBreak: 'before',
              style: section.type,
              text: section.text,
            }
          );
        }
        return (
          {
            style: section.type,
            text: section.text,
          }
        );
      } return null;
    });

    const thanksAfter = () => {
      if (head.thanks.position === 'fin' && head.thanks.text.length>0) {
        return [
          {
            text: ('Remerciements'),
            style: 'Titre Remerciements',
            pageBreak: 'before',
          },
          {
            style: 'Remerciements',
            text: `${head.thanks.text}`,
            margin: [0, calibrageMarginTop - marginTop, 0, 0],
            pageBreak: 'after',
          }];
      } return null;
    };

    const acheveBook = {
      style: 'Achevé dImprimer',
      text: [
        'Achevé d’imprimer\n',
        'sur les presses de\n',
        'xxx',
      ],
      alignment: 'center',
      pageBreak: 'before',
      margin: [0, calibrageMarginTop, 0, 0],
    };

    const dd = {
      pageSize: {
        width: largeur,
        height: hauteur,
      },
      pageMargins: [marginSide, marginTop, marginSide, marginBottom], // left, top, right, bottom
      defaultStyle: {
        font: 'cormorantGaramond',
      },
      footer: function (currentPage) {
        return [
          {
            text: currentPage.toString(),
            alignment: 'center',
            font: 'cinzel',
            fontSize: 10,
          },
        ];
      },
      content: [...headBook, bodyBook, thanksAfter(), acheveBook],
      styles: {
        Auteur: {
          alignment: 'center',
          fontSize: 18,
          normal: true,
          font: 'cinzel',
        },
        'Faux titre': {
          alignment: 'center',
          fontSize: 20,
          font: 'cinzel',
        },
        Titre: {
          alignment: 'center',
          fontSize: 28,
          font: 'cinzel',
        },
        'Même Auteur': {
          fontSize: 12,
          alignment: 'center',
          font: 'cinzel',
        },
        'Autres Livres': {
          fontSize: 12,
          alignment: 'center',
          italics: true,
        },
        'Faux sous-titre': {
          fontSize: 14,
          alignment: 'center',
          font: 'cinzel',
        },
        'Sous-titre': {
          fontSize: 20,
          alignment: 'center',
          font: 'cinzel',
        },
        logo: {
          fontSize: 14,
          alignment: 'center',
        },
        'Mention Légales': {
          fontSize: 9,
          font: 'cormorantGaramond',
        },
        Dédicace: {
          fontSize: 12,
          italics: true,
          alignment: 'right',
          font: 'cormorantGaramond',
        },
        Citations: {
          fontSize: 12,
          alignment: 'right',
          font: 'cormorantGaramond',
        },
        'Titre Remerciements': {
          fontSize: 14,
          alignment: 'center',
          font: 'cinzel',
        },
        Remerciements: {
          fontSize: 12,
          alignment: 'justify',
          font: 'cormorantGaramond',
        },
        'Titre Preface': {
          fontSize: 14,
          alignment: 'center',
          font: 'cinzel',
        },
        Preface: {
          fontSize: 12,
          alignment: 'justify',
          font: 'cormorantGaramond',
        },
        Partie: {
          fontSize: 24,
          alignment: 'center',
          font: 'cinzel',
          bold: true,
        },
        Chapitre: {
          fontSize: 16,
          font: 'cinzel',
          bold: true,
        },
        'Sous-chapitre': {
          fontSize: 14,
          font: 'cormorantGaramond',
          italics: true,
        },
        Texte: {
          fontSize: 12,
          alignment: 'justify',
          font: 'cormorantGaramond',
        },
        'Achevé dImprimer': {
          fontSize: 9,
          font: 'cormorantGaramond',
        },
      },

    };
    pdfMake.createPdf(dd).download(`${head.title} - livre de poche.pdf`);
  };

  return (
    <div className="App">
      <Button className="buttonPdf" onClick={generate}>Livre de poche</Button>
    </div>
  );
}

const mapStateToProps = state => ({
  head: state.head,
  body: state.body,
});

export default connect(mapStateToProps)(GeneratePdf);

GeneratePdf.propTypes = {
  head: PropTypes.shape({
    author: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    thanks: PropTypes.object,
    otherBooks: PropTypes.array,
    dedication: PropTypes.array,
    quotes: PropTypes.array,
    prologue: PropTypes.string,
    preface: PropTypes.string,
    foreword: PropTypes.string,
    preambule: PropTypes.string,
  }),
  body: PropTypes.objectOf({
    edit: PropTypes.bool,
    type: PropTypes.string,
    text: PropTypes.string,
  }),
};


GeneratePdf.defaultProps = {
  head: null,
  body: null,
};
