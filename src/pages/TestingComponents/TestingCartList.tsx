import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProductCartList } from "../../components/features/cart/ProductCartList";
import { ProductCartListItem } from "../../components/features/cart/ProductCartListItem";

interface ProductType{
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
}

interface ProductCartType{
  product: ProductType;
  quantity: number;
}

const IS_POPUP_CART = false;

// path : url/testing_cart_list
// the component is really reusable:)
// only need to pass the products (preferably ProductCartType)
// create handleRemove and quantityChange as you wish
// set up isPopUpCart if you want to use it as, ofc, a pop up to have a small preview of your cart
export const TestingCartList: React.FC = () => {
  const [cartproducts, setCartProducts] = useState<ProductCartType[]>(
    Array.from({ length: 8 }, (_, i) => ({
      product: {
        id: i + 1,
        name: `Produs ${i + 1}`,
        price: Math.random() * 100 + 50,
        currency: "RON",
        image: `https://picsum.photos/seed/${i}/200/200`,
      },
      quantity: 1,
    }))
  );

  const handleRemove = (index: number) => {
    setCartProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index: number, newQuantity: number) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  return (
    <>
      <Container>
        <Box>
          <Typography>Cart List Component</Typography>
          <ProductCartList
            title="Produse"
            items={cartproducts}
            renderItem={(product, index) => (
              <ProductCartListItem isPopUpCart={IS_POPUP_CART} product={product} index={index} />
            )}
            isPopUpCart={IS_POPUP_CART}
            onQuantityChange={handleQuantityChange}
            onRemove={(index) => handleRemove(index)}
          />
        </Box>
      </Container>
    </>
  );
};
