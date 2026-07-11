import { useRef, useState } from "react";
import Icon from "./Icon";

/**
 * Drag-and-drop single-file upload card. Step 3 of the agent
 * application needs three of these (Government ID, CAC Certificate,
 * Profile Photo) with only the icon/label/file-type hint differing —
 * built generic rather than as three near-identical inline blocks,
 * same reasoning as ReportListingPage's dropzone but generalized to
 * take a single file instead of multiple.
 */
export default function FileUploadZone({
  label,
  required,
  icon = "cloud_upload",
  hint = "PNG, JPG, or PDF up to 10MB",
  accept = "image/*,application/pdf",
  file,
  onFileSelect,
}) {
  const inputRef = useRef(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFiles = (fileList) => {
    const selected = fileList?.[0];
    if (selected) onFileSelect(selected);
  };

  return (
    <div className="space-y-2">
      <label className="text-label-md font-label-md block text-on-surface">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDraggingOver
            ? "border-primary bg-primary/5"
            : file
              ? "border-primary bg-primary/5"
              : "border-outline-variant hover:border-primary hover:bg-primary/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {file ? (
          <>
            <Icon name="check_circle" className="text-green-600 text-4xl mb-2" filled />
            <p className="text-body-md font-body-md text-on-surface-variant">
              <span className="text-primary font-semibold">{file.name}</span> uploaded
            </p>
          </>
        ) : (
          <>
            <Icon name={icon} className="text-primary text-4xl mb-2" />
            <p className="text-body-md font-body-md text-on-surface-variant">
              Drag and drop file or <span className="text-primary font-semibold">browse</span>
            </p>
            <p className="text-xs text-outline mt-1">{hint}</p>
          </>
        )}
      </div>
    </div>
  );
}
