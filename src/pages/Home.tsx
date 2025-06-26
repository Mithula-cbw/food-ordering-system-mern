import HomeBanner from "@/components/Home/HomeBanner";

export default function Home() {
  return (
    <div className="w-full">
      <HomeBanner />
      <section className="max-w-6xl mx-auto py-10 text-center">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p>Explore our delicious meals.</p>
      </section>
    </div>
  );
}
