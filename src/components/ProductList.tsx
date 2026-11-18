import React, { useState } from 'react';
import type { Product } from '../types';

const products: Product[] = [
    { id: 1, name: 'Շոկոլադե Տորթ', category: 'cake', price: 15000, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Ելակով Կափքեյքեր (6 հատ)', category: 'cupcake', price: 6000, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Ավանդական Փախլավա', category: 'baklava', price: 8000, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Մրգային Տորթ', category: 'cake', price: 12000, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=500&q=80' },
];

interface ProductListProps {
    onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onAddToCart }) => {
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Ֆիլտրում ենք ըստ կատեգորիայի և որոնման բառի
    const filteredProducts = products.filter(p => {
        const matchesCategory = filter === 'all' || p.category === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: '40px', background: '#1b1b1b', minHeight: '80vh', color: '#fff' }}>
            <h2 style={{ textAlign: 'center', color: '#FFE28A', marginBottom: '25px', fontSize: '32px' }}>Մեր Քաղցրավենիքը</h2>

            {/* Որոնման դաշտ */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                <input
                    type="text"
                    placeholder="Որոնել քաղցրավենիք..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '12px 20px',
                        width: '100%',
                        maxWidth: '400px',
                        borderRadius: '25px',
                        border: '1px solid #FFE28A',
                        background: '#141414',
                        color: '#fff',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Կատեգորիաների Ֆիլտրեր */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
                {['all', 'cake', 'cupcake', 'baklava'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '8px 18px',
                            borderRadius: '20px',
                            border: '1px solid #FFE28A',
                            background: filter === cat ? '#FFE28A' : 'transparent',
                            color: filter === cat ? '#1b1b1b' : '#FFE28A',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {cat === 'all' ? 'Բոլորը' : cat === 'cake' ? 'Տորթեր' : cat === 'cupcake' ? 'Կափքեյքեր' : 'Փախլավա'}
                    </button>
                ))}
            </div>

            {/* Ապրանքների Ցանց (Grid) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', maxWidth: '1100px', margin: '0 auto' }}>
                {filteredProducts.length === 0 ? (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', fontSize: '18px' }}>Ոչինչ չգտնվեց...</p>
                ) : (
                    filteredProducts.map(product => (
                        <div key={product.id} style={{ background: '#252525', borderRadius: '15px', overflow: 'hidden', border: '1px solid rgba(255,226,138,0.15)', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#FFE28A' }}>{product.name}</h3>
                                <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>{product.price} AMD</p>
                                <button
                                    onClick={() => onAddToCart(product)}
                                    style={{ width: '100%', padding: '10px', background: '#d8c16e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', color: '#1b1b1b' }}
                                >
                                    Ավելացնել զամբյուղ
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};