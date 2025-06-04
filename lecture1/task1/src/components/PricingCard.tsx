interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  subscribeLink?: string; // Optional: URL for the subscribe button
}

const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
  subscribeLink = "#",
}) => {
  const cardBaseClasses =
    "rounded-lg shadow-md p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out focus-within:ring-4 focus-within:ring-offset-2 focus-within:ring-indigo-500";
  const featuredClasses = isFeatured
    ? "bg-slate-700 text-white scale-100 md:scale-105 hover:shadow-2xl"
    : "bg-white text-slate-800 hover:shadow-xl";
  const buttonBaseClasses =
    "mt-auto py-3 px-6 rounded-md font-semibold transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";
  const buttonFeaturedClasses = isFeatured
    ? "bg-indigo-500 hover:bg-indigo-600 text-white focus:ring-indigo-400"
    : "bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-700";
  const buttonNonFeaturedClasses =
    "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 focus:ring-slate-400";

  return (
    <div
      className={`${cardBaseClasses} ${featuredClasses} w-full max-w-sm mx-auto`}
      tabIndex={0} // Make the div focusable
    >
      <h3
        className={`text-2xl font-bold mb-2 ${
          isFeatured ? "text-white" : "text-slate-900"
        }`}
      >
        {plan}
      </h3>
      <p
        className={`text-4xl font-extrabold mb-6 ${
          isFeatured ? "text-indigo-300" : "text-slate-900"
        }`}
      >
        {price}
      </p>
      <ul className="space-y-3 mb-8 w-full">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`pb-3 border-b ${
              isFeatured
                ? "border-slate-600 text-slate-300"
                : "border-slate-200 text-slate-600"
            }`}
          >
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={subscribeLink}
        className={`${buttonBaseClasses} ${
          isFeatured ? buttonFeaturedClasses : buttonNonFeaturedClasses
        } w-full sm:w-auto`}
      >
        SUBSCRIBE
      </a>
    </div>
  );
};
export default PricingCard;
