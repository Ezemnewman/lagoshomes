/**
 * Generic progress bar for multi-step wizards. Used by both the
 * agent application (3 steps) and the add-listing wizard (4 steps).
 * `currentStep` is 1-indexed.
 */
export default function WizardProgressBar({ currentStep, totalSteps }) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-stack-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-label-md text-label-md text-on-surface-variant">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="font-label-md text-label-md text-primary font-bold">{percent}%</span>
      </div>
      <div className="w-full bg-surface-container-high rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
