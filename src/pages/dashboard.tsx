import React, { ReactElement } from "react";
import Blog from "../components/blog/blog";
import Layout from "../components/Layout";

interface Props {
  auth?: boolean;
}

function Dashboard({ auth }: Props): ReactElement {
  return (
    <Layout>
      <Blog />
    </Layout>
  );
}

export default Dashboard;
