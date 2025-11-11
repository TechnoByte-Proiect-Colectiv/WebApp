import { Box, Typography } from "@mui/material";

export const DefaultCartContent: React.FC<{ index: number }> = ({ index }) => {
  return (
    <>
      <Box className="w-20 h-20 bg-neutral-100 dark:bg-neutral-700 rounded flex items-center justify-center flex-shrink-0">
        <Typography variant="h6" className="text-neutral-500">
          #{index + 1}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" className="font-medium">
          Item {index + 1}
        </Typography>
        <Typography variant="body2" className="text-neutral-500">
          Default content
        </Typography>
      </Box>
    </>
  );
};
