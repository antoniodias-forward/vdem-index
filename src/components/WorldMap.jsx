import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function WorldMap({ ranked }) {
  const colorScale = scaleLinear().domain([0, 1]).range(["#f0f0f0", "#08306b"]);
  const scoreByIso = Object.fromEntries(ranked.map(r => [r.iso3, r.score]));

  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const iso3 = geo.properties.iso_a3 || geo.id;
            const score = scoreByIso[iso3];
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={score !== undefined ? colorScale(score) : "#eee"}
                stroke="#999"
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
