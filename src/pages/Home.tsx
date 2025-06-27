import HomeSwiperDemo from "@/components/Home/HomeSwiper";
import FeaturedCategories from "../components/Home/FeaturedCategories";
import HomeBanner from "../components/Home/HomeBanner";

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
