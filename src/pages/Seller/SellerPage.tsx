import {
  Avatar,
  Container,
  Typography,
  Chip,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { ProductType } from "../../types/product/product";
import { ProductCarousel } from "../../components/features/products/ProductCarousel";
import { useProducts } from "../../context/ProductContext";

type SellerPageParams = {
  slug: string;
};

type SellerProfile = {
  name: string;
  photoUrl?: string;
  joinDate: string;
  email?: string;
  phone?: string;
  products: ProductType[];
};


export const SellerPage: React.FC = () => {
  const { slug } = useParams<SellerPageParams>();

  const mockProducts = useProducts().mockProducts.splice(0, 3); 
  const mockSellerData: SellerProfile = {
    name: "Ion Popescu",
    joinDate: "2023-08-15",
    email: "ion.popescu@example.com",
    phone: "+40 700 123 456",
    products: mockProducts,
  };

  const seller = mockSellerData;

  return (
    <Container maxWidth="lg" className="py-10">
      <div className="dark:bg-neutral-800  bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center gap-6">
        <Avatar
          src={seller.photoUrl}
          alt={seller.name}
          sx={{ width: 120, height: 120, fontSize: "3rem" }}
          className="shadow-lg"
        >
          {!seller.photoUrl && seller.name.charAt(0)}
        </Avatar>

        <div className="flex-1 text-center md:text-left">
          <Typography variant="h4" component="h1" className="font-bold mb-2">
            {seller.name}
          </Typography>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start text-gray-600">
            <Chip
              icon={<CalendarTodayIcon />}
              label={`Joined on: ${seller.joinDate}`}
            />
            {seller.email && <Chip icon={<EmailIcon />} label={seller.email} />}
            {seller.phone && <Chip icon={<PhoneIcon />} label={seller.phone} />}
          </div>

          <div className="mt-2 text-sm text-gray-400">Store ID: {slug}</div>
        </div>
      </div>

      {seller.products.length > 0 ? (
          <ProductCarousel
            title={`Products sold by ${seller.name}`}
            products={seller.products}
          ></ProductCarousel>
      ) : (
        <Typography variant="body1" className="text-gray-500 text-center py-10">
          Not selling any products at the moment.
        </Typography>
      )}
    </Container>
  );
};
