import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomInput from "../../components/Inputs/CustomInput";
import Navbar from "../../components/Navbar/Navbar";
import { ErrorToast, SuccessToast } from "../../utils/ShowToast"; // Assuming you have toast notifications
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/Slices/ProductSlice";
import PageLoader from "../../components/Loaders/PageLoader";
import { CreateProductOrderApi } from "../../Api_Requests/Api_Requests";
import AddingLightLoader from "../../components/Loaders/AddingLightLoader";

const Cart = () => {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ProductState = useSelector((state) => state.ProductState);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  useEffect(() => {
    const currentItem = ProductState.data.find((dt) => dt._id === id);
    if (currentItem) {
      setItems([
        {
          id: currentItem._id,
          name: currentItem.name,
          price: currentItem.price,
          quantity: 1,
          imageUrl: currentItem.imageUrl,
        },
      ]);
    }
  }, [ProductState.data]);

  const handleQuantityChange = (id, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const [Loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    if (!name || !email || !address || !mobile_no) {
      ErrorToast("Please fill in all customer details");
      return;
    }

    try {
      const response = await CreateProductOrderApi({
        name,
        email,
        mobile_no,
        address,
        products: [
          {
            productId: id,
            name: items[0].name,
            price: items[0].price,
            qty: items[0].quantity,
            amount: items[0].quantity * items[0].price,
          },
        ],
        total_amount: totalAmount,
      });
      if (response.data.success) {
        SuccessToast("Order Successfully Place! - Wait for Confirmation");
        SuccessToast("Checkout successful!");
        navigate("/products");
      } else {
        ErrorToast("Unable to place order");
      }
    } catch (err) {
      console.log(err);
      ErrorToast(err?.response?.data?.error?.msg || err.message);
    }
    setLoading(false);
  };

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-aliceblue min-h-screen">
      <Navbar />
      {ProductState.loading ? (
        <div className="h-[80vh] w-screen flex justify-center items-center">
          <PageLoader />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center px-4">
            <div className="font-bold text-2xl font-montserrat text-custom-bg text-center w-full my-6">
              Checkout
            </div>
            <div className="w-full max-w-2xl bg-aliceblue p-5 shadow-lg rounded-lg">
              <div className="text-custom-bg text-2xl font-bold font-montserrat mb-4">
                Customer Detail
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-4 justify-center mb-4">
                <CustomInput
                  Value={name}
                  setValue={setName}
                  Type={"text"}
                  label={"Name"}
                  required={true}
                  placeholder={"Enter Name"}
                />
                <CustomInput
                  Value={email}
                  setValue={setEmail}
                  Type={"email"}
                  label={"Email"}
                  required={true}
                  placeholder={"Enter Email"}
                />
                <CustomInput
                  Value={mobile_no}
                  setValue={setMobile_no}
                  Type={"text"}
                  label={"Mobile No"}
                  required={true}
                  placeholder={"Enter Mobile No"}
                />
                <CustomInput
                  Value={address}
                  setValue={setAddress}
                  Type={"text"}
                  label={"Address"}
                  required={true}
                  placeholder={"Enter Address"}
                />
              </div>

              <div className="text-custom-bg text-2xl font-bold font-montserrat mb-4">
                Item Detail
              </div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex bg-white items-center justify-between mb-4 border-[1px] rounded-lg border-custom-bg-hover px-3 py-2"
                >
                  <div className="flex items-center gap-x-2">
                    <img
                      src={item.imageUrl}
                      alt="Doctor Image"
                      className="w-24 h-24 rounded-[20px] relative"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold font-montserrat">
                        {item.name}
                      </span>
                      <span className="text-gray-600 font-montserrat">
                        PKR {item.price}/-
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        handleQuantityChange(
                          item.id,
                          Math.max(item.quantity - 1, 1)
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          Math.max(e.target.value, 1)
                        )
                      }
                      className="w-12 text-center mx-2 bg-aliceblue outline-none  border-custom-bg border-[1px] rounded-md"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded-lg"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="font-montserrat font-semibold">
                    PKR {item.price * item.quantity}/-
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-xl font-bold mt-4">
                <span></span>
                <div className="font-montserrat font-semibold">
                  Total Amount: PKR {totalAmount}/-
                </div>
              </div>
              <div className="flex justify-end mt-6">
                {Loading ? (
                  <AddingLightLoader />
                ) : (
                  <button
                    className="px-6 py-3 bg-green-500 text-custom-bg hover:bg-custom-bg hover:text-aliceblue font-bold rounded-lg transition-all ease-in-out duration-500 border-custom-bg border-2"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
