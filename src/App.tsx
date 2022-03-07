import { useEffect, useState } from "react";
import { Card, CardImage } from "./interfaces";
import SingleCard from "./components/SingleCard";
import "./App.scss";

const cardImages: CardImage[] = [
  { src: "img/helmet-1.png" },
  { src: "img/potion-1.png" },
  { src: "img/ring-1.png" },
  { src: "img/scroll-1.png" },
  { src: "img/shield-1.png" },
  { src: "img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceTwo === null) return;

    if (choiceOne?.src === choiceTwo?.src) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });

      return resetTurn();
    }

    setTimeout(() => resetTurn(), 1000);
  }, [choiceTwo]);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), matched: false } as Card));

    setCards(shuffleCards);
    setTurns(0);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  const handleChoice = (card: Card) => {
    if (choiceTwo !== null) return;

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
