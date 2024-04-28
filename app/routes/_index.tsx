import type { MetaFunction } from "@remix-run/node";
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
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="p-10 flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Search for products</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Enter your product here" />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center border-t px-6 py-4">
          <Button>Search</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
