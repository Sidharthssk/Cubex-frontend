import React from "react";

function Table(props){
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full border text-center">
                            <thead className="border-b">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        Name
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        Min-Age
                                    </th>
                                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                                        Max-Age
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                props.data.map((ageGroup)=>{
                                    return(
                                        <tr className="border-b">
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                {ageGroup.name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                {ageGroup.minAge}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r">
                                                {ageGroup.maxAge}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
