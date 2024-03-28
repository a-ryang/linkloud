import Hero from "./_components/hero";

export default function HomePage() {
  return (
    <>
      <header className="fixed top-0 w-full flex items-center h-[3.25rem] z-[1000]">
        <div className="container px:4 ">
          <h1 className="text-white">링클라우드</h1>
        </div>
      </header>
      <main className="min-h-screen">
        <Hero />
        <section>이미지</section>
        <section>등록된 링크</section>
      </main>
    </>
  );
}
