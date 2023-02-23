import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

// dev-76rb51zpq72ummpz.us.auth0.com
// 5K9kxfif14NbL8CAhUOMXCrqIy75apNP

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
        domain="dev-76rb51zpq72ummpz.us.auth0.com"
        clientId="5K9kxfif14NbL8CAhUOMXCrqIy75apNP"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
        cacheLocation='localStorage'
    >
        <ProductsProvider>
            <FilterProvider>
                <CartProvider>
                    <App />
                </CartProvider>
            </FilterProvider>
        </ProductsProvider>
    </Auth0Provider>
);
