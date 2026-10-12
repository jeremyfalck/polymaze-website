import { useEffect, useState } from "react";
import { NavBar } from "../../navbar/Navbar";
import useHeaderHeight from "../../navbar/useHeaderHeight";
import Smoke from "../../effects/Smoke";
import colors from "../../../assets/colors.json";
import { ConcertConfig, getConcerts } from "../../../sheets/SheetsManager";
import ConcertItem from "./ConcertItem";
import ConcertSkeleton from "./ConcertSkeleton";
import { Stack, Typography } from "@mui/material";
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

  const [concerts, setConcerts] = useState<ConcertConfig[] | null>(null);

  useEffect(() => {
    const onResize = () => setDimensions(getCurrentDimension());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    getConcerts().then(setConcerts);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const byDate = (c1: ConcertConfig, c2: ConcertConfig) =>
    parseDate(c1.date).getTime() - parseDate(c2.date).getTime();
  const isUpcoming = (c: ConcertConfig) => parseDate(c.date) >= today;
  const loaded = concerts ?? [];
  const upcoming = loaded.filter(isUpcoming).sort(byDate);
  const past = loaded
    .filter((c) => !isUpcoming(c))
    .sort((c1, c2) => byDate(c2, c1));
  // past is sorted newest first, so each year's group is contiguous.
  const pastByYear = past.reduce<[number, ConcertConfig[]][]>((groups, c) => {
    const year = parseDate(c.date).getFullYear();
    const last = groups[groups.length - 1];
    if (last && last[0] === year) last[1].push(c);
    else groups.push([year, [c]]);
    return groups;
  }, []);
  const renderConcert =
    (isPast: boolean) => (concert: ConcertConfig, index: number) => (
      <ConcertItem
        key={concert.date + index.toString()}
        {...concert}
        past={isPast}
      />
    );

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
          <Stack spacing={2} className="max-w-3xl mx-auto p-4">
            {concerts === null &&
              [0, 1, 2].map((i) => <ConcertSkeleton key={i} />)}
            {concerts !== null && upcoming.length === 0 && (
              <Typography className="text-white">
                Pas de concert prévu pour le moment
              </Typography>
            )}
            {upcoming.map(renderConcert(false))}
            {past.length > 0 && (
              <Typography
                variant="h5"
                className="text-white font-semibold pt-4"
              >
                Passés
              </Typography>
            )}
            {pastByYear.map(([year, items]) => (
              <Stack key={year} spacing={2}>
                <Typography
                  variant="h6"
                  className="font-semibold"
                  sx={{ color: colors.purple, pt: 1 }}
                >
                  {year}
                </Typography>
                {items.map(renderConcert(true))}
              </Stack>
            ))}
          </Stack>
        </div>
        <NavBar index={2} ref={ref} />
      </main>
    </>
  );
};

export default Concerts;
