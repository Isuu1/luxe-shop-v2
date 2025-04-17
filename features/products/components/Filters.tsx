"use client";

import React from "react";

//Styles
import styles from "./Filters.module.scss";
import Button from "@/shared/components/ui/Button";

const Filters = () => {
  return (
    <div className={styles.filtersContainer}>
      <h3>Filters</h3>
      <div className={styles.price}>
        <strong>Price</strong>
        <div className="filters-container__price__indicators">
          {/* <p>£{currentMinPrice}</p>

            <p>£{currentMaxPrice}</p> */}
        </div>
        {/* <Slider
            allowCross={false}
            range
            min={lowestPrice}
            max={highestPrice}
            onChange={handlePriceChange}
            value={[currentMinPrice, currentMaxPrice]}
          /> */}
        <Button
          variant="primary"
          type="button"
          text="Reset price"
          //onClick={resetPriceFilter}
        />
      </div>

      <div className={styles.rating}>
        <strong>Rating</strong>
        {/* <FiltersRatingSelector
            value={5}
            fullStars={5}
            halfStars={0}
          />
          <FiltersRatingSelector
            value={4}
            fullStars={4}
            halfStars={1}
          />
          <FiltersRatingSelector
            value={3}
            fullStars={3}
            halfStars={2}
          />
          <FiltersRatingSelector
            value={2}
            fullStars={2}
            halfStars={3}
          />
          <FiltersRatingSelector
            value={1}
            fullStars={1}
            halfStars={4}
          /> */}
      </div>
    </div>
  );
};

export default Filters;
