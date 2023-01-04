import React, {useEffect} from "react";
import FileUploader from "../styles/Fileuploader.css";
import XLSX from "sheetjs-style";

const Fileuploader = () => {

    useEffect(() => {
        const dropArea = document.querySelector(".drag-area");
        const dragText = dropArea?.querySelector("header");
        const button = dropArea?.querySelector("button");
        const input = dropArea?.querySelector("input");
        let file;

        button.onclick = () => {
            input.click();
        }

        input.addEventListener("change", function (e){
            e.preventDefault();
            file = this.files[0];
            dropArea.classList.add("active");
            showFile(file);
        })

        dropArea.addEventListener("dragover", (e)=>{
            e.preventDefault();
            dropArea.classList.add("active");
            dragText.textContent = "Release to upload file";
        });

        dropArea.addEventListener("dragleave", (e)=>{
            dropArea.classList.remove("active");
            dragText.textContent = "Drag and drop to upload file";
        });

        dropArea.addEventListener("drop", (e) => {
            e.preventDefault();
            file = e.dataTransfer.files[0];
            showFile(file);
        })
    }, []);

    // read an excel file
    const showFile = (file) => {
        let fileType = file.type;
        let validExtensions = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
        if(validExtensions.includes(fileType)){
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                let fileData = e.target.result;
                let workbook = XLSX.read(fileData, {type: "binary"});
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    let jsonArray = JSON.stringify(rowObject);
                    console.log(jsonArray);
                })
            }
            fileReader.readAsBinaryString(file);
        } else {
            alert("This is not an Excel file");
            // dropArea.classList.remove("active");
            // dragText.textContent = "Drag and drop to upload file";
        }

    }


    return (
        <div className="position-absolute top-50 start-50 translate-middle">
            <div className="drag-area">
                <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                <header>Drag & Drop to Upload File</header>
                <span>or</span>
                <div>
                    <button>Browse File</button>
                    <input type="file" hidden/>
                </div>
            </div>
        </div>
    );
}

export default Fileuploader;