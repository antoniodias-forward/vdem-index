export default function IndexSelector({ indices, weights, setWeights }) {
  return (
    <div>
      {indices.map(idx => (
        <div key={idx.key}>
          <label>{idx.label}</label>
          <input
            type="range" min="0" max="1" step="0.1"
            value={weights[idx.key] || 0}
            onChange={e => setWeights({ ...weights, [idx.key]: parseFloat(e.target.value) })}
          />
          <span>{weights[idx.key] || 0}</span>
        </div>
      ))}
    </div>
  );
}

