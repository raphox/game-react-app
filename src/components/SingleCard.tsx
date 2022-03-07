import { Card } from "../interfaces";
import "./SingleCard.scss";

interface SingleCardProps {
  card: Card;
  flipped: boolean;
  handleChoice: (card: Card) => void;
}

const SingleCard = ({ card, flipped, handleChoice }: SingleCardProps) => {
  const handleClick = () => {
    !flipped && handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : undefined}>
        <img className="front" src={card.src} alt={card.title} />
        <img
          className="back"
          src="img/cover.png"
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default SingleCard;
