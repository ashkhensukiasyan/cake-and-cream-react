import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductList } from './components/ProductList';
import type { Product, CartItem } from './types';

export function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false); // Պատվերի ֆորմայի վիճակը

  // Հաճախորդի տվյալներ
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleIncrease = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id: number) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert('Խնդրում ենք լրացնել բոլոր դաշտերը');
      return;
    }
    alert(`Շնորհավորում ենք, ${name}! Ձեր պատվերը հաջողությամբ ընդունվեց։ Առաքվելու է հետևյալ հասցեով՝ ${address}:`);
    setCart([]);
    setIsCheckingOut(false);
    setIsCartOpen(false);
    setName('');
    setPhone('');
    setAddress('');
  };

  return (
    <div style={{ background: '#1b1b1b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <Navbar
        cartCount={totalCartCount}
        onCartClick={() => { setIsCartOpen(!isCartOpen); setIsCheckingOut(false); }}
      />

      <ProductList onAddToCart={handleAddToCart} />

      {isCartOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '380px',
          height: '100vh',
          background: '#141414',
          borderLeft: '1px solid rgba(255,226,138,0.2)',
          padding: '20px',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: '#FFE28A' }}>{isCheckingOut ? 'Ձևակերպել Պատվերը' : 'Ձեր Զամբյուղը'}</h3>
            <button
              onClick={() => { setIsCartOpen(false); setIsCheckingOut(false); }}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>

          {!isCheckingOut ? (
            <>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {cart.length === 0 ? (
                  <p style={{ color: '#888', textAlign: 'center', marginTop: '50px' }}>Զամբյուղը դատարկ է</p>
                ) : (
                  cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '15px', color: '#FFE28A', marginBottom: '5px' }}>{item.name}</h4>
                        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '8px' }}>{item.price} AMD</p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => handleDecrease(item.id)}
                            style={{ background: '#252525', color: '#FFE28A', border: '1px solid #FFE28A', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.quantity}</span>
                          <button
                            onClick={() => handleIncrease(item.id)}
                            style={{ background: '#252525', color: '#FFE28A', border: '1px solid #FFE28A', width: '25px', height: '25px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.price * item.quantity} AMD</span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '16px' }}
                          title="Հեռացնել"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,226,138,0.2)', paddingTop: '15px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                  <span>Ընդհանուր՝</span>
                  <span style={{ color: '#FFE28A' }}>{totalPrice} AMD</span>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={() => setIsCheckingOut(true)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: cart.length === 0 ? '#555' : '#FFE28A',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                    color: '#1b1b1b'
                  }}
                >
                  Անցնել ձևակերպման
                </button>
              </div>
            </>
          ) : (
            /* Պատվերի լրացման ֆորմա */
            <form onSubmit={handleOrderSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1, justifyContent: 'center' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#FFE28A', display: 'block', marginBottom: '5px' }}>Ձեր Անունը</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFE28A', background: '#1f1f1f', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#FFE28A', display: 'block', marginBottom: '5px' }}>Հեռախոսահամար</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFE28A', background: '#1f1f1f', color: '#fff' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#FFE28A', display: 'block', marginBottom: '5px' }}>Առաքման Հասցե</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={3}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #FFE28A', background: '#1f1f1f', color: '#fff', resize: 'none' }}
                />
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid #888', color: '#888', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Հետ
                </button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: '10px', background: '#FFE28A', border: 'none', color: '#1b1b1b', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Հաստատել պատվերը
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default App;