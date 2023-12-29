import DefaultTemplate from "../../layouts/DefaultTemplate/DefaultTemplate";
import Form from "../../components/Form/Form";
import { createForm } from "../../services/actions";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const formSubmit = async (data) => {
    try {
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
      navigate("/basvuru-basarili", { state: { data: res } });
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <DefaultTemplate>
      <Form formSubmit={(data) => formSubmit(data)} />
    </DefaultTemplate>
  );
};

export default Home;
