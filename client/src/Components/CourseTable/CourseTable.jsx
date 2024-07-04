import React, {useState} from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { StyledButton } from '../StyledButton/StyledButton';
import axios from 'axios';

const columns = [
  {
    key: "courseName",
    label: "Course",
  },
  {
    key: "title",
    label: "Offering",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "waitlist",
    label: "Waitlist",
  },  
];

export const CourseTable = ({ rows }) => {


  const [selectedKey, setSelectedKey] = React.useState(new Set([]));

  const addTracking = async () => {
    let addTrackingUrl = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/tracking`;

    axios({
        url: addTrackingUrl,
        method: 'POST',
        data: {
            "name": "Oliver Melgrove",
            "email": "oliver@melgrove.com",
            "url": selectedKey.values().next().value
        }
    }).then((res) => {
        console.log(res.data.statusCode);
        console.log('DONE');
    })

  }

  return (
    <>
    <Table selectionMode="single" 
    defaultSelectedKeys={[""]} 
    selectedKeys={selectedKey}
    onSelectionChange={setSelectedKey}
    removeWrapper
    isCompact
    classNames={{
        base: "bg-white w-[75vw] mx-auto rounded-md",
    }}
    >
      <TableHeader columns={columns} >
        {(column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.link}>
            {(columnKey) => (
              <TableCell className="text-red-600">{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    <StyledButton onClick={() => addTracking()} text="Add tracking!"/>
    </>

  );
}
