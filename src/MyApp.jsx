import React, { useState, useRef, useEffect } from "react";
import {
  Avatar,
  ShellBar,
  Card,
  CardHeader,
  Text,
  Icon,
  Button,
  Table,
  TableColumn,
  Label,
  TableCell,
  TableRow,
  FileUploader,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import { DonutChart, LineChart } from "@ui5/webcomponents-react-charts";
import "@ui5/webcomponents-icons/dist/line-chart.js";
import "@ui5/webcomponents-icons/dist/donut-chart.js";
import "./index.css";
import axios from "axios";
import exceljs from 'exceljs'

export function MyApp() {
  const dataset = [
    {
      month: "January",
      data: 65,
    },
    {
      month: "February",
      data: 59,
    },
    {
      month: "March",
      data: 80,
    },
    {
      month: "April",
      data: 81,
    },
    {
      month: "May",
      data: 56,
    },
    {
      month: "June",
      data: 55,
    },
    {
      month: "July",
      data: 40,
    },
  ];

  const dataJSON = [];
  for (let i = 0; i <= 500; i++) {
    dataJSON.push({
      test: `1${i}`
    });
  }

  const [toggleCharts, setToggleCharts] = useState("lineChart");
  const [loading, setLoading] = useState(false);
  const [dataTable, setData] = useState([]);
  const [dataExcel, setDataExcel] = useState(dataJSON);

  const onDownloadFile = () => {
    setDataExcel(dataJSON);
    console.log(dataExcel);

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("TestDiarSheet");
  };

  const handleHeaderClick = () => {
    if (toggleCharts === "lineChart") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("barChart");
      }, 2000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("lineChart");
      }, 2000);
    }
  };
  const contentTitle =
    toggleCharts === "lineChart" ? "Line Chart" : "Donut Chart";
  const switchToChart =
    toggleCharts === "lineChart" ? "Donut Chart" : "Line Chart";

  const addDataToTable = async () => {
    const fetchData = await axios
      .get(
        "https://services.odata.org/V4/Northwind/Northwind.svc/Products?$top=8"
      )
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data.value);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    return fetchData;
  };

  return (
    <div>
      <ShellBar
        logo={<img src="sap-logo-svg.svg" width="50px" height="50px" />}
        profile={
          <Avatar>
            <img src="avatar.png" />
          </Avatar>
        }
        primaryTitle="React Demo"
      />
      <div className="alignBlock">
        <Card
          className="cardClass"
          header={
            <CardHeader
              titleText="Stock Prices"
              subtitleText={`Click here to switch to ${switchToChart}`}
              tooltip="Toggle chart"
              interactive
              onClick={handleHeaderClick}
              avatar={
                <Icon
                  name={
                    toggleCharts === "lineChart" ? "line-chart" : "donut-chart"
                  }
                />
              }
            />
          }
          style={{ width: "500px", padding: "20px 0 0 20px" }}
        >
          <Text style={spacing.sapUiContentPadding}>{contentTitle}</Text>
          {toggleCharts === "lineChart" ? (
            <LineChart
              dimensions={[{ accessor: "UnitsInStock" }]}
              measures={[{ accessor: "UnitsInStock", label: "Product Name" }]}
              dataset={dataTable}
              loading={loading}
              style={{ height: "450px" }}
            />
          ) : (
            <DonutChart
              dimension={{
                accessor: "month",
              }}
              measure={{
                accessor: "data",
              }}
              chartConfig={{
                paddingAngle: 5,
              }}
              dataset={dataset}
              loading={loading}
              style={{ height: "450px" }}
            />
          )}
        </Card>
        <Card className="cardClass" style={{ width: "900px" }}>
          <Table
            no-data-text="No Data"
            show-no-data
            columns={
              <>
                <TableColumn style={{ width: "10rem" }}>
                  <Label>Product ID</Label>
                </TableColumn>
                <TableColumn minWidth={200} popinText="Supplier">
                  <Label>Product Name</Label>
                </TableColumn>
                <TableColumn demandPopin minWidth={200} popinText="Dimensions">
                  <Label>Units In Stock</Label>
                </TableColumn>
                <TableColumn demandPopin minWidth={200} popinText="Weight">
                  <Label>Unit Price</Label>
                </TableColumn>
                <TableColumn demandPopin minWidth={200} popinText="Weight">
                  <Label>QuantityPerUnit</Label>
                </TableColumn>
              </>
            }
            onLoadMore={function noRefCheck() {}}
            onPopinChange={function noRefCheck() {}}
            onRowClick={function noRefCheck() {}}
            onSelectionChange={function noRefCheck() {}}
            className="tableClass"
          >
            {dataTable.map((item, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Label>{item.ProductID}</Label>
                </TableCell>
                <TableCell>
                  <Label>{item.ProductName}</Label>
                </TableCell>
                <TableCell>
                  <Label>{item.UnitsInStock}</Label>
                </TableCell>
                <TableCell>
                  <Label>{item.UnitPrice}</Label>
                </TableCell>
                <TableCell>
                  <Label>{item.QuantityPerUnit}</Label>
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <div className="toolbarClass">
            <Button
              className="buttonClass"
              id="button1"
              design="Emphasized"
              onClick={addDataToTable}
            >
              OK
            </Button>

            <Button
              className="buttonClass"
              id="button2"
              onClick={onDownloadFile}
            >
              Download file
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
