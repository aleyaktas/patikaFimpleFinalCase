import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import AdminTemplate from "../../layouts/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationDetails.module.css";
import { useEffect, useState } from "react";
import { getFormByCode, updateForm } from "../../services/actions";
import { useLoadingContext } from "../../contexts/Loading";
import { showMessage } from "../../helpers/showMessage";

const AdminApplicationDetails = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const { setLoading } = useLoadingContext();

  const [detailsData, setDetailsData] = useState([]);

  const getFormDetails = async () => {
    try {
      setLoading(true);
      const res = await getFormByCode(code);
      if (res.msg) {
        showMessage("Böyle bir başvuru bulunamadı");
        return navigate("/basvuru-sorgula");
      }
      setDetailsData(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (selectedOption, comment) => {
    await updateForm(code, selectedOption, comment);
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
            <Icon
              name="Left"
              width="24"
              height="24"
              className={styles.backIcon}
            />
            Geri
          </button>
        </div>
        <div className={styles.tableContainer}>
          {detailsData && (
            <DetailsCard
              applicationDetails={detailsData}
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
