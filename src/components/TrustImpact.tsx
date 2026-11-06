import CircularStat from "@/components/CircularStat";

export default function TrustImpact() {
  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-[#0b291a] flex flex-col items-center justify-center text-center px-6">
      {/* Badge */}
      <div className="inline-block bg-white/10 text-emerald-100 border border-white/10 font-extrabold text-xs px-4 py-1.5 rounded-sm mb-6 uppercase tracking-wider backdrop-blur-sm">
        100% Verified Causes
      </div>

      {/* Main Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6">
        A new standard for transparent and honest giving.
      </h2>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-emerald-100/90 max-w-3xl mx-auto font-medium leading-relaxed mb-16 lg:mb-20">
        We are building a platform where every donation is fully trackable. Join our early movement to connect
        compassionate donors with verified causes, ensuring your impact reaches those who need it most.
      </p>

      {/* Animated Circles */}
      <div className="flex flex-row justify-center items-start gap-4 md:gap-24 lg:gap-32 w-full max-w-[1200px]">
        <CircularStat
          numericValue={100}
          suffix="%"
          percentage={100}
          label={
            <>
              Complete transparency in
              <br />
              every single donation
            </>
          }
        />
        <CircularStat
          numericValue={24}
          suffix="+"
          percentage={65}
          label={
            <>
              Verified partner NGOs
              <br />
              already onboarded
            </>
          }
        />
        <CircularStat
          numericValue={100}
          prefix="$"
          suffix="k"
          percentage={45}
          label={
            <>
              Our initial community
              <br />
              fundraising milestone
            </>
          }
        />
      </div>
    </section>
  );
}
