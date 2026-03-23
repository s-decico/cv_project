import React from "react";
import { StyleSheet } from "@react-pdf/renderer";
import ReactDOMServer from "react-dom/server";
import CVBox from "./CVBox";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  Viewider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  cvBox: {
    backgroundColor: "white",
    width: "70%",
    margin: "0 auto",
    padding: "1rem",
  },
  nameBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 0rem 2rem 0rem",
    fontSize: "2rem",
  },
  basicDetailsBox: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem 0rem 1rem 0rem",
    gap: "2rem",
    /* background-color: #7c50b1; */
  },
  basicDetailsElement: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  basicDetailsElementR1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  basicDetailsElementR2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  workExperienceBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    /* background-color: aquamarine; */
    padding: "1rem 0rem 1rem 0rem",
  },
  workExpElement: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  workExpHeaderBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  designationBox: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  companyBox: {
    fontSize: "1.1rem",
  },
  workexpDetailsElement: {
    listStyleType: "disc",
  },
  educationBox: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    /* background-color: brown; */
    padding: "1rem 0rem 1rem 0rem",
  },
  qualificationBox: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  schoolBox: {
    fontSize: "1.1rem",
  },
  educationElement: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  skillsBox: {
    padding: "1rem 0rem 1rem 0rem",
    /* background-color: #4977ce; */
  },
  skillElements: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem",
    height: "2rem",
  },
  projectBox: {
    display: "flex",
    flexDirection: "column",
    /* background-color: #4682A9; */
    padding: "1rem 0rem 1rem 0rem",
    gap: "1rem",
  },
  projectnameBox: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  projectlinkBox: {
    fontSize: "1rem",
    fontWeight: "100",
  },
  projectElement: {
    display: "flex",
    flexDirection: "column",
  },
  projectinfoBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectDetailsBox: {
    listStyleType: "disc",
  },
  achievementBox: {
    display: "flex",
    flexDirection: "column",
    /* background-color: burlywood; */
    gap: "1rem",
    padding: "1rem 0rem 1rem 0rem",
  },
  achievementTitleBox: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  achievementSubtitleBox: {
    fontSize: "1.1rem",
  },
  interestAndLangBox: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "5rem",
    padding: "1rem 4rem 3rem 4rem",
  },
  interestBox: {
    flex: 1,
  },
  languageBox: {
    flex: 1,
  },
  languageElementBox: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    height: "2rem",
  },
  interestElementBox: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
    height: "2rem",
  },
});
const generatePdfContent = () => {
  const componentHtml = ReactDOMServer.renderToStaticMarkup(<CVBox />);
};

// const generatePdfContent = () => {
//   const CVBoxPDFContent = ({ jsonData }) => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.userDetailsBox}>
//           <View style={styles.nameBox}>
//             {jsonData}
//             {jsonData.BasicDetails && jsonData.BasicDetails.fullname}
//           </View>
//           <Divider
//             sx={{ backgroundColor: "black", width: "70%", margin: "0 auto" }}
//           />
//           <View style={styles.basicDetailsBox}>
//             <View style={styles.basicDetailsElementR1}>
//               {jsonData.BasicDetails &&
//                 Object.keys(jsonData.BasicDetails)
//                   .filter((key) => key !== "fullname" && key !== "_id")
//                   .map((key) => {
//                     switch (key) {
//                       case "phno":
//                         return (
//                           <Text key={key} style={styles.basicDetailsElement}>
//                             <PhoneAndroid />
//                             {jsonData.BasicDetails[key]}
//                           </Text>
//                         );
//                         break;
//                       case "email":
//                         let email = jsonData.BasicDetails[key];
//                         email = "mailto:" + email;
//                         return (
//                           <Text key={key} style={styles.basicDetailsElement}>
//                             <Email />
//                             <a href={email}>{jsonData.BasicDetails[key]}</a>
//                           </Text>
//                         );
//                         break;
//                       case "address":
//                         return (
//                           <Text key={key} style={styles.basicDetailsElement}>
//                             <Home />
//                             {jsonData.BasicDetails[key]}
//                           </Text>
//                         );
//                         break;
//                       default:
//                         if (
//                           key == "github" &&
//                           jsonData.BasicDetails[key] == ""
//                         ) {
//                           let url = jsonData.BasicDetails[key];
//                           url = url.startsWith("https://")
//                             ? url
//                             : "https://" + url;
//                           return (
//                             <Text key={key} style={styles.basicDetailsElement}>
//                               <LinkedIn />
//                               {<a href={url}>LinkedIn</a>}
//                             </Text>
//                           );
//                         }

//                         break;
//                     }
//                   })}
//             </View>
//             <View style={styles.basicDetailsElementR2}>
//               {jsonData.BasicDetails &&
//                 jsonData.BasicDetails["github"] != "" &&
//                 Object.keys(jsonData.BasicDetails)
//                   .filter((key) => key !== "fullname" && key !== "_id")
//                   .map((key) => {
//                     let url = jsonData.BasicDetails[key];
//                     url = url.startsWith("https://") ? url : "https://" + url;
//                     switch (key) {
//                       case "linkedin":
//                         return (
//                           <Text key={key} style={styles.basicDetailsElement}>
//                             <LinkedIn />
//                             {<a href={url}>LinkedIn</a>}
//                           </Text>
//                         );
//                         break;
//                       case "github":
//                         return (
//                           <Text key={key} style={styles.basicDetailsElement}>
//                             <GitHub />
//                             {<a href={url}>Github</a>}
//                           </Text>
//                         );
//                         break;
//                       default:
//                         break;
//                     }
//                   })}
//             </View>
//           </View>
//         </View>

//         <View style={styles.workExperienceBox}>
//           <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
//             Work Experience
//           </Divider>
//           {jsonData.WorkExperience &&
//             jsonData.WorkExperience.map((x, index) => {
//               return (
//                 <>
//                   <View style={styles.workExpElement}>
//                     <View style={styles.workExpHeaderBox}>
//                       <View style={styles.designationInfoBox}>
//                         <Text style={styles.designationBox}>
//                           {x.designation}
//                         </Text>
//                         <Text style={styles.companyBox}>{x.companyname}</Text>
//                       </View>
//                       <Text style={styles.workExpYearBox}>
//                         {x.startdate
//                           ? x.startdate +
//                             "-" +
//                             (x.enddate ? x.enddate : "Present")
//                           : ""}
//                       </Text>
//                     </View>
//                     <View style={styles.workExpDetailsBox}>
//                       {x.details.map((detail) => {
//                         return (
//                           <Text style={styles.workexpDetailsElement}>
//                             <li>{detail}</li>
//                           </Text>
//                         );
//                       })}
//                     </View>
//                   </View>
//                   {index !== jsonData.WorkExperience.length - 1 && (
//                     <Divider sx={{ width: "60%", margin: "0 auto" }} />
//                   )}
//                 </>
//               );
//             })}
//         </View>
//         <View style={styles.educationBox}>
//           <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
//             Education
//           </Divider>
//           {jsonData.Education &&
//             jsonData.Education.map((x, index) => {
//               return (
//                 <>
//                   <View style={styles.educationElement}>
//                     <View style={styles.qualificationInfoBox}>
//                       <Text style={styles.qualificationBox}>
//                         {x.qualification}
//                       </Text>
//                       <Text style={styles.schoolBox}>{x.school}</Text>
//                     </View>
//                     <Text style={styles.educationYearBox}>{x.doj}</Text>
//                   </View>
//                   {index !== jsonData.Education.length - 1 && (
//                     <Divider sx={{ width: "60%", margin: "0 auto" }} />
//                   )}
//                 </>
//               );
//             })}
//         </View>
//         <View style={styles.skillsBox}>
//           <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
//             Skills
//           </Divider>
//           <View style={styles.skillElements}>
//             {jsonData.Skills &&
//               jsonData.Skills.map((x, index) => {
//                 return (
//                   <>
//                     <Text style={styles.skillElement}>{x}</Text>
//                     {index !== jsonData.Skills.length - 1 && (
//                       <Divider
//                         orientation="vertical"
//                         variant="middle"
//                         flexItem
//                       />
//                     )}
//                   </>
//                 );
//               })}
//           </View>
//         </View>
//         <View style={styles.projectBox}>
//           <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
//             Projects
//           </Divider>
//           {jsonData.Project &&
//             jsonData.Project.map((x, index) => {
//               let url = x.projectlink;
//               url = url.startsWith("https://") ? url : "https://" + url;
//               return (
//                 <>
//                   <View style={styles.projectElement}>
//                     <View style={styles.projectinfoBox}>
//                       <Text style={styles.projectnameBox}>
//                         {x.projectname}
//                         <Text style={styles.projectlinkBox}>
//                           <a href={url}>Link to the project</a>
//                         </Text>
//                       </Text>
//                       <Text style={styles.projectyearBox}>{x.projectyear}</Text>
//                     </View>
//                     <View style={styles.projectDetailsBox}>
//                       {x.details.map((x) => {
//                         return (
//                           <Text style={styles.projectDetailsBox}>
//                             <li>{x}</li>
//                           </Text>
//                         );
//                       })}
//                     </View>
//                   </View>
//                   {index !== jsonData.Project.length - 1 && (
//                     <Divider sx={{ width: "60%", margin: "0 auto" }} />
//                   )}
//                 </>
//               );
//             })}
//         </View>

//         <View style={styles.achievementBox}>
//           <Divider textAlign="center" sx={{ fontSize: "1.1rem" }}>
//             Achievements
//           </Divider>
//           {jsonData.Achievement &&
//             jsonData.Achievement.map((x, index) => {
//               return (
//                 <>
//                   <View style={styles.achievementElement}>
//                     <Text style={styles.achievementTitleBox}>{x.title}</Text>
//                     <Text style={styles.achievementSubtitleBox}>
//                       {x.subtitle}
//                     </Text>
//                   </View>
//                   {index !== jsonData.Achievement.length - 1 && (
//                     <Divider sx={{ width: "60%", margin: "0 auto" }} />
//                   )}
//                 </>
//               );
//             })}
//         </View>

//         <View style={styles.interestAndLangBox}>
//           <View style={styles.interestBox}>
//             <View style={styles.interestElementBox}>
//               {jsonData.Interest &&
//                 jsonData.Interest.map((x, index) => {
//                   return (
//                     <>
//                       <Text style={styles.interestElement}>{x}</Text>
//                       {index !== jsonData.Skills.length - 1 && (
//                         <Divider
//                           orientation="vertical"
//                           variant="middle"
//                           flexItem
//                         />
//                       )}
//                     </>
//                   );
//                 })}
//             </View>
//           </View>

//           <View style={styles.interestBox}>
//             <View style={styles.languageElementBox}>
//               {jsonData.Language &&
//                 jsonData.Language.map((x, index) => {
//                   return (
//                     <>
//                       <Text style={styles.languageElement}>{x}</Text>
//                       {index !== jsonData.Language.length - 1 && (
//                         <Divider
//                           orientation="vertical"
//                           variant="middle"
//                           flexItem
//                         />
//                       )}
//                     </>
//                   );
//                 })}
//             </View>
//           </View>
//         </View>
//       </Page>
//     </Document>
//   );

//   const pdfOutput = ReactDOMServer.renderToStaticMarkup(CVBoxPDFContent);
//   const blob = new Blob([pdfOutput], { type: "application/pdf" });
//   const url = URL.createObjectURL(blob);

//   // Create a download link
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "cv.pdf";
//   a.click();
// };

export default generatePdfContent;
