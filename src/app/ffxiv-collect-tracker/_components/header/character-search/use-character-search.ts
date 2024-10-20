import { useState } from 'react';

export type CharacterSearchResult = {
  id: number;
  data_center: string;
  name: string;
  server: string;
};

const useCharacterSearch = () => {
  const [results, setResults] = useState<CharacterSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = (query: string) => {
    const fetchResults = async () => {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/search/character?name=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      const characterResults: CharacterSearchResult[] = data?.results ?? [];
      setResults(characterResults);
      setLoading(false);
    };

    if (query.length > 3) {
      fetchResults();
    } else {
      setResults([]);
    }
  };

  return {
    search,
    results,
    loading,
  };
};

export default useCharacterSearch;
