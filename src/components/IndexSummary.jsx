export default function IndexSummary({ ranked }) {
  const scores = ranked
    .map((country) => country.score)
    .filter(Number.isFinite);

  if (scores.length === 0) {
    return <p>No country scores are available for this formula.</p>;
  }

  const average =
    scores.reduce((total, score) => total + score, 0) / scores.length;

  const above = scores.filter((score) => score > 0.5).length;
  const below = scores.filter((score) => score < 0.5).length;
  const equal = scores.length - above - below;

  return (
    <section aria-live="polite">
      <h2>Index summary</h2>
      <p>Average score: {average.toFixed(3)}</p>
      <p>Above 0.5: {above} countries</p>
      <p>Below 0.5: {below} countries</p>
      <p>Exactly 0.5: {equal} countries</p>
      <p>Countries with data: {scores.length}</p>
    </section>
  );
}
