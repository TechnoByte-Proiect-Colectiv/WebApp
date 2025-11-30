import { SvgIconComponent } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ROUTES } from "../../routes/routePaths";

interface CategorySectionProps {
  categories: {
    name: string;
    slug: string;
    icon: SvgIconComponent;
    color: string;
  }[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
}) => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate(ROUTES.PRODUCTS);
  };

  const handleCategoryClick = (categoryName: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set("category", categoryName);

    navigate(`${ROUTES.PRODUCTS}?${searchParams.toString()}`);
  };

  return (
    <Box className="pt-8">
      <Typography
        variant="h4"
        component="h2"
        className="font-bold mb-6 text-center"
      >
        Quick Category
      </Typography>
      <Grid container spacing={3} className="pt-2">
        {categories.map((category) => {
          const IconTag = category.icon;

          return (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={category.slug}>
              <Paper
                onClick={() => handleCategoryClick(category.slug)}
                elevation={3}
                className="flex flex-col items-center justify-center p-6 h-full transition-transform duration-300 hover:scale-105"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: `${category.color}.main`,
                    color: `${category.color}.contrastText`,
                    "& .icon-container": {
                      color: "inherit",
                    },
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Box
                  sx={{ color: `${category.color}.main` }}
                  className="icon-container"
                >
                  <IconTag fontSize="large" />
                </Box>
                <Typography
                  variant="h6"
                  className="mt-4 font-semibold text-center"
                >
                  {category.name}
                </Typography>
              </Paper>
            </Grid>
          );
        })}

        <Grid size={{ xs: 12 }}>
          <Paper
            elevation={3}
            onClick={handleExploreClick}
            className="flex items-center justify-center p-6 h-full transition-transform duration-300 hover:scale-105"
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.100",
                boxShadow: 6,
              },
              transition: "all 0.2s ease",
            }}
          >
            <Typography variant="h6" className="font-semibold text-center">
              Explore all products
            </Typography>
            <ArrowForwardIcon sx={{ ml: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
