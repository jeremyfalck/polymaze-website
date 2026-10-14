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
                position: "relative",
                pl: 3,
                py: 1.5,
                // Dot centred on the line, level with the year's first line.
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: -6,
                  top: "calc(12px + 0.85em - 5px)",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: colors.purple,
                },
              }}
            >
              <Typography
                sx={{
                  color: colors.purple,
                  fontWeight: 700,
                  lineHeight: 1.7,
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
