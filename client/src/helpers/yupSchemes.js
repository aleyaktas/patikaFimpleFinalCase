import * as Yup from "yup";

export const createFormSchema = Yup.object({
  name: Yup.string().required("Ad zorunlu"),
  surname: Yup.string().required("Soyad zorunlu"),
  age: Yup.number()
    .required("Yaş zorunlu")
    .typeError("Yaş zorunlu")
    .positive("Yaş pozitif bir sayı olmalıdır")
    .integer("Yaş tam sayı olmalıdır"),
  identity: Yup.string()
    .required("TC zorunlu")
    .matches(/^[1-9]{1}[0-9]{9}[02468]{1}$/, "Geçersiz TC Kimlik Numarası")
    .length(11, "TC Kimlik Numarası 11 haneli olmalıdır"),
  reason: Yup.string().required("Başvuru Nedeni zorunlu"),
  address: Yup.string()
    .required("Adres Bilgisi zorunlu")
    .max(200, "Adres bilgisi 200 karakterden uzun olamaz"),
  files: Yup.mixed()
    .test(
      "fileCount",
      "En fazla 3 dosya seçebilirsiniz",
      (files) => files?.length <= 3
    )
    .test("totalSize", "Toplam dosya boyutu 5 MB'ı aşamaz", (files) => {
      if (!files) return true;
      const totalSize = files.reduce((acc, file) => acc + file.size, 0);
      const maxSize = 5 * 1024 * 1024;
      return totalSize <= maxSize;
    })
    .test(
      "fileType",
      "Sadece jpeg, jpg, png veya pdf ekleyebilirsiniz",
      (files) => {
        if (!files) return true;
        const allowedFileTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/pdf",
        ];
        return files.every((file) => allowedFileTypes.includes(file.type));
      }
    ),
}).required();

export const adminLoginSchema = Yup.object().shape({
  username: Yup.string().required("Kullanıcı adı zorunlu"),
  password: Yup.string().required("Şifre zorunlu"),
});

export const applicationStatusSchema = Yup.object().shape({
  code: Yup.string()
    .required("Kod zorunlu")
    .test(
      "lenght",
      "Başvuru kodu 8 karakter olmalı",
      (code) => code.length === 8
    ),
});
