import { Box, Paper, Typography } from "@mui/material";
import strings from "../../../assets/text/strings.json";
import colors from "../../../assets/colors.json";

export const WhoAreWe = () => {
  return (
    <Box className="max-w-3xl mx-auto px-4 py-6">
      <Typography sx={{ color: "white", fontSize: { xs: 18, sm: 22 }, mb: 3 }}>
        {strings.band_presentation_part1}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 4 },
          color: "white",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(201,165,227,0.25)",
          borderRadius: 3,
        }}
      >
        <Typography sx={{ lineHeight: 1.8 }}>
          {strings.band_presentation_part2}
        </Typography>
      </Paper>
      <Typography
        sx={{
          mt: 4,
          pl: 2,
          color: colors.purple,
          fontSize: { xs: 18, sm: 20 },
          fontStyle: "italic",
          borderLeft: `3px solid ${colors.purple}`,
        }}
      >
        {strings.band_presentation_part3}
      </Typography>
    </Box>
  );
};
