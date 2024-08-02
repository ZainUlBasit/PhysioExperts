export const ProductOrderColumns = [
  {
    id: "view",
    label: "View Detail",
    minWidth: 150,
    align: "center",
  },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "_id",
    label: "Order Id",
    minWidth: 150,
  },
  {
    id: "mobile_no",
    label: "Mobile No",
    minWidth: 150,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 150,
  },
  {
    id: "address",
    label: "Address",
    minWidth: 150,
  },
  {
    id: "total_amount",
    label: "Total Amount",
    minWidth: 150,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 150,
    format: (value) => {
      switch (value) {
        case 1:
          return "Placed";
        case 2:
          return "Confirmation";
        case 3:
          return "Delivered";
        case 4:
          return "Canceled";
        default:
          return "Unknown";
      }
    },
  },
];
