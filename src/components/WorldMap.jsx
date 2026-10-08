import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ ranked }) {
  const [hovered, setHovered] = useState(null);

  const { byMapId, color } = useMemo(() => {
    const valid = ranked.filter(
      (row) => row.mapId && Number.isFinite(row.score)
    );

    const scores = valid.map((row) => row.score);
    const min = Math.min(...scores);
    const max = Math.max(...scores);

    return {
      byMapId: new Map(valid.map((row) => [String(row.mapId), row])),
      color:
        valid.length && min !== max
          ? scaleLinear()
              .domain([min, max])
              .range(["#e8f1fa", "#084081"])
              .clamp(true)
          : () => "#4f87b8",
    };
  }, [ranked]);

  return (
    <section>
      <p aria-live="polite">
        {hovered
          ? `${hovered.country}: ${
              hovered.score === null ? "No data" : hovered.score.toFixed(3)
            }`
          : "Hover over a country to see its score."}
      </p>

      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const row = byMapId.get(String(geo.id));
              const name = row?.country ?? geo.properties.name;
              const score = row?.score ?? null;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={row ? color(score) : "#ddd"}
                  stroke="#fff"
                  strokeWidth={0.5}
                  onMouseEnter={() =>
                    setHovered({ country: name, score })
                  }
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", stroke: "#333" },
                    pressed: { outline: "none" },
                  }}
                >
                  <title>
                    {name}: {score === null ? "No data" : score.toFixed(3)}
                  </title>
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </section>
  );
}
