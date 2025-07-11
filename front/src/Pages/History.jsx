import React, { useState, useEffect } from "react";
import { Layout, Table, Typography, Empty } from "antd";
import Sidebar from "../components/Sidebar";
import "../page_style/historypage.css"; // You can remove this if fully migrated

const { Content } = Layout;
const { Title } = Typography;

const History = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const storedPurchases = JSON.parse(localStorage.getItem("purchases")) || [];
    setPurchases(storedPurchases);
  }, []);

  const columns = [
    {
      title: "Item Number",
      dataIndex: "itemNumber",
      key: "itemNumber",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "Purchase ID",
      dataIndex: "purchaseID",
      key: "purchaseID",
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
      key: "unitPrice",
    },
    {
      title: "Total Cost",
      dataIndex: "totalCost",
      key: "totalCost",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout style={{ marginLeft: 250 }}>
        <Content style={{ margin: "90px 24px 24px 24px", padding: 24, background: "#fff", borderRadius: 8 }}>
          <Title level={3} style={{ background: "#007bff", color: "white", padding: "10px", borderRadius: 6, textAlign: "center" }}>
            Purchase History
          </Title>

          {purchases.length === 0 ? (
            <Empty description="No purchases recorded." style={{ marginTop: 30 }} />
          ) : (
            <Table
              columns={columns}
              dataSource={purchases}
              rowKey={(record, index) => index}
              bordered
              pagination={{ pageSize: 10 }}
              scroll={{ x: "max-content" }}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default History;
