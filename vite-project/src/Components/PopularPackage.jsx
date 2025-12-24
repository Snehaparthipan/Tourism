import "../CSS/popular.css";

const packages = [
  {
    id: 1,
    title: "European Grand Tour",
    price: "$3,499",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    countries: ["Paris", "Rome", "Barcelona"],
    days: "14 Days",
    features: [
      "5-star hotels",
      "Guided tours",
      "All meals included",
      "Airport transfers",
    ],
  },
  {
    id: 2,
    title: "Southeast Asia Adventure",
    price: "$2,199",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200",
    countries: ["Thailand", "Vietnam", "Cambodia"],
    days: "12 Days",
    features: [
      "Boutique hotels",
      "Local experiences",
      "Some meals",
      "Train tickets",
    ],
  },
  {
    id: 3,
    title: "Island Hopping Greece",
    price: "$2,899",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200",
    countries: ["Santorini", "Mykonos", "Crete"],
    days: "10 Days",
    features: [
      "Luxury villas",
      "Private yacht",
      "Wine tasting",
      "Ferry passes",
    ],
  },
];

export default function PopularPackage() {
  return (
    <section className="packages">
      <h2>Popular Packages</h2>
      <p className="sub-text">
        Carefully crafted itineraries for the perfect vacation
      </p>

      <div className="package-grid">
        {packages.map((pkg) => (
          <div className="package-card" key={pkg.id}>
            <div className="img-wrap">
              <img src={pkg.image} alt={pkg.title} />
              <span className="price-badge">{pkg.price}</span>
            </div>

            <div className="package-content">
              <h3>{pkg.title}</h3>

              <div className="meta">
                <span>🌍 {pkg.countries.length} Countries</span>
                <span>🕒 {pkg.days}</span>
              </div>

              <div className="tags">
                {pkg.countries.map((c, index) => (
                  <span key={index}>{c}</span>
                ))}
              </div>

              <ul className="features">
                {pkg.features.map((f, index) => (
                  <li key={index}>✔ {f}</li>
                ))}
              </ul>

              <button className="book-btn">Book This Package</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
