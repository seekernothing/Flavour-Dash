import UserClass from "./UserClass";
import React from "react";

class About extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
       
        <h2 className="text-center mt-10">This is a about component</h2>
        <UserClass
          name={"Abhishek Biradar"}
          location={"Pune"}
          number={"+918888888888"}
        />
      </div>
    );
  }
}

// const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <h2>This is a about component</h2>
// <UserClass name={"Abhishek Biradar"} location={"Pune"}  number={"+918888888888"}/>

//     </div>
//   );
// };

export default About;
