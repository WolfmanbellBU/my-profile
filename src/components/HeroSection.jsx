import heroImage from "../assets/images/hero-image.jpg.jpg";

export function HeroSection() {
  return (
    <section className="flex flex-1 w-full justify-center items-center px-8 py-16 bg-[#fafaf9]">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-right flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold !text-black leading-tight mb-4">
            Stay <br />
            Informed, <br />
            Stay Inspired
          </h1>
          <p className="text-[#666666] text-sm leading-relaxed">
            Discover a World of Knowledge at Your <br />
            Fingertips. Your Daily Dose of Inspiration <br />
            and Information.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={heroImage}
            alt="Author with a cat"
            className="w-[386px] h-[529px] rounded-2xl object-cover opacity-100 shadow-sm"
          />
        </div>

        <div className="text-left flex flex-col justify-center">
          <span className="text-xs text-gray-500 mb-1">-Author</span>
          <h2 className="text-lg font-bold !text-black mb-4">Thompson P.</h2>
          <p className="text-[#666666] text-sm leading-relaxed mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing insights
            on feline companionship and wellness.
          </p>
          <p className="text-[#666666] text-sm leading-relaxed">
            When I'm not writing, I spends time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </section>
  )
}
