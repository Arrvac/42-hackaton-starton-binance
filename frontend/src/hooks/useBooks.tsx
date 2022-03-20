import { useCallback, useEffect, useState } from "react";
import { api } from "../services/api";

enum FetchStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

type Book = {
  id: string;
  name: string;
  author: string;
  media_url: string;
  description: string;
};

export const useBooks = () => {
  const [books, setBooks] = useState<Book[] | []>([]);
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.PENDING);

  const refreshBooks = useCallback(async () => {
    try {
      const res = await api.get("/books");
      if (!res.data) {
        throw new Error();
      }

      setBooks(res.data);
    } catch {
      setBooks([]);
    } finally {
      setFetchStatus(FetchStatus.DONE);
    }
  }, []);

  useEffect(() => {
    refreshBooks();
  }, [refreshBooks]);

  return {
    books,
    fetchStatus,
    refreshBooks,
    FetchStatus,
  };
};
