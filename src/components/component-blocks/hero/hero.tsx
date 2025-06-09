import { TypeComponentHero } from "@/lib/types";

export default function Hero({ heroName }: TypeComponentHero) {
  return (
    <section className="justify-items-center">
      <div className="container p-4">
        <div>{heroName}</div>
      </div>
    </section>
  );
}
