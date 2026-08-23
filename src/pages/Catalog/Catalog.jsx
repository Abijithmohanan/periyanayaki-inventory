import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Wrench, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useInventory } from '../../context/InventoryContext';
import mainLogo from '../../assets/main-logo.png';
import minimalLogo from '../../assets/minimal-logo.png';

const highlights = [
  {
    icon: Award,
    title: 'Since 1987',
    text: 'Nearly four decades of designing and manufacturing commercial kitchen machinery trusted by chefs and caterers.',
  },
  {
    icon: Wrench,
    title: 'Built to Order',
    text: 'Every machine is engineered for heavy-duty commercial kitchens — from bulk cooking equipment to prep tools.',
  },
  {
    icon: ShieldCheck,
    title: 'Dealer & Direct Pricing',
    text: 'Transparent customer and dealer pricing for every product in our catalog, backed by dependable after-sales support.',
  },
];

const Catalog = () => {
  const { user } = useAuth();
  const { products } = useInventory();
  const featured = products.slice(0, 6);

  return (
    <div className="catalog-page">
      <header className="catalog-hero">
        <img src={mainLogo} alt="Periyanayaki Kitchen Engineering" className="catalog-hero-logo" />
        <h1>Periyanayaki Kitchen Engineering</h1>
        <p className="catalog-tagline">Your Chef's Favourite — Commercial Kitchen Machinery, Since 1987</p>
        <Link to={user ? '/dashboard' : '/login'} className="btn btn-primary catalog-cta">
          {user ? 'Go to Dashboard' : 'Login to Inventory System'} <ArrowRight size={16} />
        </Link>
      </header>

      <section className="catalog-section">
        <h2 className="catalog-section-title">Our Legacy</h2>
        <p className="catalog-section-text">
          For nearly 40 years, Periyanayaki Kitchen Engineering has been building rugged, reliable
          commercial kitchen machines for hotels, caterers, and food businesses. What began as a small
          workshop in 1987 has grown into a trusted name in kitchen engineering — known for durability,
          precision, and honest service.
        </p>
      </section>

      <section className="catalog-section">
        <div className="catalog-highlight-grid">
          {highlights.map((h) => (
            <div className="catalog-highlight-card" key={h.title}>
              <h.icon size={28} />
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="catalog-section">
          <h2 className="catalog-section-title">Machine Catalog Overview</h2>
          <div className="catalog-product-grid">
            {featured.map((p) => (
              <div className="catalog-product-card" key={p.id}>
                <div className="catalog-product-image">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.name} />
                  ) : (
                    <ChefHat size={30} />
                  )}
                </div>
                <div className="catalog-product-name">{p.name}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="catalog-footer">
        <img src={minimalLogo} alt="Periyanayaki Kitchen Engineering" className="catalog-footer-logo" />
        <p>&copy; {new Date().getFullYear()} Periyanayaki Kitchen Engineering. Kitchen Engineering, Since 1987.</p>
      </footer>
    </div>
  );
};

export default Catalog;
