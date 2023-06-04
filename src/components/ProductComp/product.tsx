import styles from "./style.module.scss";
import { Button } from "../../ui";
import { FC, useState } from "react";
import { CartSku } from "../../types";
import { CART_ADD, CART_DEL, CART_REM, CART_SET_QUANTITY } from "../../store";

interface props {
  sku: CartSku | null;
  emit: (action: string, value: number) => void;
}

export const ProductComp: FC<props> = ({ sku, emit }) => {
  const [isShownChar, setIsShownChar] = useState(false);
  const [isShownInfo, setIsShownInfo] = useState(false);
  const [counter, setCounter] = useState<number>(sku?.quantity || 0);

  const single = (
    <>
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.23" clipPath="url(#clip0_56_1553)">
          <path
            d="M8.1 14.0625C8.05312 14.3164 7.95234 14.5361 7.79766 14.7217C7.64297 14.9072 7.44375 15 7.2 15H1.8C1.55625 15 1.35938 14.9097 1.20938 14.729C1.05937 14.5483 0.95625 14.3262 0.9 14.0625L0 8.4375V6.5625C0 6.2793 0.0914062 6.04492 0.274219 5.85938C0.457031 5.67383 0.726562 5.49072 1.08281 5.31006C1.43906 5.12939 1.65937 5.00977 1.74375 4.95117C2.11875 4.67773 2.45625 4.35547 2.75625 3.98438C3.05625 3.61328 3.27656 3.22266 3.41719 2.8125H3.15C3.02812 2.8125 2.92266 2.76611 2.83359 2.67334C2.74453 2.58057 2.7 2.4707 2.7 2.34375V0.46875C2.7 0.341797 2.74453 0.231934 2.83359 0.13916C2.92266 0.0463867 3.02812 0 3.15 0H5.85C5.97187 0 6.07734 0.0463867 6.16641 0.13916C6.25547 0.231934 6.3 0.341797 6.3 0.46875V2.34375C6.3 2.4707 6.25547 2.58057 6.16641 2.67334C6.07734 2.76611 5.97187 2.8125 5.85 2.8125H5.58281C5.86406 3.60352 6.38437 4.28711 7.14375 4.86328C7.24687 4.95117 7.48125 5.08789 7.84687 5.27344C8.2125 5.45898 8.49609 5.64941 8.69766 5.84473C8.89922 6.04004 9 6.2793 9 6.5625V8.4375L8.1 14.0625Z"
            fill="#3F4E65"
          />
        </g>
        <defs>
          <clipPath id="clip0_56_1553">
            <rect width="9" height="15" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>{sku?.unitsCount}</span>
      <span>{sku?.measureUnits}</span>
    </>
  );
  const pack = (
    <>
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.23" clipPath="url(#clip0_56_1572)">
          <path
            d="M13.3035 7.99994C12.7753 7.99994 12.2785 7.71869 12.0097 7.26869L10.0003 3.93743L7.9941 7.26869C7.72222 7.72181 7.22535 8.00306 6.69722 8.00306C6.5566 8.00306 6.41597 7.98431 6.2816 7.94369L2.00035 6.71868V12.2812C2.00035 12.7406 2.31285 13.1406 2.7566 13.2499L9.51285 14.9406C9.8316 15.0187 10.166 15.0187 10.4816 14.9406L17.2441 13.2499C17.6878 13.1374 18.0003 12.7374 18.0003 12.2812V6.71868L13.7191 7.94056C13.5847 7.98119 13.4441 7.99994 13.3035 7.99994ZM19.9472 4.49369L18.3378 1.28118C18.241 1.08743 18.0316 0.974934 17.816 1.00306L10.0003 1.99993L12.866 6.75306C12.9847 6.94993 13.2222 7.04368 13.4441 6.98118L19.6285 5.21556C19.9378 5.12493 20.0878 4.78118 19.9472 4.49369ZM1.66285 1.28118L0.0534711 4.49369C-0.0902789 4.78118 0.0628461 5.12493 0.369096 5.21243L6.55347 6.97806C6.77535 7.04056 7.01285 6.94681 7.1316 6.74993L10.0003 1.99993L2.1816 1.00306C1.96597 0.978059 1.75972 1.08743 1.66285 1.28118Z"
            fill="#3F4E65"
          />
        </g>
        <defs>
          <clipPath id="clip0_56_1572">
            <rect width="20" height="16" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <span>{sku?.pack + "X" + sku?.unitsCount}</span>
      <span>{sku?.measureUnits}</span>
    </>
  );

  return sku ? (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={sku.images[0]} alt={sku.info} />
      </div>
      <div className={styles.description}>
        {!!sku.stock ? (
          <span className={styles.semibold} style={{ color: "#1FD85D" }}>
            В наличии
          </span>
        ) : (
          <span className={styles.semibold} style={{ color: "red" }}>
            Нет в наличии
          </span>
        )}
        <h3 className={styles.heading}>
          <span className={styles.bold}>{sku.brand}</span>
          {" " + sku.info}
        </h3>
        <div className={styles.package}>{!sku.pack ? single : pack}</div>
        <div className={styles.tocart}>
          <span className={styles.bold + " " + styles.heading}>
            {sku.price}&nbsp;₸
          </span>
          <div className={styles.quantity}>
            <button
              datatype={CART_DEL}
              onClick={() => setCounter(counter - 1 || 1)}>
              -
            </button>
            <input
              type="text"
              value={counter}
              onChange={(e) => setCounter(+e.target.value)}
            />
            <button onClick={() => setCounter(counter + 1)}>+</button>
          </div>
          <Button
            text="В&nbsp;корзину"
            iconUrl="/images/icons/cart_white.svg"
            className={styles.toCart_btn}
            onClick={() => emit(CART_SET_QUANTITY, counter)}
          />
        </div>
        <div className={styles.share}>
          <a className={styles.share__link}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.00004 15.5C6.87469 15.4974 7.71626 15.1653 8.35704 14.57L14.617 18.147C14.4073 18.9666 14.4998 19.8343 14.8775 20.5913C15.2552 21.3483 15.893 21.9439 16.674 22.2692C17.455 22.5944 18.327 22.6274 19.1304 22.3623C19.9338 22.0971 20.6148 21.5515 21.0488 20.8252C21.4827 20.099 21.6406 19.2408 21.4935 18.4076C21.3464 17.5745 20.9042 16.8222 20.2478 16.2885C19.5914 15.7548 18.7647 15.4753 17.919 15.5013C17.0734 15.5273 16.2655 15.857 15.643 16.43L9.38304 12.853C9.44904 12.603 9.48504 12.344 9.49104 12.085L15.641 8.56996C16.2332 9.10874 16.9927 9.42747 17.792 9.47268C18.5913 9.51789 19.3818 9.28684 20.031 8.81828C20.6802 8.34972 21.1484 7.67217 21.3572 6.89929C21.5661 6.1264 21.5027 5.30522 21.1779 4.5735C20.853 3.84178 20.2864 3.24404 19.5731 2.88056C18.8597 2.51708 18.0431 2.40998 17.2602 2.57723C16.4772 2.74447 15.7756 3.17588 15.2731 3.79909C14.7705 4.42229 14.4976 5.19937 14.5 5.99996C14.504 6.28796 14.543 6.57497 14.617 6.85296L8.93304 10.1C8.60341 9.59003 8.1468 9.17461 7.60805 8.89454C7.06931 8.61446 6.46697 8.47936 5.86021 8.50251C5.25346 8.52566 4.66316 8.70627 4.14732 9.02658C3.63148 9.34689 3.20785 9.79589 2.91804 10.3295C2.62823 10.863 2.48222 11.4628 2.49435 12.0699C2.50648 12.677 2.67634 13.2704 2.98723 13.792C3.29812 14.3136 3.73936 14.7453 4.26758 15.0447C4.7958 15.3442 5.39284 15.5011 6.00004 15.5Z"
                fill="#FFC85E"
              />
            </svg>
          </a>
          <a className={styles.share__link}>
            <p>
              При покупке от
              <span className={styles.bold}> 10&nbsp;000&nbsp;₸ </span>
              бесплатная доставка по Кокчетаву и области
            </p>
          </a>
          <a className={styles.share__link}>
            Прайс-лист
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.958 6.375H11.1247V2.125H6.87467V6.375H4.04134L8.99967 12.0417L13.958 6.375ZM3.33301 13.4583H14.6663V14.875H3.33301V13.4583Z"
                fill="#3F4E65"
              />
            </svg>
          </a>
        </div>
        <ul>
          <li className={styles.description__item}>
            <p>Производитель:</p>
            <span className={styles.semibold}>{sku.manufacturer}</span>
          </li>
          <li className={styles.description__item}>
            <p>Бренд: </p>
            <span className={styles.semibold}>{sku.brand}</span>
          </li>
          <li className={styles.description__item}>
            <p>Штрихкод:</p>
            <span className={styles.semibold}>{sku.art}</span>
          </li>
        </ul>
        <div className={styles.info}>
          <div>
            <h3
              className={styles.semibold}
              onClick={() => setIsShownChar(!isShownChar)}>
              Описание
              <svg
                width="7"
                height="6"
                viewBox="0 0 7 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 6L0.468911 0.750001L6.53109 0.75L3.5 6Z"
                  fill="#3F4E65"
                />
              </svg>
            </h3>
            {isShownChar && <p>{sku.description}</p>}
          </div>
          <div>
            <h3
              className={styles.semibold}
              onClick={() => setIsShownInfo(!isShownInfo)}>
              Характеристики
              <svg
                width="7"
                height="6"
                viewBox="0 0 7 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5 6L0.468911 0.750001L6.53109 0.75L3.5 6Z"
                  fill="#3F4E65"
                />
              </svg>
            </h3>
            {isShownInfo && (
              <ul>
                <li className={styles.description__item}>
                  <p>Назначение:</p>
                  <span className={styles.semibold}>{sku.categories[0]}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Тип:</p>
                  <span className={styles.semibold}>{sku.categories[0]}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Производитель:</p>
                  <span className={styles.semibold}>{sku.manufacturer}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Бренд:</p>
                  <span className={styles.semibold}>{sku.brand}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Артикул:</p>
                  <span className={styles.semibold}>{sku.art}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Штрихкод:</p>
                  <span className={styles.semibold}>{sku.art}</span>
                </li>
                <li className={styles.description__item}>
                  <p>Вес:</p>
                  <span className={styles.semibold}>
                    {sku.unitsCount}&nbsp;{sku.measureUnits}
                  </span>
                </li>
                <li className={styles.description__item}>
                  <p>Объем:</p>
                  <span className={styles.semibold}>
                    {sku.unitsCount}&nbsp;{sku.measureUnits}
                  </span>
                </li>
                <li className={styles.description__item}>
                  <p>Кол-во в коробке:</p>
                  <span className={styles.semibold}>{sku.pack}</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.card}>
      <h2>This product is unavailable</h2>
    </div>
  );
};
