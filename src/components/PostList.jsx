import { memo } from "react";
import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";
import { useSelector } from "react-redux";

const PostList = ({ data, loading, error, deleteRecod }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th style={{ width: "30%" }}>Title</th>
          <th style={{ width: "60%" }}>Describtion</th>
        </tr>
      </thead>
      <tbody>
        <PostListItem
          data={data}
          loading={loading}
          error={error}
          deleteRecod={deleteRecod}
          isLoggedIn={isLoggedIn}
        />
      </tbody>
    </Table>
  );
};

export default memo(PostList);
