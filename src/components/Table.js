import React from "react";

function Table(props){
    return (
        <div>
            <table className="table table-bordered" style={{maxWidth: "60%"}}>
                <thead>
                    <tr className="text-center">
                        <th scope="col">Category</th>
                        <th scope="col">Minimum Age</th>
                        <th scope="col">Maximum Age</th>
                    </tr>
                </thead>
                <tbody>
                {
                    props.data?.map((ageGroup, index) => {
                        return (
                            <tr key={index} className="text-center">
                                <td>{ageGroup.name}</td>
                                <td>{ageGroup.minAge}</td>
                                <td>{ageGroup.maxAge}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default Table
