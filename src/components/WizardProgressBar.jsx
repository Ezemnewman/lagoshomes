/**
 * Shared progress header for all 3 agent application steps. Takes
 * `step` (1-3) and `label` (e.g. "Basic Info") since each Stitch export
 * showed a different label next to the same progress bar shape.
 */
export default function WizardProgressBar({ step, label, totalSteps = 3 }) {
  const percent = (step / totalSteps) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-end mb-4">
        <span className="text-label-md font-label-md text-primary font-bold">
          Step {step} of {totalSteps}
        </span>
        <span className="text-label-md font-label-md text-on-surface-variant">{label}</span>
      </div>
      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
