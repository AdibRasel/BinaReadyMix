import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFound from "./Page/NotFound/NotFound";
import Dashboard from "./Page/Dashboard/Dashboard";
import Orders from "./Page/Orders/Orders";
import Report from "./Page/Report/Report";
import OfficeAssistant from "./Page/OfficeAssistant/OfficeAssistant";
import Expenses from "./Page/Expenses/Expenses";
import Product from "./Page/Product/Product";
import Review from "./Page/Review/Review";
import Category from "./Page/Category/Category";
import SubCategory from "./Page/SubCategory/SubCategory";
import Brands from "./Page/Brands/Brands";
import Variants from "./Page/Variants/Variants";
import Coupons from "./Page/Coupons/Coupons";
import Slider from "./Page/Slider/Slider";
import Notifications from "./Page/Notifications/Notifications";
import OrdersPending from "./Page/Orders/OrdersPending";
import OrdersProcessing from "./Page/Orders/OrdersProcessing";
import OrdersDelivered from "./Page/Orders/OrdersDelivered";
import AdminReport from "./Components/AdminReport/AdminReport";
import BottomToTopButton from "./Components/BottomToTopButton/BottomToTopButton";
import EmployeePage from "./Page/EmployeeList/EmployeePage";
// start commend npm run dev -- --host 0.0.0.0
// deploy npm run deploy deploy again

const login = true; // false দিলে NotFound দেখাবে

function App() {
  return (
    <BrowserRouter>
      {login ? (
        // login হলে নিচের গুলো শো করবে। 
        <Layout>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/BinaReadyMix" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/OrdersPending" element={<OrdersPending />} />
            <Route path="/OrdersProcessing" element={<OrdersProcessing />} />
            <Route path="/OrdersDelivered" element={<OrdersDelivered />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/OfficeAssistant" element={<OfficeAssistant />} />
            <Route path="/Expenses" element={<Expenses />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Review" element={<Review />} />
            <Route path="/Category" element={<Category />} />
            <Route path="/SubCategory" element={<SubCategory />} />
            <Route path="/Brands" element={<Brands />} />
            <Route path="/Variants" element={<Variants />} />
            <Route path="/Coupons" element={<Coupons />} />
            <Route path="/Slider" element={<Slider />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/AdminReport" element={<AdminReport />} />
            <Route path="/EmployeeList" element={<EmployeePage />} />
          </Routes>
          <BottomToTopButton />
        </Layout>
      ) : (
        // login না হলে নিচের গুলো শো করবে।
         <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<NotFound />} />
          </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
