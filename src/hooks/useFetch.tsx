import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<string|null>(null);
    
    useEffect(() => {
        async function fetchData() {
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            const result: T[] = await response.json();
            setData(result);
        } catch (error) {
            setIsError("Error fetching data");
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
        }
        fetchData();
    }, [url]);
    
    return { data, isLoading, isError };
}