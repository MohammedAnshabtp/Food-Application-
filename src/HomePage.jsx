import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateItemCount } from "./fooddata";
import styled from "styled-components";
import Header from "./Header";

const HomePage = () => {
  const dispatch = useDispatch();
  const [foodCount, setFoodCount] = useState({});

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const activeFoods = useSelector((state) => state.data.activeFoods) || [];

  const handleIncrement = (dish_id) => {
    const newCount = (foodCount[dish_id] || 0) + 1;
    setFoodCount({ ...foodCount, [dish_id]: newCount });
    dispatch(updateItemCount({ dish_id, count: newCount }));
  };

  const handleDecrement = (dish_id) => {
    const currentCount = foodCount[dish_id] || 0;
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setFoodCount({ ...foodCount, [dish_id]: newCount });
      dispatch(updateItemCount({ dish_id, count: newCount }));
    }
  };

  const totalSum = Object.values(foodCount).reduce((acc, currentValue) => acc + currentValue, 0);

  return (
    <MainContainer>
      <Header count={totalSum} />
      {activeFoods.map((dish) => (
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
              <span className="count">{foodCount[dish.dish_id] || 0}</span>
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

const MainContainer = styled.div`
  background-color: black;
`;
const DishListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding: 20px 0;
  margin: auto;
  border-bottom: 1px solid #b2beb5;
  position: relative;
`;

const DishInfo = styled.div`
  min-width: 50%;
`;
const DishFood = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const DishIconContainer = styled.div`
  width: 16px;
  img {
    width: 100%;
    display: block;
  }
`;

const DishName = styled.span`
  font-size: 12px;
  white-space: nowrap;
  color: white;
`;

const DishPrice = styled.p`
  font-size: 12px;
  margin-top: 2px;
`;

const DishDescription = styled.small`
  color: #b2beb5;
  display: block;
  max-width: 50%;
  margin-top: 6px;
  font-size: 14px;
`;
const QuantityControl = styled.div`
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

const CustomizationIndicator = styled.span`
  color: #d32f2f;
  font-size: 0.875rem;
  white-space: nowrap;
`;
const DishImageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const CaloriesInfo = styled.span`
  font-size: 0.875rem;
  height: fit-content;
  width: 80px;
  margin-top: 40px;
  margin-right: 16px;
  color: white;
`;
const StyledDishImage = styled.img`
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
