import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const meta: MetaFunction = () => {
  return [
    { title: "Ara-Bul" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/run_miner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch results");
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search for products</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <Input
              placeholder="Enter your product here"
              value={input}
              onChange={handleInputChange}
              className="mb-4"
            />
            <CardFooter className="flex justify-center items-center border-t px-6 py-4">
              <Button type="submit">Search</Button>
            </CardFooter>
          </form>
        </CardContent>
        {error && <div className="text-red-500">{error}</div>}
      </Card>

      <div className="w-full flex flex-col items-center">
        {results.map((result, index) => (
          <Card key={index} className="mb-4 w-full max-w-md">
            <CardHeader>
              <CardTitle>Result {index + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Similarity: {result.similarity}%</div>
              <div>
                Url:{" "}
                <a href={result.url} target="_blank">
                  Visit product page
                </a>
              </div>
              <div>Price: {result.price}</div>
              <div>Screen Resolution: {result.cozunurluk_piksel}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
