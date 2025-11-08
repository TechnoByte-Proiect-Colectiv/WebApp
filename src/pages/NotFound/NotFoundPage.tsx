import { Link } from "react-router-dom";
import { AnimatedCanvas } from "../Home/HeroSection/AnimatedCanvas";
import { Box, Container, Typography } from "@mui/material";

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Box className="w-full max-w-screen-2xl mx-auto h-screen relative flex items-center justify-start overflow-hidden">
        <AnimatedCanvas />
        <Container>
          <div className="relative mx-auto lg:pl-12 pl-4 py-3 flex flex-col items-start text-start z-10">
            <h2
              className={`font-bold text-4xl md:text-6xl lg:text-7xl drop-shadow-2xl"
              }`}
            >
              404 - Page not found
            </h2>
            <Typography
              className={`max-w-[70vw] text-lg drop-shadow-lg opacity-90"
              }`}
              sx={{
                marginTop: 2,
              }}
            >
              Seems like you like exploring, but you ended up nowhere.
            </Typography>
            <Link to="/" className="text-xl font-bold hover:underline">
              Go home
            </Link>
          </div>
        </Container>
      </Box>
    </>
  );
};
