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
    const { name, bio, avatar_url, login } = this.state.userInfo;

    return (
      <div className="user flex mt-20 gap-20 justify-center">
        <div>
          {" "}
          <img alt="avtar" className="w-80 rounded-2xl" src={avatar_url} />
        </div>
        <div className="mt-20">
          <h2>NAME: {name}</h2>
          <h2>AKA: {login}</h2>

          <h3>BIO: {bio}</h3>
        </div>
      </div>
    );
  }
}

export default UserClass;
