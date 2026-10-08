export default function CountryTable({ ranked }) {
  return (
    <table>
      <thead><tr><th>#</th><th>Country</th><th>Score</th></tr></thead>
      <tbody>
        {ranked.map((r, i) => (
          <tr key={r.iso3}><td>{i + 1}</td><td>{r.country}</td><td>{r.score.toFixed(3)}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
