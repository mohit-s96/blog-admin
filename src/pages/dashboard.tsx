import React, { ReactElement } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

function Dashboard(props: any): ReactElement {
  const location = useLocation();

  return <Layout data={location.state} />;
}

export default Dashboard;
