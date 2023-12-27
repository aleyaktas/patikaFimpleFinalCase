import DetailsCard from "../../components/DetailsCard/DetailsCard";
import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import styles from "./ApplicationDetails.module.css";

const ApplicationDetails = () => {
  const detailData = {
    assignee: "John Doe",
    age: 27,
    identifier: 123456,
    subject:
      "Laborum occaecat laborum dolor tempor voluptate anim nostrud quis.",
    status: 0,
    date: "Dec 3, 2017",
    trackingId: "12348",
    address: "Örnek Mahalle, Örnek Sokak No: 123, Örnek Şehir",
    files: ["https://placekitten.com/200/200", "https://placebear.com/200/200"],
  };
  return (
    <DefaultTemplate>
      <div className={styles.container}>
        <DetailsCard applicationDetail={detailData} />
      </div>
    </DefaultTemplate>
  );
};

export default ApplicationDetails;
