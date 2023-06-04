import styles from "./style.module.scss";
import { useMemo, useState } from "react";
import { CartItemComp } from "./CartItemComp";
import { ModalComp } from "../";
import { Button } from "../../ui";
import { Sku, IGlobalStore, CartAction } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { HandlerProps } from "./CartItemComp";
import { CART_CLEAR_ALL } from "../../store";

export interface CartSku extends Sku {
  quantity: number;
}

export const CartComp = () => {
  const dispatch = useDispatch<Dispatch<CartAction>>();

  const { cart, total } = useSelector((s: IGlobalStore) => s.cart);
  const { catalogue } = useSelector((s: IGlobalStore) => s.catalogue);
  const [isModalShown, setIsModalShown] = useState(false);

  const [totalCount, setTotal] = useState(0);

  const cartArr = useMemo<CartSku[]>(() => {
    const arr: CartSku[] = [];
    let tot = 0;

    Object.entries(cart).forEach(([k, v]) => {
      arr.push({ ...catalogue[k], quantity: v });
      tot = tot + catalogue[k].price * v;
    });

    setTotal(tot);
    return arr || [];
  }, [Object.keys(cart).length, total]);

  const handleToCart = ({ type, payload, quantity }: HandlerProps) => {
    dispatch({ type, payload, quantity });
  };

  const handleCheckout = () => {
    const action = {
      type: CART_CLEAR_ALL,
      payload: "",
    };
    dispatch(action);
    setIsModalShown(true);
  };

  return (
    <section className={styles.cart + " container"}>
      <h1>Корзина</h1>
      <div className={styles.cart__inner}>
        {!cartArr.length ? (
          <h3 className={styles.cart__empty_msg}>Корзина пуста</h3>
        ) : (
          cartArr.map((c) => (
            <CartItemComp sku={c} toCart={handleToCart} key={c.art} />
          ))
        )}
      </div>
      <div className={styles.checkout}>
        <Button text="Оформить заказ" onClick={handleCheckout} />
        <span className={styles.total}>
          {Number(totalCount).toFixed(2)}&nbsp;₸
        </span>
      </div>
      {isModalShown && (
        <ModalComp
          markup={totalCount ? "Заказ оформлен" : "Корзина пуста"}
          onClose={() => setIsModalShown(false)}
        />
      )}
    </section>
  );
};
