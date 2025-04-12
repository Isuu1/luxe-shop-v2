import React from "react";

//Icons
import { FaSliders } from "react-icons/fa6";
//Styles
import styles from "@/features/products/components/SortingOptions.module.scss";

interface SortingOptionsProps {
  setSortingOption: (option: string) => void;
}

const SortingOptions: React.FC<SortingOptionsProps> = ({
  setSortingOption,
}) => {
  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortingOption(e.target.value);
  };

  return (
    <div className={styles.sortingOptions}>
      <label className={styles.label}>
        <FaSliders style={{ fontSize: "1.3rem" }} />
      </label>
      <select className={styles.selector} onChange={handleSorting}>
        <option value="Relevance">Relevance</option>
        <option value="PriceLowToHigh">Price - low to high</option>
        <option value="PriceHighToLow">Price - high to low</option>
        <option value="RatingLowToHigh">Rating - low to high</option>
        <option value="RatingHighToLow">Rating - high to low</option>
      </select>
    </div>
  );
};

export default SortingOptions;
