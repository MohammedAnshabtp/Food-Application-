import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FaCartArrowDown } from "react-icons/fa";
import { fetchData, setActiveCategory, setActiveFoods } from "./fooddata";

const Header = (props) => {
  const { count } = props;
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data.items);
  const activeCategory = useSelector((state) => state.data.activeCategory);
  // const cartCount = useSelector((state) => state.data.cartCount);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (items?.data[0]?.table_menu_list && items.data[0].table_menu_list.length > 0) {
      const initialCategory = items.data[0].table_menu_list[0];
      dispatch(setActiveCategory(initialCategory));
      dispatch(setActiveFoods(initialCategory.category_dishes));
    }
  }, [items, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
    dispatch(setActiveFoods(category.category_dishes));
  };

  return (
    <MainContainer>
      <StyledHeader>
        <BrandContainer>
          <BrandTitle>Artisan Resto Cafe</BrandTitle>
        </BrandContainer>
        <OrdersCartContainer>
          <span>My Orders</span>
          <CartIconContainer>
            <FaCartArrowDown />
            {count > 0 && <StyledCartCount>{count}</StyledCartCount>}
          </CartIconContainer>
        </OrdersCartContainer>
      </StyledHeader>
      <StyledMenuListContainer>
        <ul className="menuList">
          {items?.data[0]?.table_menu_list?.map((item, index) => {
            const isActive = item.menu_category_id === activeCategory?.menu_category_id;
            return (
              <StyledMenuItem isActive={isActive} key={index} onClick={() => handleCategoryClick(item)}>
                {item.menu_category}
              </StyledMenuItem>
            );
          })}
        </ul>
      </StyledMenuListContainer>
    </MainContainer>
  );
};

export default Header;
export const MainContainer = styled.div`
  background-color: black;
`;
const BrandContainer = styled.div`
  text-align: center;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const BrandTitle = styled.h1`
  font-size: 2em;
  color: white;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;
const StyledHeader = styled.header`
  background-color: black;
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 14px;
  width: 90%;
  margin: auto;
  align-items: center;
  padding: 10px;
`;

const CartIconContainer = styled.div`
  font-size: 1.25rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
`;

const StyledCartCount = styled.span`
  position: absolute;
  top: -10px;
  right: 10px;
  background-color: #ff4500;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const OrdersCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 10px;
  span {
    color: white;
  }
`;

const StyledMenuListContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: black;

  .menuList {
    display: flex;
    gap: 20px;
    padding: 15px;
    list-style-type: none;
  }
`;

const StyledMenuItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.3s;
  color: ${({ isActive }) => (isActive ? "#ff4500" : "white")};
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #ff4500" : "none")};
  &:hover {
    color: #ff4500;
  }
`;
