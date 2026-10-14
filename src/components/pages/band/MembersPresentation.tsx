import { Avatar, Paper, Typography } from "@mui/material";
import strings from "../../../assets/text/strings.json";
import colors from "../../../assets/colors.json";
import ClementPhoto from "../../../assets/images/clement_photo.png";
import ThibautPhoto from "../../../assets/images/thibaut_photo.png";
import SebastienPhoto from "../../../assets/images/sebastien_photo.png";

const presentations = [
  {
    image: SebastienPhoto,
    name: strings.member1_name,
    description: strings.band_stage_members[0],
  },
  {
    image: ThibautPhoto,
    name: strings.member2_name,
    description: strings.band_stage_members[1],
  },
  {
    image: ClementPhoto,
    name: strings.member3_name,
    description: strings.band_stage_members[2],
  },
];

export const MembersPresentation = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Typography sx={{ color: "white", fontWeight: 600, mb: 2 }}>
        {strings.band_stage_intro}
      </Typography>
      <ul role="list" className="grid grid-cols-1 gap-4">
        {presentations.map((member) => (
          <li key={member.name}>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "center", sm: "flex-start" },
                textAlign: { xs: "center", sm: "left" },
                gap: 3,
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
                  flexShrink: 0,
                  border: `3px solid ${colors.purple}`,
                }}
              />
              <div className="flex flex-col items-center sm:items-start gap-1.5">
                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography sx={{ lineHeight: 1.7 }}>
                  {member.description}
                </Typography>
              </div>
            </Paper>
          </li>
        ))}
      </ul>
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
    </div>
  );
};
