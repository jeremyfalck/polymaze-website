import { Avatar, Chip, Paper, Typography } from "@mui/material";
import strings from "../../../assets/text/strings.json";
import colors from "../../../assets/colors.json";
import ClementPhoto from "../../../assets/images/clement_photo.png";
import ThibautPhoto from "../../../assets/images/thibaut_photo.png";
import SebastienPhoto from "../../../assets/images/sebastien_photo.png";

const presentations = [
  {
    image: SebastienPhoto,
    name: strings.member1_name,
    instrument: strings.member1_instrument,
  },
  {
    image: ThibautPhoto,
    name: strings.member2_name,
    instrument: strings.member2_instrument,
  },
  {
    image: ClementPhoto,
    name: strings.member3_name,
    instrument: strings.member3_instrument,
  },
];

export const MembersPresentation = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto px-4 py-6"
    >
      {presentations.map((member) => (
        <li key={member.name}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1.5,
              p: 3,
              color: "white",
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(201,165,227,0.25)",
              borderRadius: 3,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                borderColor: colors.purple,
                boxShadow: "0 0 24px rgba(201,165,227,0.35)",
              },
            }}
          >
            <Avatar
              src={member.image}
              alt={member.name}
              sx={{
                width: 112,
                height: 112,
                border: `3px solid ${colors.purple}`,
              }}
            />
            <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
              {member.name}
            </Typography>
            <Chip
              label={member.instrument}
              variant="outlined"
              sx={{ color: colors.purple, borderColor: colors.purple }}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};
