import { Box, Chip, Paper, Typography } from "@mui/material";
import colors from "../../../assets/colors.json";
import { parseDate } from "../../../utils/dateutils";

interface ConcertItemProps {
  date: string;
  place: string;
  city: string;
  department: string;
  description: string;
  past?: boolean;
}

const ConcertItem = ({
  date,
  place,
  city,
  department,
  description,
  past = false,
}: ConcertItemProps) => {
  const d = parseDate(date);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("fr-FR", opts);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 3 },
        color: "white",
        backgroundColor: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(201,165,227,0.25)",
        borderRadius: 3,
        opacity: past ? 0.55 : 1,
        transition: "all 0.2s ease",
        "&:hover": {
          opacity: 1,
          transform: "translateY(-2px)",
          borderColor: colors.purple,
          boxShadow: `0 0 24px rgba(201,165,227,0.35)`,
        },
      }}
    >
      <Box sx={{ textAlign: "center", minWidth: 72, color: colors.purple }}>
        <Typography sx={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
          {part({ day: "numeric" })}
        </Typography>
        <Typography
          sx={{ fontSize: 14, fontWeight: 600, textTransform: "uppercase" }}
        >
          {part({ month: "short" }).replace(".", "")}
        </Typography>
        <Typography sx={{ fontSize: 12, opacity: 0.7 }}>
          {part({ year: "numeric" })}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: 600 }}>
          {place}
        </Typography>
        <Typography sx={{ opacity: 0.8 }}>
          {city}
          {department && ` (${department})`}
        </Typography>
      </Box>

      {description && (
        <Chip
          label={description}
          variant="outlined"
          sx={{ color: colors.purple, borderColor: colors.purple }}
        />
      )}
    </Paper>
  );
};

export default ConcertItem;
