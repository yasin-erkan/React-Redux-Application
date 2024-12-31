import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./../components/ProductCard";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import { modalFunc } from "../redux/modalSlice";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];

  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc, data]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <input
        value={productInfo.name}
        type={"text"}
        placeholder={"Urun ekle"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <input
        value={productInfo.price}
        type={"text"}
        placeholder={"Fiyat ekle"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <input
        type={"file"}
        placeholder={"Resim Sec"}
        name={"urun"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "Urun Guncelle" : "Urun olustur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="flex items-center flex-wrap">
      <div>
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Urun Guncelle" : "Urun olustur"}
        />
      )}
    </div>
  );
};

export default Product;
