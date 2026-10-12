import { Box, Paper, Skeleton } from "@mui/material";

// Placeholder shaped like ConcertItem, shown while the sheet loads.
const ConcertSkeleton = () => (
  <Paper
    elevation={0}
    sx={{
      display: "flex",
      alignItems: "center",
      gap: { xs: 2, sm: 3 },
      p: { xs: 2, sm: 3 },
      backgroundColor: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(6px)",
      border: "1px solid rgba(201,165,227,0.25)",
      borderRadius: 3,
    }}
  >
    <Skeleton
      variant="rounded"
      animation="wave"
      width={72}
      height={72}
      sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
    />
    <Box sx={{ flex: 1 }}>
      <Skeleton
        animation="wave"
        width="60%"
        height={32}
        sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
      />
      <Skeleton
        animation="wave"
        width="40%"
        sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
      />
    </Box>
  </Paper>
);

export default ConcertSkeleton;
