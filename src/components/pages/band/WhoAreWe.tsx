import { Box, Paper, Typography } from "@mui/material";
import strings from "../../../assets/text/strings.json";
import colors from "../../../assets/colors.json";

export const WhoAreWe = () => {
  return (
    <Box className="max-w-3xl mx-auto px-4 py-6">
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
        <Typography sx={{ fontSize: { xs: 18, sm: 22 }, mb: 3 }}>
          {strings.band_intro}
        </Typography>
        <Box
          component="ol"
          sx={{
            listStyle: "none",
            m: 0,
            p: 0,
            borderLeft: `2px solid ${colors.purple}`,
          }}
        >
          {strings.band_timeline.map(({ year, text }) => (
            <Box
              component="li"
              key={text}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 0.5, sm: 3 },
                pl: 3,
                py: 1.5,
              }}
            >
              <Typography
                sx={{
                  color: colors.purple,
                  fontWeight: 700,
                  minWidth: 56,
                  flexShrink: 0,
                }}
              >
                {year}
              </Typography>
              <Typography sx={{ lineHeight: 1.7 }}>{text}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
