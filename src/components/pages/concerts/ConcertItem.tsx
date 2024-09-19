import { Divider, Grid } from "@mui/material";
import { formatDate } from "../../../utils/dateutils";

interface ConcertItemProps {
  date: string;
  place: string;
  city: string;
  department: string;
  description: string;
}

const ConcertItem = ({
  date,
  place,
  city,
  department,
  description,
}: ConcertItemProps) => (
  <>
    <Grid item xs={1} sm={1} md={1}>
      <p className="text-white font-semibold">{formatDate(date)}</p>
    </Grid>

    <Grid item xs={2} sm={2} md={2}>
      <p className="text-white">
        {place}, <b>{city}</b> ({department})
      </p>
    </Grid>
    <Grid item xs={2} sm={2} md={2} className="hidden md:flex md:flex-1">
      <p className="text-white">{description}</p>
    </Grid>
    <Grid item xs={5}>
      <Divider orientation="horizontal" className="bg-white" flexItem />
    </Grid>
  </>
);

export default ConcertItem;
