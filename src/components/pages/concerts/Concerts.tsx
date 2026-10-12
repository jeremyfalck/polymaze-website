import { useEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import useHeaderHeight from "../../navbar/useHeaderHeight";
import Smoke from "../../effects/Smoke";
import colors from "../../../assets/colors.json";
import { ConcertConfig, getConcerts } from "../../../sheets/SheetsManager";
import ConcertItem from "./ConcertItem";
import { Grid } from "@mui/material";
import { parseDate } from "../../../utils/dateutils";

const Concerts = () => {
  const getCurrentDimension = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [ref, headerHeight] = useHeaderHeight();
  const [dimensions, setDimensions] = useState(getCurrentDimension());

  const [concerts, setConcerts] = useState([] as ConcertConfig[]);

  useEffect(() => {
    const onResize = () => setDimensions(getCurrentDimension());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    getConcerts().then(setConcerts);
  }, []);

  return (
    <>
      <main className="bg-black overscroll-none overflow-hidden">
        <Smoke
          smokeOpacity="0.3"
          smokeColor={colors.purple}
          width={dimensions.width}
          height={dimensions.height}
        />
        <div
          className="w-full mx-auto py-6 sm:px-6 lg:px-8 flex-1 flex-col justify-center absolute top-0 left-0 overscroll-contain overflow-y-auto"
          style={{
            maxHeight: dimensions.height,
            paddingTop: headerHeight,
          }}
        >
          <Grid
            container
            spacing={6}
            columns={{ xs: 3, sm: 3, md: 5 }}
            className="p-4"
          >
            <Grid item xs={1} sm={1} md={1}>
              <p className="text-white text-3xl font-semibold tracking-tight">
                Date
              </p>
            </Grid>

            <Grid item xs={2} sm={2} md={2}>
              <p className="text-white text-3xl font-semibold tracking-tight">
                Lieu
              </p>
            </Grid>
            <Grid
              item
              xs={2}
              sm={2}
              md={2}
              className="hidden md:flex md:flex-1"
            >
              <p className="text-white text-3xl font-semibold tracking-tight">
                Infos
              </p>
            </Grid>
            {concerts
              .sort(
                (concert1, concert2) =>
                  parseDate(concert2.date).getTime() -
                  parseDate(concert1.date).getTime()
              )
              .map((concert: ConcertConfig, index: number) => (
                <ConcertItem
                  key={concert.date + index.toString()}
                  date={concert.date}
                  place={concert.place}
                  city={concert.city}
                  department={concert.department}
                  description={concert.description}
                />
              ))}
          </Grid>
        </div>
        <NavBar index={2} ref={ref} />
      </main>
    </>
  );
};

export default Concerts;
