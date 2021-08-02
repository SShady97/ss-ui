import React from "react";

import MUIDataTable from "mui-datatables";

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import AddButton from './AddButton';
import RowModal from './RowModal/RowModal';

const tableTheme = createTheme({
    overrides: {
        MUIDataTable: {
            root: {
                backgroundColor: "#FF000"
            },
            paper: {
                boxShadow: "none"
            }
        },
        MUIDataTableBodyRow: {
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f2f2f2',
                },
            }
        },
        MUIDataTableToolbar: {
            titleText: {
                fontWeight: "bold",
                fontSize: "150%"
            }
        },
        MUIDataTableHeadCell: {
            data: {
                fontWeight: "bold"
            }
        }
    }
});

// const getData = async (url, page) => {
//     this.setState({ isLoading: true });
//     const res = await this.xhrRequest(url, page);
//     this.setState({ data: res.data, isLoading: false, count: res.total });
// };

const data1 = [
    ["Joe James@email", "1", "Joe James", "asdASd2312as"],
    ["John Walsh@email", "2", "John Wals", "CTasD12SS"],
    ["Bob Herm@email", "3", "Bob Herm", "FLaSAs2@23"],
    ["James Houston@email", "4", "James Houston", "TXdsd23WSAd32"],
];

const data2 = [
    ["1", "Joe James", "asdASd2312as"],
    ["2", "John Wals", "CTasD12SS"],
    ["3", "Bob Herm", "FLaSAs2@23"],
    ["4", "James Houston", "TXdsd23WSAd32"],
];
const DBTable = ({ value }) => {

    const [modal, setModal] = React.useState(false);

    const [rowValues, setRowValues] = React.useState([]);

    // let rowValues = [];

    const toggle = () => setModal(!modal);

    let component = null;
    let columns = null;
    let data = null;

    switch (value) {
        case 'Login Users':
            component = 1;
            columns = ["Email", "ID", "Name", "Password"];
            data = data1;
            break;
        case 'Execution Users':
            component = 2;
            columns = ["ID", "Name", "Password"];
            data = data2;
            break;
        case 'Servers':
            component = 3;
            columns = 'c';
            break;
        case 'Scripts':
            component = 4;
            columns = 'd';
            break;
        case 'Parameters':
            component = 5;
            columns = 'e';
            break;
        case 'Processes':
            component = 6;
            columns = 'f';
            data = component;
            break;
        default:
    }

    const options = {
        download: 'false',
        print: 'false',
        selectableRows: 'none',
        viewColumns: 'false',
        onRowClick: rowData => {
            console.log(rowData)
            setRowValues(rowData);
            setModal(true);
        },
        customToolbar: () => {
            return (
                <AddButton value={value} columns={columns} />
            );
        }
    };



    return (
        <ThemeProvider theme={tableTheme}>
            < MUIDataTable
                title={value}
                data={data}
                columns={columns}
                options={options}
            />
            <RowModal rowValues={rowValues} toogle={toggle} open={modal} columns={columns} />
        </ThemeProvider>

    );
};

export default DBTable;
