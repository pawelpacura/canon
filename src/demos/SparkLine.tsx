/** Lightweight chart placeholder (no recharts dependency). */
export function SparkLine({
  points,
  dashedPoints,
}: {
  points: number[];
  dashedPoints?: number[];
}) {
  const w = 640;
  const h = 180;
  const pad = 12;
  const max = 100;
  const min = Math.min(...points, ...(dashedPoints ?? [100])) - 5;

  const toPath = (vals: number[]) =>
    vals
      .map((v, i) => {
        const x = pad + (i / (vals.length - 1)) * (w - pad * 2);
        const y = pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      height={200}
      role="img"
      aria-label="Wykres"
      style={{ display: "block" }}
    >
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={pad}
          x2={w - pad}
          y1={pad + t * (h - pad * 2)}
          y2={pad + t * (h - pad * 2)}
          stroke="var(--color-stroke-subtle)"
        />
      ))}
      {dashedPoints ? (
        <path
          d={toPath(dashedPoints)}
          fill="none"
          stroke="var(--color-foreground-tertiary)"
          strokeWidth={2}
          strokeDasharray="6 4"
        />
      ) : null}
      <path
        d={toPath(points)}
        fill="none"
        stroke="var(--color-interactive-primary-default)"
        strokeWidth={2.5}
      />
    </svg>
  );
}
