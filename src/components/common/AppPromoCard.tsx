import { Download } from "@mui/icons-material";
import { Button, Card, CardContent, Typography } from "@mui/material";

export const AppPromoCard = () => {
  return (
    <Card
      elevation={3}
      className="min-w-[240px] w-[40vw] max-w-[500px] h-40 flex flex-col items-center justify-center text-center"
      sx={{ bgcolor: "primary.light", color: "primary" }}
    >
      <CardContent>
        <Download fontSize="large" />
        <Typography variant="h6" className="font-bold my-2">
          Unlock More Savings!
        </Typography>
        <Typography variant="body2" className="mb-4">
          Download the App
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: "white",
            color: "black",
            borderRadius: "50px",
            "&:hover": { bgcolor: "grey.200" },
          }}
        >
          Download
        </Button>
      </CardContent>
    </Card>
  );
};
