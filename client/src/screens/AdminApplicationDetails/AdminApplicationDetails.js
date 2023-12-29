import { useNavigate, useParams } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import AdminTemplate from "../../layout/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationDetails.module.css";
import { useEffect, useState } from "react";
import { getFormByCode } from "../../services/actions";
import { useLoadingContext } from "../../context/Loading";

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
          {detailData && <DetailsCard applicationDetail={detailData} />}
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminApplicationDetails;
