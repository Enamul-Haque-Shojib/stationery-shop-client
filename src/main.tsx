import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import AuthProvider from './providers/AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
