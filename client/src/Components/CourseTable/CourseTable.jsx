import React, { useState} from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import { StyledButton } from '../StyledButton/StyledButton';

// const rows = [
//     {
//       "title": "Lec 1",
//       "id": "187093200",
//       "link": "https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=24F&subj_area_cd=COM%20SCI&crs_catlg_no=0031%20%20%20%20&class_id=187093200&class_no=%20001%20%20",
//       "courseName": "COMSCI0031",
//       "status": "Open",
//       "seats": "10 of 235 Enrolled",
//       "waitlist": "No Waitlist"
//     },
//     {
//       "title": "Lec 2",
//       "id": "187093210",
//       "link": "https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=24F&subj_area_cd=COM%20SCI&crs_catlg_no=0031%20%20%20%20&class_id=187093210&class_no=%20002%20%20",
//       "courseName": "COMSCI0031",
//       "status": "Open",
//       "seats": "4 of 240 Enrolled",
//       "waitlist": "No Waitlist"
//     },
//     {
//       "title": "Sem 45",
//       "id": "587581245",
//       "link": "https://sa.ucla.edu/ro/Public/SOC/Results/ClassDetail?term_cd=24F&subj_area_cd=COM%20SCI&crs_catlg_no=0298%20%20%20%20&class_id=587581245&class_no=%20045%20%20",
//       "courseName": "COMSCI0298",
//       "status": "Open",
//       "seats": "0 of 10 Enrolled",
//       "waitlist": "No Waitlist"
//     }
//   ]

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
    <StyledButton onClick={() => console.log(selectedKey.values().next().value)} text="Add tracking!"/>
    </>

  );
}
