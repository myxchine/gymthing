import Mobile from "./mobile";
import Desktop from "./desktop";

export default function Header() {
  return (
    <header className="flex flex-col w-full sticky top-0 z-[1000000] bg-transparent  p-2 md:p-4">
      <div className=" w-full px-4 pr-2 py-1 md:px-5 md:py-3    inset-0 z-10  max-w-4xl mx-auto rounded-[20px] md:rounded-full bg-black/5 backdrop-blur-lg">
        <Mobile />
        <Desktop />
      </div>
      <div className=" absolute bottom-0 left-0 w-full headergradient h-full" />
    </header>
  );
}
