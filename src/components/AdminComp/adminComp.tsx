import styles from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { IGlobalStore, Sku } from "../../types";
import {
  CATAL_ADD,
  CATAL_DEL,
} from "../../store/reducers/catalogueReducer/types";
import { AdminPanelForm } from "./AdminPanelForm";

export const AdminComp = () => {
  const dispatch = useDispatch();
  const { catalogue } = useSelector((s: IGlobalStore) => s.catalogue);

  const onChangeSku = (sku: Sku) => {
    dispatch({ type: CATAL_ADD, payload: sku });
  };

  const onDeleteSku = (sku: Sku) => {
    dispatch({ type: CATAL_DEL, payload: sku });
  };

  return (
    <div className={styles.cards + " container"}>
      <h1>Add new product</h1>
      <AdminPanelForm onSubmit={onChangeSku} onDelete={onDeleteSku} />
      {Object.values(catalogue).map((sku: Sku) => (
        <AdminPanelForm
          sku={sku}
          onSubmit={onChangeSku}
          onDelete={onDeleteSku}
          key={sku.art}
        />
      ))}
    </div>
  );
};
