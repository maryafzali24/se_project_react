import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ onSelectCard, onCreateModal, clothingItems }) => {
  return (
    <section className="clothes-section">
      <div className="clothes-section__container">
        <h3 className="clothes-section__title">Your Items</h3>
        <button
          className="clothes-section__btn"
          type="button"
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          );
        })}
      </ul>
    </section>
  );
};

export default ClothesSection;
