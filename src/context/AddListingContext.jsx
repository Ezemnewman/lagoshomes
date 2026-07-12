import { createContext, useContext, useState } from "react";

/**
 * Shared state across the 4-step Add New Listing wizard:
 * Step 1: Location (state, LGA, street address, landmark)
 * Step 2: Basic Details (title, type, listing type, bedrooms, bathrooms, sqm, description)
 * Step 3: Price (price, negotiable, payment terms, agency fee, legal fee)
 * Step 4: Media & Property Details (photos, video, amenities, virtualTour)
 *
 * Same merge-based update pattern as AgentApplicationContext.
 * File/media state is held as an array of real File objects until the
 * final submission sends them as multipart/form-data.
 *
 * TODO: on submit, POST to /api/listings as multipart/form-data with
 * all fields. The endpoint should return the new listing id, which the
 * wizard then redirects to (/listing/:id to preview it live).
 */
const AddListingContext = createContext(null);

const INITIAL_STATE = {
  // Step 1: Location
  state: "",
  lga: "",
  streetAddress: "",
  landmark: "",
  // Step 2: Basic Details
  title: "",
  propertyType: "",
  listingType: "",
  bedrooms: "",
  bathrooms: "",
  squareMeters: "",
  description: "",
  // Step 3: Price
  price: "",
  negotiable: false,
  paymentTerms: "",
  agencyFeePercent: "5",
  legalFeePercent: "5",
  // Step 4: Media & Details
  photos: [],         // Array of File objects
  videoUrl: "",
  amenities: [],      // Array of amenity ids
  virtualTourUrl: "",
};

export function AddListingProvider({ children }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const resetListing = () => setFormData(INITIAL_STATE);

  return (
    <AddListingContext.Provider value={{ formData, updateFields, resetListing }}>
      {children}
    </AddListingContext.Provider>
  );
}

export function useAddListing() {
  const context = useContext(AddListingContext);
  if (!context) {
    throw new Error("useAddListing must be used within an AddListingProvider");
  }
  return context;
}
