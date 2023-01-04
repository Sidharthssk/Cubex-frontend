import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const exportExcel = (data, fileName) => {
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(data, {header: ["Form No.", "Name of the Participant", "Contact Details", "Email", "Date of Birth", "City", "State", "Country", "Events to Participate", "Gender"]});
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dataExport = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dataExport, fileName + fileExtension);

}

export default exportExcel;