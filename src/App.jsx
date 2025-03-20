import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyOrders from './views/MyOrders';
import AddEditOrder from './views/AddEditOrder';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/add-order/:id?" element={<AddEditOrder />} />
        <Route path="/" element={<MyOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
