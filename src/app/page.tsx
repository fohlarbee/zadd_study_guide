import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
   <div>
    <h1 className="text-3xl font-bold">
      Hello world!
      <Button>Login</Button>
      <Button>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    </h1>
  </div>
  );
}
