import React from "react";

class Meme extends React.Component {
  constructor() {
    super();
    this.state = {
      toptext: "",
      bottomtext: "",
      img: "http://i.imgflip.com/1bij.jpg",
      allmemeimg: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((Response) => Response.json())
      .then((Response) => {
        const { memes } = Response.data;
        console.log(memes[0]);
        this.setState({ allmemeimg: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allmemeimg.length);
    const randMemeimg = this.state.allmemeimg[randNum].url;
    this.setState({ img: randMemeimg });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
          <input
            placeholder="topText"
            type="text"
            name="toptext"
            value={this.state.toptext}
            onChange={this.handleChange}
          />
          <br />
          <input
            placeholder="bottomText"
            type="text"
            name="bottomtext"
            value={this.state.bottomtext}
            onChange={this.handleChange}
          />
          <button>gen</button>
        </form>
        <div className="meme">
          <img src={this.state.img} />
          <h2 className="top">{this.state.toptext}</h2>
          <h2 className="bottom">{this.state.bottomtext}</h2>
        </div>
      </div>
    );
  }
}

export default Meme;
