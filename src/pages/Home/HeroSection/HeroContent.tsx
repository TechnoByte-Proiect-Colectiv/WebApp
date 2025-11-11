import { Button, Typography } from "@mui/material";
import React from "react";
import { useDarkMode } from "../../../context/DarkModeContext";

interface HeroContentProps {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  title,
  description,
  buttonText,
  onButtonClick,
}) => {
  const { darkMode } = useDarkMode();

  return (
    <div className="relative mx-auto lg:pl-12 pl-4 py-3 flex flex-col items-start text-start z-10">
      <h2
        className={`font-bold text-4xl md:text-6xl lg:text-7xl drop-shadow-2xl${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      <Typography
        className={`max-w-[70vw] text-lg drop-shadow-lg opacity-90 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
        sx={{
          marginTop: 1,
        }}
      >
        {description}
      </Typography>
      <Button
        variant="contained"
        size="large"
        className="px-10 text-lg"
        onClick={onButtonClick}
        sx={{
          marginTop: 0.5,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          "&:hover": {
            transform: "scale(1.05)",
          },
          borderRadius: "50px",
          transition: "all 0.3s ease",
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};
