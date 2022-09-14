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
      Market: `Growth Markets ${i}`,
      MarketUnit: `ASG`,
      Country: `IE - Ireland`,
      CompanyCode: `130${i}`,
      MasterClientLavel1Name: `007000113${i}`,
      Account: `001006370${i}`,
      CustomerName: `The Bank of Scotia`,
      WBSElement: `BAAJM001`,
      DocumentNo: `440011327${i}`,
      BillingDocumen: `11008441${i}`,
      Reference: `12001659${i}`,
      BillingDate: `1/1/2022`,
      NetFueDate: `1/1/2023`,
      DocumentType: `RV`,
      TotalBalanceUSD: `10,000.00`,
      Comment: `Year-end reminder vas to sent to: Charter CFM. Request for payment updates.${i}`,
      Collector: `Reden Manlagit`,
      WBSDescription: `AU ${i}`,
      AmountInDocCurr: `${i}`,
      LastContactDate: `1/1/2022`,
      InvoiceStatus: `On Watchlist`,
      ArrearsAfterNetDueDate: `${i}`,
      TotalOverdueUSD: `100${i}`,
      CurrentBalanceUSD: `0.00`,
      TotalOVerdueLcurr: `0.00`,
      CurrentBalanceLcurr: `0.00`,
      Industry: `Financial Services`,
      BillToPartyCustomerNo: `001000634${i}`,
      WBSBillingAccLeader: `1000696${i}`,
      WBSBillingAccLeaderName: `Craig Hepelt`,
      Assignment: `-`,
      ClientGroupCategorization: `Canada FS Primary`,
      CreditTerms: `1${i}`,
      DocumentCurrency: `USD`,
      LocalCurrency: `USD`,
      TotalBalanceLcurr: `10.000,00`,
      FormHeaderText: `Prot AdE 211118978/000${i}`,
      Days15Lcurr: `0.00`,
      Days30Lcurr: `0.00`,
      Days45Lcurr: `0.00`,
      Days60Lcurr: `0.00`,
      Days90Lcurr: `0.00`,
      Days120Lcurr: `0.00`,
      Days180Lcurr: `0.00`,
      Days180PlusLcurr: `0.00`,
      Days15USD: `0.00`,
      Days30USD: `0.00`,
      Days45USD: `0.00`,
      Days60USD: `0.00`,
      Days90USD: `0.00`,
      Days120USD: `0.00`,
      Days180USD: `0.00`,
      Days180PlusUSD: `0.00`,
      Location: `North America Tier ${i}`,
      ActionsInLastMonth: `${i}`,
      ActionsInLast3Months: `${i + i}`,
      InOutScope: `IN`,
      ClearingDate: `-`,
      DisputeReason: `-`,
      DisputeCategory: `-`,
      SDDocumentCategory: `P`,
      PONumber: `1301908${i}`,
      RAKey: `ZASER`,
      AUResale: `X`,
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
