import { addHours, format, startOfDay } from "date-fns";

const cityTimeZones = {
  "Los Angeles, USA": -8,
  "London, UK": 0,
  "Berlin, Germany": 1,
  "Lisbon, Portugal": 0,
  "Istanbul, Turkey": 3,
  "Barcelona, Spain": 1,
  "Budapest, Hungary": 1,
  "Tirana, Albania": 1,
  "Tunis, Tunisia": 1,
  "Marrakesh, Morocco": 0,
  "Stockholm, Sweden": 1,
  "Oslo, Norway": 1,
  "Helsinki, Finland": 2,
  "Edinburgh, Scotland": 0,
  "Dublin, Ireland": 0,
  "Reykjavik, Iceland": 0,
  "Vancouver, Canada": -8,
  "Havana, Cuba": -5,
  "Philadelphia, USA": -5,
  "New York City, USA": -5,
  "Montreal, Canada": -5,
  "Quebec City, Canada": -5,
  "Buenos Aires, Argentina": -3,
  "Montevideo, Uruguay": -3,
  "Sao Paulo, Brazil": -3,
  "Santiago, Chile": -4,
  "Lima, Peru": -5,
  "Warsaw, Poland": 1,
  "Prague, Czechia": 1,
  "Tbilisi, Georgia": 4,
  "Cairo, Egypt": 2,
  "Dubai, UAE": 4,
  "La Paz, Bolivia": -4,
  "Austin, USA": -6,
  "New Orleans, USA": -6,
  "Cancun, Mexico": -5,
  "San Jose, Costa Rica": -6,
  "Portland, USA": -8,
  "Denver, USA": -7,
  "Mexico City, Mexico": -6,
  "Tokyo, Japan": 9,
  "Seoul, South Korea": 9,
  "Shanghai, China": 8,
  "Hong Kong": 8,
  "Taipei, Taiwan": 8,
  "Bali, Indonesia": 8,
  "Manila, Philippines": 8,
  "Chiang Mai, Thailand": 7,
  "Bangkok, Thailand": 7,
  Singapore: 8,
  "Colombo, Sri Lanka": 5.5,
};

type Location = {
  city: string;
  start: string;
  end: string;
  difference: number;
  local: string;
};

export default function App() {
  const baseDate = startOfDay(new Date());
  const startTime = 9;
  const workingDay = 8;

  const sydney = `${format(addHours(baseDate, startTime), "haa")} - ${format(
    addHours(baseDate, startTime + workingDay),
    "haa"
  )} ${format(baseDate, "eeee")}`;

  const getTimes = (): Location[] =>
    Object.entries(cityTimeZones)
      .map(([city, utcOffset]) => {
        const localStart = addHours(baseDate, startTime + (utcOffset - 10));
        const localEnd = addHours(localStart, workingDay);
        return {
          city,
          start: format(localStart, "HH:mm"),
          end: format(localEnd, "HH:mm"),
          difference: 10 - utcOffset,
          local: `${format(localStart, "haa")} - ${format(localEnd, "haa")} ${format(
            localStart,
            "eeee"
          )} (UTC ${utcOffset})`,
        };
      })
      .sort((a, b) => a.difference - b.difference);

  const times = getTimes();

  return (
    <div className="container mx-auto p-20">
      For:{sydney}
      {times.map(({ city, local }) => (
        <div key={"fwfe"} className="mb-4">
          <h2 className="text-2xl font-bold">{city}</h2>
          <p className="text-lg">Local time: {local}</p>
        </div>
      ))}
    </div>
  );
}
