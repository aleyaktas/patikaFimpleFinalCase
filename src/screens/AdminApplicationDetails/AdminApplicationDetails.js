import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import AdminTemplate from "../../layout/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationDetails.module.css";

const AdminApplicationDetails = () => {
  const navigate = useNavigate();

  const detailData = {
    assignee: "John Doe",
    age: 27,
    identifier: 123456,
    subject:
      "Laborum occaecat laborum dolor tempor voluptate anim nostrud quis.",
    status: 2,
    date: "Dec 3, 2017",
    trackingId: "12348",
    address: "Örnek Mahalle, Örnek Sokak No: 123, Örnek Şehir",
    files: ["https://placekitten.com/200/200", "https://placebear.com/200/200"],
  };

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
          <DetailsCard applicationDetail={detailData} />
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminApplicationDetails;
