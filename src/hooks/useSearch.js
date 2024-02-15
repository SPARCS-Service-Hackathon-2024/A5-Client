import { useEffect, useMemo, useState } from "react";

export default function useSearch(query) {
  const ps = useMemo(() => {
    return new window.kakao.maps.services.Places();
  }, []);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    ps.keywordSearch(query, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setResult(data);
      }
      setLoading(false);
    });
  }, [query]);

  return { result, loading };
}
