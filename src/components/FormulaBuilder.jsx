export default function FormulaBuilder({ indices, steps, setSteps }) {
  function addStep() {
    const used = new Set(steps.map((step) => step.key));
    const next = indices.find((index) => !used.has(index.key));
    if (next) {
      setSteps([...steps, { key: next.key, operator: "+" }]);
    }
  }

  function updateStep(position, changes) {
    setSteps(steps.map((step, i) =>
      i === position ? { ...step, ...changes } : step
    ));
  }

  return (
    <section>
      <h2>Your formula</h2>
      <p>Operations are applied from top to bottom.</p>

      {steps.map((step, i) => (
        <div key={i}>
          {i > 0 && (
            <select
              aria-label={`Operation for index ${i + 1}`}
              value={step.operator}
              onChange={(e) => updateStep(i, { operator: e.target.value })}
            >
              <option value="+">Add</option>
              <option value="-">Subtract</option>
              <option value="*">Multiply</option>
            </select>
          )}

          <select
            aria-label={`Index ${i + 1}`}
            value={step.key}
            onChange={(e) => updateStep(i, { key: e.target.value })}
          >
            {indices.map((index) => (
              <option
                key={index.key}
                value={index.key}
                disabled={steps.some((s, j) => j !== i && s.key === index.key)}
              >
                {index.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setSteps(steps.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addStep}
        disabled={steps.length === indices.length}
      >
        Add index
      </button>
    </section>
  );
}
