import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Page from './components/Page';
import Calculator from './pages/Calculator';
import EAN13Generator from './pages/EAN13Generator';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/calculadora",
    element: <Calculator />
  },
  {
    path: "/gerador-ean-13",
    element: <EAN13Generator />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Page>
      <RouterProvider router={router} />
    </Page>
  </StrictMode>,
)
