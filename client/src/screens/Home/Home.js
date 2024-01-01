import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import Form from "../../components/Form/Form";
import { createForm } from "../../services/actions";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../contexts/Loading";
import { showMessage } from "../../helpers/showMessage";

const Home = () => {
  const navigate = useNavigate();
  const { setLoading } = useLoadingContext();

  const formSubmit = async (data) => {
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "files") {
          formDataToSend.append(key, data[key]);
        }
      });
      if (data.files) {
        data.files.forEach((file) => {
          formDataToSend.append("files", file);
        });
      }
      const res = await createForm(formDataToSend);
      if (res.msg) {
        return showMessage(res.msg);
      }
      navigate("/basvuru-basarili", { state: { data: res } });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultTemplate>
      <Form formSubmit={(data) => formSubmit(data)} />
    </DefaultTemplate>
  );
};

export default Home;
