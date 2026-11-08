import React from 'react';
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SavedItemsView: React.FC = () => {
  const {
    products,
    savedProductIds,
    toggleSaveProduct,
    addToCart,
    setSelectedProductId,
    setActiveView
  } = useApp();

  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <button
          onClick={() => setActiveView('home')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-hasta-terracotta-600 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <span className="text-xs font-semibold tracking-widest text-hasta-terracotta-700 uppercase block">
          Curated Wishlist
        </span>
        <h1 className="font-serif text-3xl font-bold text-hasta-charcoal-900 mt-1">
          Saved Creations ({savedProducts.length})
        </h1>
        <p className="text-stone-700 text-xs sm:text-sm mt-1 font-medium">
          Handcrafted heritage pieces you are considering for your home interiors.
        </p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-200 space-y-3">
          <Heart className="w-12 h-12 text-stone-400 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-stone-900">
            No saved pieces yet
          </h3>
          <p className="text-xs text-stone-700 max-w-xs mx-auto font-medium">
            Click the heart icon on any masterpiece while browsing to save it to your personal architectural collection.
          </p>
          <button
            onClick={() => setActiveView('catalog')}
            className="btn-cobalt mt-2 bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white px-5 py-2.5 rounded-full text-xs font-sans font-semibold shadow-clean transition-colors cursor-pointer"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {savedProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden border border-hasta-cream-300 shadow-sm hover:shadow-luxury-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-stone-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => toggleSaveProduct(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-rose-50 text-rose-600 shadow cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4">
                  <span className="text-[10px] text-hasta-terracotta-700 font-bold uppercase tracking-wider block mb-1">
                    {product.craftTechnique}
                  </span>
                  <h3
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setActiveView('pdp');
                    }}
                    className="font-serif text-base font-bold text-hasta-charcoal-900 group-hover:text-hasta-terracotta-600 transition-colors line-clamp-1 cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-stone-700 mt-1 font-semibold">
                    By {product.artisanName}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-stone-100 flex items-center justify-between font-sans">
                <span className="type-price text-hasta-earth-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="btn-cobalt bg-hasta-cobalt-700 hover:bg-hasta-cobalt-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-clean transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

