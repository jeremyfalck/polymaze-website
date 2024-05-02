import { createRef, useEffect, useLayoutEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import Smoke from "../../effects/Smoke";
import colors from "../../../assets/colors.json";
import {
  ConcertConfig,
  getConcerts,
} from "../../../firebase/RemoteConfigManager";
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

  const [dimensions, setDimensions] = useState(getCurrentDimension());
  const [headerHeight, setHeaderHeight] = useState(0);

  const [concerts, setConcerts] = useState([] as ConcertConfig[]);

  const ref = createRef<HTMLDivElement>();

  useLayoutEffect(() => {
    setHeaderHeight(
      ref.current && ref.current.clientHeight ? ref.current.clientHeight : 0
    );
    setDimensions(getCurrentDimension());
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
          height={dimensions.height - headerHeight}
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
              .map((concert: ConcertConfig) => (
                <ConcertItem
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
