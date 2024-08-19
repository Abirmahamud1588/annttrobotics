import { useState } from "react";
import MultiStageForm from "./components/MultiStageForm";
import ProductTable from "./components/ProductTable";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Chart from "./components/Chart";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <Provider store={store}>
      <div className="App w-full my-12 max-w-screen-xl mx-auto flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-screen-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4">Product Management</h1>
          <MultiStageForm />
          <div className="my-3">
            <ProductTable onView={handleViewProduct} />
          </div>
          <ProductDetailsModal
            product={selectedProduct}
            open={!!selectedProduct}
            onClose={handleCloseModal}
          />
          <div className="my-3 bg-blue-400">
            <Chart />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
