import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const PostListItem = ({ data, loading, error, deleteRecod, isLoggedIn }) => {
  const navigate = useNavigate();

  const deleteHandler = (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete this record : ${item.title}`
      )
    ) {
      deleteRecod(item.id);
    }
  };

  const records = data.map((el, iDx) => {
    return (
      <tr key={iDx++}>
        <td>#{++iDx}</td>
        <td>
          <Link to={`post/${el.id}`}>{el.title}</Link>
        </td>
        <td>{el.description}</td>
        <td>{el.useId}</td>
        <td>
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="success"
              onClick={() => navigate(`post/${el.id}/edit`)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteHandler(el)} disabled={!isLoggedIn}>
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });
  return (
    <>
      {loading ? (
        <tr>
          <td colSpan={3}>loading please wait...</td>
        </tr>
      ) : error ? (
        <tr>
          <td colSpan={3}>{error}</td>
        </tr>
      ) : (
        records
      )}
    </>
  );
};

export default PostListItem;
