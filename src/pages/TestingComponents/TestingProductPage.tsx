import { Container} from "@mui/material";
import { ProductPage } from "../Product/ProductPage";
import { Product} from "../../types/home/types";

// Mock product pentru testare
const mockProduct: Product = {
  id: 1,
  name: "Produs Test",
  price: 199,
  currency: "RON",
  image: "https://picsum.photos/seed/1/400/400",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
  category: "Electronics",
  stock: 10,
  reviews: [
    { id: 1, user_id: 1, product_id: 1, comment: "Foarte bun!", rating: 5, created_at: "2025-09-11" },
    { id: 2, user_id: 2, product_id: 1, comment: "Merge bine, conform asteptarilor", rating: 5, created_at: "2025-09-01" },
    { id: 3, user_id: 3, product_id: 1, comment: "Per total multumit.", rating: 4, created_at: "2025-09-01" },
  ],
};

export const TestingProductPage: React.FC = () => {
  return (
    <Container>
      <ProductPage product={mockProduct} reviews={mockProduct.reviews} />
    </Container>
  );
};