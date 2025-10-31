import { useState } from 'react';
import { Container } from 'react-bootstrap';
import AuthScreen from './AuthScreen';
import NavigationBar from './components/NavigationBar';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetails';
import type { CurrentView, User } from './types';
  

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<CurrentView>('auth');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // --- Lógica do Carrinho (Simulação de Estado no Front) ---
  const [cartItems, setCartItems] = useState<{ productId: number; quantidade: number }[]>([]);

  // Simulação de login
  const handleLogin = (user: User) => {
    setUser(user);
    setView('catalog');
  };

  const handleLogout = () => {
    setUser(null);
    setView('auth');
    setCartItems([]);
  };
  
  // Lógica para adicionar/remover do carrinho
  const updateCart = (productId: number, change: number) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.productId === productId);
        
        if (existingItem) {
            const newQuantity = existingItem.quantidade + change;
            
            if (newQuantity <= 0) {
                return prevItems.filter(item => item.productId !== productId);
            }
            return prevItems.map(item =>
                item.productId === productId ? { ...item, quantidade: newQuantity } : item
            );
        }
        
        if (change > 0) {
            return [...prevItems, { productId, quantidade: change }];
        }

        return prevItems;
    });
  };


  const renderView = () => {
    if (!user || view === 'auth') {
      return <AuthScreen onLogin={handleLogin} />;
    }

    switch (view) {
      case 'catalog':
        return (
          <ProductCatalog 
            onSelectProduct={(id) => { setSelectedProductId(id); setView('details'); }} 
            cartItems={cartItems}
          />
        );
      case 'details':
        if (selectedProductId === null) {
          setView('catalog');
          return null; 
        }
        return (
          <ProductDetails 
            productId={selectedProductId} 
            onChangeView={setView} 
            onUpdateCart={updateCart}
            currentCartItem={cartItems.find(item => item.productId === selectedProductId)}
          />
        );
      case 'cart':
        return <h1 className='text-center mt-5'>🛒 Carrinho de Compras (Em Breve) - Itens: {cartItems.reduce((acc, item) => acc + item.quantidade, 0)}</h1>;
      case 'checkout':
        return <h1 className='text-center mt-5'>💰 Checkout (Em Breve)</h1>;
      case 'history':
        return <h1 className='text-center mt-5'>📋 Histórico de Pedidos (Em Breve)</h1>;
      default:
        return <ProductCatalog 
            onSelectProduct={(id) => { setSelectedProductId(id); setView('details'); }} 
            cartItems={cartItems}
          />;
    }
  };

  return (
    <>
      {user && <NavigationBar 
        user={user} 
        onViewChange={setView} 
        onLogout={handleLogout} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantidade, 0)} 
      />}
      
      <Container className="mt-4">
        {renderView()}
      </Container>
    </>
  );
}

export default App;