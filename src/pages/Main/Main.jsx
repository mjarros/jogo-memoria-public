import "./style.scss";
import cardsArray from "../../cards";
import cubosPuzzle from "../../assets/cubosPuzzle.svg";
import cardback from "../../assets/card-back.png";
import congrats from "../../assets/congrats.png";
import { useState, useRef } from "react";

function Main() {
  const [cards, setCards] = useState([]);
  const [modalAbertura, setModalAbertura] = useState(true);
  const numberTurned = useRef(0);
  const jogoFinalizado = useRef(false);

  function handleCloseModal() {
    setModalAbertura(!modalAbertura);
    handleResetButton();

  }

  function handleResetButton() {
    const arrayAtual = [...cardsArray];
    const novoArray = [];

    while (novoArray.length <= arrayAtual.length) {
      let posicaoPush = Math.floor(Math.random() * arrayAtual.length);
      let itemNovo = arrayAtual[posicaoPush];
      let itemIgual = false;

      for (let item of novoArray) {
        if (item.id === itemNovo.id) {
          itemIgual = true;
        }
      }

      if (itemIgual === false) {
        novoArray.push(itemNovo);
      }

      if (novoArray.length === arrayAtual.length) {
        break;
      }
    }

    jogoFinalizado.current = false;
    numberTurned.current = 0;
    for (let card of novoArray) {
      card.turned = false;
    }

    setCards(novoArray);
  }

  function handleTurnCards(event) {
    const newCards = [...cards];

    const findCard = newCards.find((card) => card.id === event);

    findCard.turned = true;
    numberTurned.current = numberTurned.current + 1;
    setCards(newCards);

    if (numberTurned.current >= 2) {
      let arrayVerificar = [];
      const newCards = [...cards];
      for (let card of newCards) {
        if (card.turned === true) {
          arrayVerificar.push(card);
        }
      }

      if (arrayVerificar[0].slug === arrayVerificar[1].slug) {
        setTimeout(() => {
          const setSplicePrimeiro = newCards.findIndex(
            (cardId) => arrayVerificar[0].id === cardId.id
          );
          newCards.splice(setSplicePrimeiro, 1);
          const setSpliceSegundo = newCards.findIndex(
            (cardId) => arrayVerificar[1].id === cardId.id
          );
          newCards.splice(setSpliceSegundo, 1);

          if (newCards.length === 0) {
            jogoFinalizado.current = true;
          }

          setCards(newCards);
        }, 1500);
      }

      setTimeout(() => {
        for (let card of newCards) {
          card.turned = false;
        }
        numberTurned.current = 0;
        setCards(newCards);
      }, 1500);
    }
  }

  return (
    <div className="container">
      <div className="left-div">
        <div className="left-div-span">
        <span>Memmory Puzzle
        </span>  

        <span>
        Desenvolvido por Marcio Jarros durante o curso de desenvolvimento de software da Cubos Academy, em 2022.
        </span>
        </div>
        <button onClick={() => handleResetButton()}>Iniciar / Reset</button>
      </div>

      <div className="right-div">
        <ul>
          {cards.map((card) => (
            <li key={card.id}>
              <img
                onClick={() => handleTurnCards(card.id)}
                className="card"
                src={card.turned ? card.image : cardback}
                alt={card.alt}
              ></img>
            </li>
          ))}
        </ul>
        <img
          className={`modal-congrats ${
            jogoFinalizado.current === true ? "" : "hidden"
          } `}
          src={congrats}
          alt="modal-congrats"
        ></img>
      </div>
      {modalAbertura &&  <div className="modal-abertura-explicacao" onClick={() => handleCloseModal()}>
        <div className="modal-abertura-explicacao-interno"><span>Jogo da Memória</span></div>
        </div>}
    </div>
  );
}

export default Main;
