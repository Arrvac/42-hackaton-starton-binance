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
  address: string;
};

export const useBook = (id: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.PENDING);

  const refreshBook = useCallback(async (id: string) => {
    try {
      const res = await api.get(`/books/${id}`);
      if (!res.data) {
        throw new Error();
      }

      setBook(res.data);
    } catch {
      setBook(null);
    } finally {
      setFetchStatus(FetchStatus.DONE);
    }
  }, []);

  useEffect(() => {
    refreshBook(id);
  }, [refreshBook, id]);

  return {
    book,
    fetchStatus,
    refreshBook,
    FetchStatus,
  };
};
