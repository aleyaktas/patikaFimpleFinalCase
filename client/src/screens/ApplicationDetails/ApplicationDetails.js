import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import styles from "./ApplicationDetails.module.css";
import { getFormByCode } from "../../services/actions";

const ApplicationDetails = () => {
  const { code } = useParams();

  const [detailData, setDetailData] = useState();

  const getDetailData = async () => {
    try {
      const res = await getFormByCode(code);
      setDetailData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <DefaultTemplate>
      <div className={styles.container}>
        {detailData && <DetailsCard applicationDetail={detailData} />}
      </div>
    </DefaultTemplate>
  );
};

export default ApplicationDetails;
