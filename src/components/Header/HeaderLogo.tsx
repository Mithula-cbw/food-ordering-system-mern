import { AspectRatio } from "../ui/aspect-ratio";

const HeaderLogo = () => {
  return (
    <div id="header-logo" className="w-[180px] h-auto flex justify-center items-center">
      <AspectRatio ratio={16 / 9}>
        <img
          src="/logo.png"
          alt="Auth Logo"
          className="rounded-md object-contain w-full h-full"
        />
      </AspectRatio>
    </div>
  );
};

export default HeaderLogo;
