import React from "react";
class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        // name: "Dummy",
        // location: "default",
        // avatar_url:"dummy url"
      },
    };
  }

  async componentDidMount() {
    try {
      const data = await fetch("https://api.github.com/users/seekernothing");
      const json = await data.json(); // Add await here
      console.log(json);

      this.setState({
        userInfo: json,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    const { name, bio,avatar_url} = this.state.userInfo;

    return (
      <div className="user">
      <img alt="avtar" src={avatar_url} />
        <h2>Name:{name}</h2>

        <h3>Bio:{bio}</h3>
        
      </div>
    );
  }
}

export default UserClass;
