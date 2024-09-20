import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { insertPosts } from "../state/PostSLice";
import Loading from "../components/Loading";
import { useFormik } from "formik";
import { postSchema } from "../util/validationSchema";
import withGard from "../util/withGard";

// outisde component

const Add = (props) => {
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      const id = Math.floor(Math.random() * "100").toString();
      dispatch(
        insertPosts({
          id,
          title: values.title,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        });
    },
  });
  return (
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
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Loading>
    </Form>
  );
};

export default withGard(Add);
