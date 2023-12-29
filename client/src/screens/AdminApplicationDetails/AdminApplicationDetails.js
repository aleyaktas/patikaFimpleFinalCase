import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import AdminTemplate from "../../layouts/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationDetails.module.css";
import { useEffect, useState } from "react";
import {
  createCommentToForm,
  getFormByCode,
  updateFormStatus,
} from "../../services/actions";
import { useLoadingContext } from "../../contexts/Loading";

const AdminApplicationDetails = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { setLoading } = useLoadingContext();

  const [detailData, setDetailData] = useState([]);

  const getFormDetails = async () => {
    try {
      setLoading(true);
      const res = await getFormByCode(code);
      setDetailData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (selectedOption, comment) => {
    if (selectedOption !== detailData.status)
      await updateFormStatus(code, selectedOption);
    if (comment) {
      await createCommentToForm(detailData._id, comment);
    }
    getFormDetails();
  };

  useEffect(() => {
    getFormDetails();
  }, []);

  return (
    <AdminTemplate>
      <div className={styles.container}>
        <div className={styles.backButtonContainer}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/admin/basvuru-listesi")}
          >
            <Icon name="Left" width="16px" color="black" />
            Geri
          </button>
        </div>
        <div className={styles.tableContainer}>
          {detailData && (
            <DetailsCard
              applicationDetail={detailData}
              handleSave={(selectedOption, comment) =>
                handleSave(selectedOption, comment)
              }
            />
          )}
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminApplicationDetails;
