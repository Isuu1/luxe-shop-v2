import React from "react";

//Animations
import { motion } from "motion/react";
//Styles
import styles from "./Search.module.scss";
//Icons
//import { RiSearchLine } from "react-icons/ri";

export const searchBarVariants = {
  hidden: {
    y: -100,
  },
  visible: {
    y: 0,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
  exit: {
    y: -100,
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

const Search: React.FC = () => {
  //const [searchQuery, setSearchQuery] = useState<string | null>(null);

  return (
    <motion.div
      className={styles.search}
      variants={searchBarVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      {/* <form className="mobile-search__form">
          <label>
            <RiSearchLine className="mobile-search__form__icon" />
            <input
              type="text"
              className="mobile-search__form__input"
              id="mobile-search__form__input"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </label>
          <div className="flex-center">
            {searchQuery && (
              <button
                className="mobile-search__form__clear-button"
                onClick={clearInput}
              >
                Clear
              </button>
            )}
            <button
              className="mobile-search__form__button"
              onClick={closeSearch}
            >
              X
            </button>
          </div>
        </form> */}
      {/* {searchQuery && (
          <p className="mobile-search__results-count">
            {`${matchingProducts.length} ${
              matchingProducts.length === 1
                ? "result for"
                : "results for"
            } `}
            <span className="bold">{searchQuery}</span>
          </p>
        )} */}

      {/* {matchingProducts.length === 0 && searchQuery && (
          <motion.p
            className="mobile-search__not-found"
            variants={opacityAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            Could not find products matching your search criteria
          </motion.p>
        )} */}
      {/* {matchingProducts.length !== 0 && (
          <ul className="mobile-search__results">
            {matchingProducts.map((item) => (
              <SearchItem key={item._id} item={item} />
            ))}
          </ul>
        )} */}
    </motion.div>
  );
};

export default Search;
