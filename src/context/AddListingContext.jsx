import { createContext, useContext, useState } from "react";

const AddListingContext = createContext(null);

const INITIAL_STATE = {
  // Step 1 — Location
  state: "",
  lga: "",
  address: "",
  latitude: null,
  longitude: null,
  // Step 2 — Basic Details
  title: "",
  description: "",
  propertyType: "",
  listingType: "",
  bedrooms: "",
  bathrooms: "",
  toilets: "",
  squareMeters: "",
  // Step 3 — Price
  price: "",
  negotiable: false,
  paymentTerms: "",
  agencyFeePercent: "5",
  legalFeePercent: "5",
  // Step 4 — Media
  photos: [],        // real File objects
  videoUrl: "",
  amenities: [],
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
  const ctx = useContext(AddListingContext);
  if (!ctx) throw new Error("useAddListing must be used within AddListingProvider");
  return ctx;
}
