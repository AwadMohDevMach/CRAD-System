import usePostDetails from "../hooks/use-post-details";
import { Form, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { editPost, cleanRecord } from "../state/PostSLice";
import { useNavigate } from "react-router-dom";
import withGard from "../util/withGard";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema";

const Edit = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { recored, loading, error } = usePostDetails();

  useEffect(() => {
    dispatch(cleanRecord());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: recored ? recored.title : "",
      description: recored ? recored.description : "",
    },
    enableReinitialize: true,
    validationSchema: postSchema,
    onSubmit: (values) => {
      dispatch(
        editPost({
          id: recored.id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => navigate("/"));
    },
  });
  return (
    <>
      {loading ? (
        "loading.."
      ) : error ? (
        error
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tittle</Form.Label>
            <Form.Control
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              name="title"
              isInvalid={!!formik.errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Describtion</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={formik.handleChange}
              value={formik.values.description}
              name="description"
              isInvalid={!!formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default withGard(Edit);
