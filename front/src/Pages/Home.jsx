import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../page_style/home.css";
import Loading from "../components/Loading.jsx"; // Import the component

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Typography,
  Card,
  Row,
  Col,
  Spin,
  Table,
  Statistic,
  Divider,
  Skeleton,
} from "antd";
import {
  RiseOutlined,
  ShoppingOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const Home = () => {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [salesRes, customerRes, itemRes] = await Promise.all([
          axios.get("http://192.168.3.113:3000/api/sales"),
          axios.get("http://192.168.3.113:3000/api/customer"),
          axios.get("http://192.168.3.113:3000/api/items"),
        ]);

        setSales(salesRes.data.invoices || []);
        setCustomers(customerRes.data || []);
        setItems(itemRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const today = new Date();
  const lastMonth = new Date(today);
  lastMonth.setDate(today.getDate() - 30);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Create formatted sales data
  const salesData = sales.map((sale) => ({
    date: sale.invoice_date,
    amount: parseFloat(sale.paid_amount),
  }));

  // Use salesData for calculations
  const getTotalSales = (filterFn) =>
    salesData.filter(filterFn).reduce((sum, sale) => sum + sale.amount, 0);

  const totalTodaySales = getTotalSales(
    (s) => formatDate(s.date) === formatDate(today)
  );

  const totalYesterdaySales = getTotalSales((s) => {
    const y = new Date(today);
    y.setDate(today.getDate() - 1);
    return formatDate(s.date) === formatDate(y);
  });

  const totalLastMonthSales = getTotalSales(
    (s) => new Date(s.date) >= lastMonth
  );

  const salesChartData = [
    { date: "Today", amount: totalTodaySales },
    { date: "Yesterday", amount: totalYesterdaySales },
    { date: "Last 30 Days", amount: totalLastMonthSales },
  ];

  const itemStockCounts = items
    .filter((item) => item.itemName)
    .map((item) => ({
      name: item.itemName,
      count: item.stock || 0,
    }));

  const sortedItems = [...items]
    .filter((item) => item.itemName)
    .sort((a, b) => (a.stock || 0) - (b.stock || 0));

  const columns = [
    { title: "Item", dataIndex: "itemName", key: "itemName" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
  ];

  return (
    <div className="home-container">
      <Sidebar />
      <div className="home-content">
        <Title level={2} style={{ textAlign: "center" }}>
          Dashboard Overview
        </Title>



  {loading ? (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
    <Spin size="large" tip="Loading Dashboard..." />
  </div>
) : (
          <>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic
                    title="Today's Sales"
                    value={totalTodaySales}
                    prefix={<RiseOutlined />}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    suffix="₹"
                  />
                  {console.log(totalTodaySales)
                  }
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic
                    title="Total Customers"
                    value={customers.length}
                    prefix={<TeamOutlined />}
                  />
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card>
                  <Statistic
                    title="Items Available"
                    value={items.length}
                    prefix={<ShoppingOutlined />}
                  />
                </Card>
              </Col>
            </Row>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} md={12} lg={8}>
                <Card title="Sales Overview">
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={salesChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#1890ff"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              <Col xs={24} md={12} lg={8}>
                <Card title="Customer Bar Chart">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={[{ name: "Customers", total: customers.length }]}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar
                        dataKey="total"
                        fill="#9254de"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>
              </Col>

              <Col xs={24} md={24} lg={8}>
                <Card title="Item Stock Pie">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={itemStockCounts}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {itemStockCounts.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>

            <Card
              title="Items Sorted by Stock"
              style={{ marginTop: 24 }}
              bordered
            >
              <Table
                dataSource={sortedItems}
                columns={columns}
                rowKey="itemName"
                pagination={{ pageSize: 6 }}
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
