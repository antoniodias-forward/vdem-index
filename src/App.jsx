import { useState } from "react";
import data from "./data/vdem_subset.json";
import { computeCustomIndex } from "./utils/computeIndex";
import IndexSelector from "./components/IndexSelector";
import CountryTable from "./components/CountryTable";
import WorldMap from "./components/WorldMap";

const indices = [
  { key: "v2x_polyarchy", label: "Electoral Democracy" },
  { key: "v2x_libdem", label: "Liberal Democracy" },
  { key: "v2x_egaldem", label: "Egalitarian Democracy" },
];

export default function App() {
  const [weights, setWeights] = useState({ v2x_polyarchy: 1 });
  const ranked = computeCustomIndex(data, weights);

  return (
    <div>
      <h1>Build Your Own Democracy Index</h1>
      <IndexSelector indices={indices} weights={weights} setWeights={setWeights} />
      <WorldMap ranked={ranked} />
      <CountryTable ranked={ranked} />
    </div>
  );
}
