import { useNavigate } from "react-router-dom";
import Icon from "../../assets/icons/Icon";
import TableBody from "../../components/Table/TableBody/TableBody";
import TableHeader from "../../components/Table/TableHeader/TableHeader";
import AdminTemplate from "../../layout/AdminTemplate/AdminTemplate";
import styles from "./AdminApplicationList.module.css";

const AdminApplicationList = () => {
  const navigate = useNavigate();
  const tableHeader = [
    "Ad-Soyad",
    "Başvuru Nedeni",
    "Başvuru Durumu",
    "Başvuru Tarihi",
    "Başvuru Numarası",
  ];
  const tableData = [
    {
      assignee: "David Grey",
      subject:
        "Fund is not received Fund is not received Fund is not received Fund is not received",
      status: "DONE",
      lastUpdate: "Dec 5, 2017",
      trackingId: "WD-12345",
    },
    {
      assignee: "Stella Johnson",
      subject: "High loading time",
      status: "PROGRESS",
      lastUpdate: "Dec 12, 2017",
      trackingId: "WD-12346",
    },
    {
      assignee: "Marina Michel",
      subject: "Website down for one week",
      status: "ON HOLD",
      lastUpdate: "Dec 16, 2017",
      trackingId: "WD-12347",
    },
    {
      assignee: "John Doe",
      subject: "Losing control on server",
      status: "REJECTED",
      lastUpdate: "Dec 3, 2017",
      trackingId: "WD-12348",
    },
  ];

  return (
    <AdminTemplate>
      <div className={styles.container}>
        <div className={styles.header}>
          <Icon name="ApplicationList" color="#232637" />
          <span>Başvuru Listesi</span>
        </div>
        <div className={styles.tableContainer}>
          <TableHeader tableHeader={tableHeader} />
          <TableBody
            tableData={tableData}
            onClick={() => navigate("/admin/basvuru-listesi/1")}
          />
        </div>
      </div>
    </AdminTemplate>
  );
};

export default AdminApplicationList;
