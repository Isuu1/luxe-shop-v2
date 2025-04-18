"use client";

import React from "react";
import Slider from "rc-slider";

//Styles
import styles from "./Filters.module.scss";
import "rc-slider/assets/index.css";
//Components
import Button from "@/shared/components/ui/Button";
//Icons
import { FaStar } from "react-icons/fa";

interface FiltersProps {
  //Overall possible range (for slider bounds)
  overallMinPrice: number;
  overallMaxPrice: number;
  //Current selected range (for slider value)
  currentMinPrice: number;
  currentMaxPrice: number;
  //Callback to notify parent of changes
  onRatingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceChange: (min: number, max: number) => void;
}

const Filters: React.FC<FiltersProps> = ({
  overallMinPrice,
  overallMaxPrice,
  currentMinPrice,
  currentMaxPrice,
  onRatingChange,
  onPriceChange,
}) => {
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      // Call the callback passed from the parent
      onPriceChange(min, max);
    }
  };

  const resetPriceFilter = () => {
    // Call the callback passed from the parent
    onPriceChange(overallMinPrice, overallMaxPrice);
  };

  // Prevent slider errors if max <= min (e.g., only one product)
  const isSliderDisabled = overallMinPrice >= overallMaxPrice;
  const sliderValue = isSliderDisabled
    ? [overallMinPrice, overallMinPrice]
    : [currentMinPrice, currentMaxPrice];

  const renderRatingElement = (value: number) => {
    return (
      <div className={styles.ratingElement} key={value}>
        <label htmlFor="rating"></label>
        <input
          id="rating"
          type="checkbox"
          value={value}
          defaultChecked
          onChange={onRatingChange}
        />
        <div className={styles.checkbox}></div>
        {Array.from({ length: value }, (_, index) => (
          <FaStar key={index} className={styles.star} />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.filtersContainer}>
      <h3>Filters</h3>
      <div className={styles.price}>
        <strong>Price</strong>
        <div className={styles.priceLabels}>
          <p>£{currentMinPrice}</p>
          <p>-</p>
          <p>£{currentMaxPrice}</p>
        </div>
        <Slider
          allowCross={false}
          range
          step={10}
          min={overallMinPrice}
          max={overallMaxPrice}
          onChange={handleSliderChange}
          value={sliderValue}
          disabled={isSliderDisabled}
        />
        <Button
          className={styles.resetPriceButton}
          variant="primary"
          type="button"
          text="Reset price"
          onClick={resetPriceFilter}
        />
      </div>

      <div className={styles.rating}>
        <strong>Rating</strong>
        {Array.from({ length: 5 }, (_, index) =>
          renderRatingElement(5 - index)
        )}
      </div>
    </div>
  );
};

export default Filters;
