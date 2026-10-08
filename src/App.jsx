import { useState } from "react";
import data from "./data/vdem_subset.json";
import indices from "./data/vdem_indices.json";
import { computeCustomIndex } from "./utils/computeIndex";
import FormulaBuilder from "./components/FormulaBuilder";
import IndexSummary from "./components/IndexSummary";
import CountryTable from "./components/CountryTable";
import WorldMap from "./components/WorldMap";

export default function App() {
  const [steps, setSteps] = useState([
    { key: "v2x_polyarchy", operator: "+" },
  ]);

  const ranked = computeCustomIndex(data, steps);
  const countriesWithScores = ranked.filter((country) =>
    Number.isFinite(country.score)
  );

  return (
    <main>
      <h1>Build Your Own Democracy Index</h1>

      <p>
        Add V-Dem indices and combine them using addition, subtraction, or
        multiplication. Operations are applied from top to bottom.
      </p>

      <FormulaBuilder
        indices={indices}
        steps={steps}
        setSteps={setSteps}
      />

      {steps.length === 0 ? (
        <p>Add an index to see the summary, map, and rankings.</p>
      ) : (
        <>
          <IndexSummary ranked={ranked} />

          <h2>World map</h2>
          <WorldMap ranked={countriesWithScores} />

          <h2>Country rankings</h2>
          <CountryTable ranked={countriesWithScores} />

          {ranked.length > countriesWithScores.length && (
            <p>
              {ranked.length - countriesWithScores.length} countries have
              missing data for this formula.
            </p>
          )}
        </>
      )}
    </main>
  );
}
