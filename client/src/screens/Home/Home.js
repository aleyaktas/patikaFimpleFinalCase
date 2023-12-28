import DefaultTemplate from "../../layout/DefaultTemplate/DefaultTemplate";
import Form from "../../components/Form/Form";
import { createForm } from "../../services/actions";

const Home = () => {
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
      await createForm(formDataToSend);
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
