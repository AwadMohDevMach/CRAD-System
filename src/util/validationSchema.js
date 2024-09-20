import * as Yup from "yup";

export const postSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Title Is Required"),
    description: Yup.string().required("Desciprtion Is Required"),
  });
  