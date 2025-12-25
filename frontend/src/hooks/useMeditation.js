import { useState, useEffect } from "react";

export const useMeditation = () => {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch meditations from API
    setMeditations([]);
    setLoading(false);
  }, []);

  return { meditations, loading };
};
