import FeaturedCategories from "../components/Home/FeaturedCategories";
import HomeBanner from "../components/Home/HomeBanner";
import HomeSwiperDemo from "../components/Home/HomeSwiperDemo";

export default function Home() {
  return (
    <div className="w-full">
      <HomeBanner />
      <section className="px-4 mx-auto py-10 text-center">
        <FeaturedCategories />
        <HomeSwiperDemo />
      </section>
    </div>
  );
}
