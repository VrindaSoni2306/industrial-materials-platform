import React from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../../data/products';
import ProductCard from '../ui/ProductCard';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="featured-products">
      <div className="container">
        <div className="featured-products__header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              High-demand materials trusted by leading aerospace, energy, and electronics manufacturers worldwide.
            </p>
          </div>
          <Link to="/products" className="btn btn--outline">View All Products</Link>
        </div>

        <div className="featured-products__grid">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
