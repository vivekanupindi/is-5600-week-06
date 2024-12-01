import React, { useState } from "react"; // Importing React and useState hook

// Importing components
import Card from './Card';
import Search from './Search';
import Button from './Button';

// Component to display a paginated list of cards
const CardList = ({ data }) => {
  const limit = 10; // Limit of products per page
  const [offset, setOffset] = useState(0); // State to manage current offset (starting index for pagination)
  const [products, setProducts] = useState(data); // State to manage the list of products

  // Function to handle pagination (Previous/Next)
  const handlePagination = (direction) => {
    const newOffset = direction === "next" ? offset + limit : offset - limit;
    if (newOffset >= 0 && newOffset < products.length) {
      setOffset(newOffset); // Update the offset only if within valid bounds
    }
  };

  // Function to get the products for the current page (based on the offset)
  const getPaginatedProducts = () => {
    return products.slice(offset, offset + limit); // Slice the product list to only show `limit` items per page
  };

  // Function to filter products based on tags
  const filterTags = (tag) => {
    const filtered = data.filter(product => {
      if (!tag) {
        return product; // If no tag is provided, return all products
      }
      // Check if the product has a tag that matches the provided tag
      return product.tags.find(({ title }) => title === tag);
    });
    setOffset(0); // Reset pagination to the first page after filtering
    setProducts(filtered); // Update the product list with the filtered items
  };

  // JSX returned by the component
  return (
    <div className="cf pa2"> {/* Container with padding and other classes */}
      <Search handleSearch={filterTags} /> {/* Search component to filter products */}

      <div className="mt2 mb2"> {/* Wrapper for the list of cards */}
        {getPaginatedProducts().map((product) => (
          <Card key={product.id} {...product} /> // Render each product as a Card
        ))}
      </div>

      <div className="flex items-center justify-center pa4"> {/* Pagination buttons */}
        <Button
          text="Previous"
          handleClick={() => handlePagination("prev")}
          disabled={offset === 0} // Disable Previous button on the first page
        />
        <Button
          text="Next"
          handleClick={() => handlePagination("next")}
          disabled={offset + limit >= products.length} // Disable Next button on the last page
        />
      </div>
    </div>
  );
};

export default CardList; // Exporting the CardList component as default
