import {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Button, Input } from "../../../ui";
import styles from "./style.module.scss";

export interface IForm {
  manufacturers: {
    [key: string]: boolean;
  };
  price_min?: string;
  price_max?: string;
}

interface IFilterProps {
  formProp: IForm;
  onSubmit: (arg0: IForm) => void;
  onReset: () => void;
  onChange: (arg0: IForm) => void;
}

const defaultForm = {
  manufacturers: {},
  price_min: "",
  price_max: "",
};

export const FilterComp: FC<IFilterProps> = ({
  formProp,
  onSubmit,
  onReset,
  onChange,
}) => {
  const [form, setForm] = useState<IForm>(formProp);

  useEffect(() => {
    setForm(() => {
      return {
        ...formProp,
      };
    });
  }, [formProp]);

  console.log("filter emited ", formProp, form);

  const inputHandler = (value: string | undefined) => {
    if (!value)
      return setForm(() => {
        return { ...formProp };
      });

    const obj = { ...formProp.manufacturers };
    Object.keys(formProp.manufacturers).forEach(
      (i) => !i.toLowerCase().includes(value.toLowerCase()) && delete obj[i]
    );
    setForm((curr) => {
      return { ...curr, manufacturer: obj };
    });
  };

  const formChangeHandler = (e: ChangeEvent<HTMLFormElement>) => {
    let newForm = form;

    if (e.target.type !== "checkbox") {
      newForm = { ...newForm, [e.target.name]: e.target.value };
    }

    setForm(newForm);
    onChange(form);
  };

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newForm = form;
    const t = e.target;

    newForm.manufacturers = {
      ...newForm.manufacturers,
      [t.value]: t.checked,
    };

    setForm(newForm);
    onChange(form);
  };

  const formSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
  };

  const formResetHandler = (e: MouseEvent<HTMLFormElement>) => {
    setForm(defaultForm);
    onReset();
  };

  return (
    <form
      className={styles.filter}
      onChange={formChangeHandler}
      onSubmit={formSubmitHandler}>
      <h4>ПОДБОР ПО ПАРАМЕТРАМ</h4>
      <div className={styles.price}>
        <h5>Цена</h5>
        <div className={styles.price__inner}>
          <input
            type="text"
            name="price_min"
            placeholder={formProp.price_min}
          />
          -
          <input
            type="text"
            name="price_max"
            placeholder={formProp.price_max}
          />
        </div>
      </div>
      <div className={styles.filter__block + " manufacturer"}>
        <h5>Производитель</h5>
        <Input
          onClick={inputHandler}
          placeholder="Поиск..."
          iconUrl="/images/icons/search.svg"
        />
        <fieldset className={styles.checkboxes}>
          {Object.entries(form.manufacturers).length ? (
            Object.entries(form.manufacturers).map((m, indx) => (
              <label className={styles.label} key={m[0] + indx}>
                <input
                  onChange={checkboxHandler}
                  checked={m[1]}
                  type="checkbox"
                  className={styles.checkbox}
                  value={m[0]}
                  name="manufacturer"
                />
                {m[0]}
              </label>
            ))
          ) : (
            <span className={styles.label}>There's no such manufacturer</span>
          )}
        </fieldset>
      </div>
      <div className={styles.filter__btns}>
        <Button text="Показать" />
        <Button
          iconUrl="/images/icons/bin.svg"
          onClick={formResetHandler}
          type="reset"
        />
      </div>
    </form>
  );
};
