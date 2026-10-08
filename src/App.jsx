import { useState } from "react";
import data from "./data/vdem_subset.json";
import { computeCustomIndex } from "./utils/computeIndex";
import FormulaBuilder from "./components/FormulaBuilder";
import CountryTable from "./components/CountryTable";
import WorldMap from "./components/WorldMap";

const indices = [
  { key: "v2x_polyarchy", label: "Electoral Democracy" },
  { key: "v2x_libdem", label: "Liberal Democracy" },
  { key: "v2x_partipdem", label: "Participatory Democracy" },
  { key: "v2x_delibdem", label: "Deliberative Democracy" },
  { key: "v2x_egaldem", label: "Egalitarian Democracy" },
];

export default function App() {
  const [steps, setSteps] = useState([
    { key: "v2x_polyarchy", operator: "+" },
  ]);

  const ranked = computeCustomIndex(data, steps);
  const countriesWithScores = ranked.filter(
    (country) => Number.isFinite(country.score)
  );

  return (
    <main>
      <h1>Build Your Own Democracy Index</h1>

      <p>
        Select indices and combine them using addition, subtraction, or
        multiplication. Operations are applied from top to bottom.
      </p>

      <FormulaBuilder
        indices={indices}
        steps={steps}
        setSteps={setSteps}
      />

      {steps.length === 0 ? (
        <p>Add an index to see country rankings and the map.</p>
      ) : (
        <>
          <h2>World map</h2>
          <WorldMap ranked={countriesWithScores} />

          <h2>Country rankings</h2>
          <CountryTable ranked={countriesWithScores} />

          {ranked.length > countriesWithScores.length && (
            <p>
              {ranked.length - countriesWithScores.length} countries are
              excluded because data is missing for at least one selected index.
            </p>
          )}
        </>
      )}
    </main>
  );
}
