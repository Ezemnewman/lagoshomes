import { createContext, useContext, useState } from "react";

/**
 * Shared state across the 3-step agent application wizard
 * (Basic Info -> Location -> Document Upload). Without this, going
 * back from step 3 to step 2 would lose whatever was typed — each step
 * was a fully separate page in the Stitch export with no shared data
 * model at all. This Context is the fix: one form object, updated
 * incrementally by each step, submitted together at the end.
 *
 * Files (ID, CAC, profile photo) are stored as real File objects in
 * state, not yet uploaded anywhere — there's no backend endpoint to
 * receive them yet. TODO: once one exists, final submission becomes a
 * multipart/form-data POST to /api/agents/apply carrying both the text
 * fields and these files together.
 */
const AgentApplicationContext = createContext(null);

const INITIAL_STATE = {
  fullName: "",
  phone: "",
  email: "",
  agencyName: "",
  experience: "",
  state: "",
  city: "",
  address: "",
  governmentId: null,
  cacCertificate: null,
  profilePhoto: null,
};

export function AgentApplicationProvider({ children }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetApplication = () => setFormData(INITIAL_STATE);

  return (
    <AgentApplicationContext.Provider value={{ formData, updateFields, resetApplication }}>
      {children}
    </AgentApplicationContext.Provider>
  );
}

export function useAgentApplication() {
  const context = useContext(AgentApplicationContext);
  if (!context) {
    throw new Error("useAgentApplication must be used within an AgentApplicationProvider");
  }
  return context;
}
