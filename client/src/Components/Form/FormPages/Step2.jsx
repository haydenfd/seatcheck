// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableColumn,
//   TableRow,
//   TableCell,
//   getKeyValue,
// } from "@nextui-org/react";
// import { useFormContext } from "../../../Context/FormContext";
// import { sanitizeCourseTitle } from "../../../Data/Formatter";

// const columns = [
//   {
//     key: "courseName",
//     label: "Course",
//   },
//   {
//     key: "title",
//     label: "Offering",
//   },
//   {
//     key: "status",
//     label: "Status",
//   },
//   {
//     key: "waitlist",
//     label: "Waitlist",
//   },
// ];

// export const Step2 = ({ professor }) => {
//   const { formData, handleGenericFieldChange, setIsLoading, setLoadingText } =
//     useFormContext();

//   const [selectedKey, setSelectedKey] = useState(new Set([]));
//   const [selectedCourse, setSelectedCourse] = useState("");

//   const handleCoursesChange = (newCourses) =>
//     handleGenericFieldChange("courses", newCourses);

//   useEffect(() => {
//     formData.courses.forEach((course) => {
//       setSelectedCourse(selectedKey.values().next().value);
//     });
//   }, [selectedKey]);

//   const fetchOfferingsOptions = async () => {
//     let courses_url = `https://pl821nzzaa.execute-api.us-west-1.amazonaws.com/prod/courses?instructorName=${professor.replace(/ /g, "+").replace(/,/g, "%2C")}&term=24F`;
//     setLoadingText("Fetching professor's course offerings...");
//     setIsLoading(true);
//     axios({
//       url: courses_url,
//       method: "GET",
//     })
//       .then((res) => {
//         handleCoursesChange(res.data);
//         console.log(res.data);
//         setIsLoading(false);
//         setLoadingText("");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     const selectedCourse = formData.courses.filter(
//       (course) => selectedKey.values().next().value === course.link,
//     );
//     setSelectedCourse(selectedCourse);
//   }, [selectedKey]);
//   useEffect(() => {
//     if (formData.professor.length > 0) {
//       fetchOfferingsOptions();
//     }
//   }, [formData.professor]);

//   return (
//     <>
//       <Table
//         selectionMode="single"
//         selectedKeys={selectedKey}
//         onSelectionChange={setSelectedKey}
//         removeWrapper
//         isCompact
//         classNames={{
//           base: "bg-white mx-auto rounded-md",
//         }}
//       >
//         <TableHeader columns={columns}>
//           {(column) => (
//             <TableColumn key={column.key}>{column.label}</TableColumn>
//           )}
//         </TableHeader>
//         <TableBody items={formData.courses}>
//           {(item) => (
//             <TableRow key={item.link}>
//               {(columnKey) => (
//                 <TableCell className="text-red-600">
//                   {columnKey === "courseName"
//                     ? formData.major +
//                       " " +
//                       String(sanitizeCourseTitle(getKeyValue(item, columnKey)))
//                     : getKeyValue(item, columnKey)}
//                 </TableCell>
//               )}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//       <h3 className="text-md font-medium mt-6">
//         You have selected: {selectedCourse[0]?.courseName},{" "}
//         {selectedCourse[0]?.title}
//       </h3>
//     </>
//   );
// };
