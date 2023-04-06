import React, { useEffect, useState } from "react";
import BRDisplayData from "./BRDisplayData";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const BRImport = (props) => {
  function createData(
    rowcount,
    productname,
    qty,
    importedqty,
    unit,
    gritemid,
    productid
  ) {
    return {
      rowcount,
      productname,
      qty,
      importedqty,
      unit,
      gritemid,
      productid,
    };
  }

  const domain = "https://www.forucenter.com/dev";
  //const domain = "http://localhost:56459/";

  const OnClickImportHandler = () => {
    const r = window.confirm("ยืนยันการทำงานหรือไม่?");
    if (r) {
      if (statusBR === 3) {
        const repeat = window.confirm(
          "ระบบยังอยู่ในระหว่างการนำเข้า กรุณารอซํกครู่ หากต้องการ ยืนยันการทำนำเข้าซ้ำ กรุณากดตกลง"
        );
        if (!repeat) {
          return;
        }
      }
      console.log(rowsData);
      console.log(rowsCount);
      setStatus3();
    }
  };
  function setStatus3() {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },

      body: JSON.stringify(apiData),
    };

    fetch(domain + "/api/BRAPI/MarkImportStatus", requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setStatusBR(-2);
          return;
        } else {
          setStatusBR(-3);

          console.log("ok for import");

          for (let i = 0; i < rowsCount; i++) {
            
            /* console.log(apiData);
            console.log(rowsData[i]); */
            CallAPIByProductID(
              rowsData[i].productid,
              apiData.branch_id,
              apiData.brid,
              rowsData[i].gritemid
            );
            setRowImporting(i + 1);
            console.log(i + 1);
          }
          console.log('done');
          //console.log(rowsData);

          SetFinishBRImported();
          console.log('done2');
        }
      })
      .catch((error) => console.log("error", error));
  }

  const CallAPIByProductID = async (
    product_id,
    branch_id,
    BRCode,
    BRItemId
  ) => {
    console.log(product_id);
    var requestOptionss = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },

      body: JSON.stringify({
        product_id: product_id,
        branch_id: branch_id,
        BRCode: BRCode,
        BRItemId: BRItemId,
      }),
    };
    await fetch(domain + "/api/BRAPI/ImportBRByIdAndProductId", requestOptionss)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log("error", error));
  };

  const SetFinishBRImported = async () => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },

      body: JSON.stringify({
        brid: apiData.brid,
      }),
    };
    await fetch(domain + "/api/BRAPI/SetFinishBR", requestOptions)
      .then((response) => {
        console.log(response);
        
        setStatusBR(2);
        readDataAPI();
      })
      .catch((error) => console.log("error", error));

    
  };

  const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4.0)];

  const [rowsImporting, setRowImporting] = useState(0);
  const [rowsData, setRowData] = useState(rows);
  const [rowsCount, setRowCount] = useState(0);
  const [statusBR, setStatusBR] = useState(-1);
  const [apiData, setApiData] = useState({
    brid: props.BRCode,
    branch_id: props.BranchId,
  });

  useEffect(() => {
    readDataAPI();
  }, []);
  function readDataAPI() {
    /* setIsLoading(true); */
    /* const lineid = props.lineid; */
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify(apiData), // body data type must match "Content-Type" header
    };

    fetch(domain + "/api/BRAPI/GetBRStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setRowCount(result.count);
        let rows = [];
        for (let i = 0; i < result.count; i++) {
          rows.push(
            createData(
              i + 1,
              result.items[i].ProductName,
              result.items[i].ProductQty,
              result.items[i].ProductImportedQty == ""
                ? "0"
                : result.items[i].ProductImportedQty,
              result.items[i].ProductUnit,
              result.items[i].BRItemId,
              result.items[i].ProductId
            )
          );
        }
        setRowData(rows);
        setStatusBR(parseInt(result.status));
        //setApiCallItem({ ...result });

        console.log(result);
      })
      .catch((error) => console.log("error", error));
    //console.log("finish call apiload");
  }

  const displayButton = () => {
    if (statusBR === -3) {
      return <p>กำลังทำงาน</p>;
    }
    if (statusBR === -2) {
      return <p>มีบางอย่างผิดปกติกรุณาลองใหม่</p>;
    }
    if (statusBR === -1) {
      return (
        <Button variant="contained" color="success" disabled>
          Loading...
        </Button>
      );
    }
    if (statusBR === 0) {
      return (
        <Button variant="contained" color="success" disabled>
          นำเข้า
        </Button>
      );
    }
    if (statusBR === 1) {
      return (
        <Button
          variant="contained"
          color="success"
          onClick={OnClickImportHandler}
        >
          นำเข้า
        </Button>
      );
    }
    if (statusBR === 2) {
      return (
        <Button variant="contained" color="success" disabled>
          นำเข้าไปแล้ว
        </Button>
      );
    }
    if (statusBR === 3) {
      return (
        <Button
          variant="contained"
          color="success"
          onClick={OnClickImportHandler}
        >
          ทำต่อจากที่ค้างไว้
        </Button>
      );
    }
  };

  const displayData = () => {
    if (statusBR === -1) {
      return (
        <div>
          <Stack spacing={1} alignItems="center">
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={500} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={400} height={60} />
            <Skeleton variant="rounded" width={400} height={60} />
          </Stack>
        </div>
      );
    }
    if (statusBR === 0) {
      return <p>ยังไม่ได้ส่งของ</p>;
    }
    if (statusBR === 1) {
      return <BRDisplayData rows={rowsData}></BRDisplayData>;
    }
    if (statusBR === 2) {
      return (
        <div>
          <p>รับเข้าไปแล้ว</p>
          <br />
          <BRDisplayData rows={rowsData}></BRDisplayData>
        </div>
      );
    }
    if (statusBR === 3) {
      return (
        <div>
          {" "}
          <p>อยู่ระหว่างการนำเข้า สามารถกด นำเข้าเพื่อทำต่อได้</p>
          <br />
          <BRDisplayData rows={rowsData}></BRDisplayData>
        </div>
      );
    }
  };

  return (
    <>
      {" "}
      <div>
        <h2>หมายเลข BR = {props.BRCode} กรุณาตรวจสอบความถูกต้องก่อนกด นำเข้า</h2>
      </div>
      <div>{displayButton()}</div>
      <br />
      <div>
        {rowsImporting > 0 ? (
          <p>
            Importing {rowsImporting} / {rowsCount}
          </p>
        ) : (
          ""
        )}
        {rowsImporting === rowsCount ? (
          <p>นำเข้าสำเร็จ กรุณาตรวจสอบจำนวนสินค้า</p>
        ) : (
          ""
        )}
      </div>
      <br />
      <div>{displayData()}</div>
    </>
  );
};

export default BRImport;
