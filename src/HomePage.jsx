import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateItemCount } from "./fooddata";
import styled from "styled-components";

const dish = {
  dish_id: "123",
  dish_name: "Example Dish",
  dish_description: "A tasty dish",
  dish_price: 10.99,
  dish_image: "dish.jpg",
  dish_currency: "USD",
  dish_calories: 500,
  dish_Type: 1,
  addonCat: [],
};

const HomePage = () => {
  const dispatch = useDispatch();
  const [dishCounts, setDishCounts] = useState({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const items = useSelector((state) => state.data.items);

  const activeCategoryDishes = useSelector((state) => state.data.activeCategoryDishes) || [];

  const handleIncrement = (dish_id) => {
    const newCount = (dishCounts[dish_id] || 0) + 1;
    setDishCounts({ ...dishCounts, [dish_id]: newCount });
    dispatch(updateItemCount({ dish_id, count: newCount }));
  };

  const handleDecrement = (dish_id) => {
    const currentCount = dishCounts[dish_id] || 0;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setDishCounts({ ...dishCounts, [dish_id]: newCount });
      dispatch(updateItemCount({ dish_id, count: newCount }));
    }
  };

  return (
    <MainContainer>
      {activeCategoryDishes.map((dish) => (
        <DishListWrapper key={dish.id}>
          <DishInfo>
            <DishFood>
              <DishIconContainer>
                <img
                  src={
                    dish.dish_Type === 1 ? "https://foodsafetyhelpline.com/wp-content/uploads/2013/05/non-veg-300x259.jpg" : "https://foodsafetyhelpline.com/wp-content/uploads/2013/05/veg-300x259.jpg"
                  }
                  alt="icon"
                />
              </DishIconContainer>
              <DishName>{dish.dish_name}</DishName>
            </DishFood>

            <DishPrice>
              {dish.dish_currency} {dish.dish_price}
            </DishPrice>
            <DishDescription>{dish.dish_description}</DishDescription>
            <QuantityControl>
              <button onClick={() => handleDecrement(dish.dish_id)}>-</button>
              <span className="count">{dishCounts[dish.dish_id] || 0}</span>
              <button onClick={() => handleIncrement(dish.dish_id)}>+</button>
            </QuantityControl>
            {dish.addonCat && dish.addonCat.length > 0 && <CustomizationIndicator>Customization Available</CustomizationIndicator>}
          </DishInfo>
          <DishImageContainer>
            <CaloriesInfo>{dish.dish_calories} Calories</CaloriesInfo>
            <StyledDishImage src={dish.dish_image} alt="dish icon" />
          </DishImageContainer>
        </DishListWrapper>
      ))}
    </MainContainer>
  );
};

export default HomePage;

export const MainContainer = styled.div`
  background-color: black;
`;
export const DishListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 20px 0;
  margin: auto;
  border-bottom: 1px solid #b2beb5;
  position: relative;
`;

// Container for dish details
export const DishInfo = styled.div`
  min-width: 50%;
`;
export const DishFood = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

// Container for the dish icon
export const DishIconContainer = styled.div`
  width: 16px;
  img {
    width: 100%;
    display: block;
  }
`;

// Styled component for the dish name
export const DishName = styled.span`
  font-size: 12px;
  white-space: nowrap;
  color: white;
`;

// Styled component for the dish price
export const DishPrice = styled.p`
  font-size: 12px;
  margin-top: 2px;
`;

// Styled component for the dish description
export const DishDescription = styled.small`
  color: #b2beb5;
  display: block;
  max-width: 50%;
  margin-top: 6px;
  font-size: 14px;
`;

// Styled component for quantity controls
export const QuantityControl = styled.div`
  display: flex;
  gap: 2px;
  background-color: #388e3c;
  border-radius: 9999px;
  padding: 4px;
  width: fit-content;
  margin: 20px 0;
  button {
    width: 24px;
    font-size: 15px;
    cursor: pointer;
    background: none;
    border: none;
    color: white;
  }
  .count {
    text-align: center;
    font-size: 14px;
  }
`;

// Styled component for customization indicator
export const CustomizationIndicator = styled.span`
  color: #d32f2f;
  font-size: 0.875rem;
  white-space: nowrap;
`;

// Container for the dish image and calorie information
export const DishImageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

// Styled component for calories information
export const CaloriesInfo = styled.span`
  font-size: 0.875rem;
  height: fit-content;
  width: 80px;
  margin-top: 40px;
  margin-right: 16px;
  color: white;
`;

// Styled component for the dish image
export const StyledDishImage = styled.img`
  border-radius: 0.375rem;
  width: 100px;
  height: 100px;
  object-fit: cover;
  @media (min-width: 640px) {
    width: 120px;
    height: 120px;
  }
  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
  @media (min-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;
