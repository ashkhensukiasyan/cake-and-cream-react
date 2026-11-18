import React from 'react';

interface NavbarProps {
    cartCount: number;
    onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
    return (
        <header style={styles.header}>
            <div style={styles.logo}>Cake & Cream</div>
            <button onClick={onCartClick} style={styles.cartBtn}>
                🛒 Զամբյուղ <span style={styles.badge}>{cartCount}</span>
            </button>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        background: '#1b1b1b',
        color: '#FFE28A',
        borderBottom: '1px solid rgba(255, 226, 138, 0.2)',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        letterSpacing: '1px',
    },
    cartBtn: {
        background: '#FFE28A',
        color: '#1b1b1b',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '16px',
    },
    badge: {
        background: '#1b1b1b',
        color: '#FFE28A',
        padding: '2px 8px',
        borderRadius: '50%',
        fontSize: '14px',
        marginLeft: '5px',
    },
};