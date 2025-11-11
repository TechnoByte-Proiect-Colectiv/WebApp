import { Box, Typography } from "@mui/material";

export const EmptyCart: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Box className="flex items-center justify-center p-8 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
      <Typography variant="body1" className="text-neutral-500">
        {message}
      </Typography>
    </Box>
  );
};
