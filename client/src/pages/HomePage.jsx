import React, { useEffect, useState } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import Layout from "../components/layout/Layout";
import axios from "axios";
import Spinner from "../components/layout/Spinner";
import moment from "moment";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Analytics from "../components/layout/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [edit, setEdit] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount $",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEdit(record);
              setShowModel(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const getAllTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8080/api/v1/transaction/getTransaction",
        { userId: user._id, frequency, selectedDate, type }
      );
      setLoading(false);
      setAllTransaction(res.data);
    } catch (error) {
      console.log(error);
      message.error(error);
      setLoading(false);
    }
  };

  // get transaction
  useEffect(() => {
    getAllTransaction();
  }, [frequency, selectedDate, type]);

  // delete Route
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/v1/transaction/deleteTransaction",
        { transactionId: record._id }
      );
      message.success("Record Deleted Succesfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Failed to Delete!!");
    }
  };

  // form handle
  const handleSubmit = async (value) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);

      if (edit) {
        await axios.post(
          "http://localhost:8080/api/v1/transaction/editTransaction",
          {
            payload: {
              ...value,
            },
            transactionId: edit._id,
          }
        );
        setLoading(false);
        message.success("Transaction Updated Sucessfully");
      } else {
        await axios.post(
          "http://localhost:8080/api/v1/transaction/addTransaction",
          { ...value, userId: user._id }
        );
        setLoading(false);
        message.success("Transaction Added Sucessfully");
      }

      setShowModel(false);
      setEdit(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
      message.error("Failed to Add Data Please Try Again!!");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value)}>
            <Select.Option value="all">All Type</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
            />
          )}
        </div>

        <div className="switch-icon">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon " : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon " : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>

        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModel(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData == "table" ? (
          <Table columns={columns} dataSource={allTransaction} />
        ) : (
          <Analytics allTransaction={allTransaction} />
        )}
      </div>
      <Modal
        title={edit ? "Edit Transaction" : "Add Transaction"}
        open={showModel}
        onCancel={() => setShowModel(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={edit}>
          <Form.Item label="Amount" name="amount">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>

          <Form.Item label="refrence" name="refrence">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};
export default HomePage;
