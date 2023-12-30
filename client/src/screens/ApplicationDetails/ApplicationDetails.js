import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailsCard from "../../components/DetailsCard/DetailsCard";
import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import styles from "./ApplicationDetails.module.css";
import { getFormByCode } from "../../services/actions";
import { showMessage } from "../../helpers/showMessage";
import { useLoadingContext } from "../../contexts/Loading";

const ApplicationDetails = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { setLoading } = useLoadingContext();

  const [detailsData, setDetailsData] = useState();

  const getDetailData = async () => {
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

  useEffect(() => {
    getDetailData();
  }, []);

  return (
    <DefaultTemplate>
      {detailsData && (
        <div className={styles.container}>
          <DetailsCard applicationDetails={detailsData} />
        </div>
      )}
    </DefaultTemplate>
  );
};

export default ApplicationDetails;
