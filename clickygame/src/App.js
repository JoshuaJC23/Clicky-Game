import React, { Component } from 'react';
import './App.css';
import Nav from "./componenets/Nav"
import Wrapper from "./componenets/Wrapper"
import Title from "./componenets/Title"
import Column from "./Column";
import Container from "./Container"
import Row from "./Row"
import Friend from "./componenets/Friend"
import Characters from "./Characters.json"

//this is the action of randomly shuffling the cards
function shuffleCharacters(array) {
  for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


class App extends Component {

  state = {
    Characters,
    Score: 0,
    topScore: 0,
    rightWrong: "",
    clicked: [],
  };

  // this is supposed to track which character was clicked
  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id)});
    } else {
      this.handleReset();
    }
  }

  // this is supposed to increment the score by one each time
  // someone chooses a character without duplication
  // also if the score goes over top score it updates the top score
  // it also shuffles the character cards
  handleIncrement = () => {
    // this.setState({ Score: this.state.count + 1 });
    // this.setState({ Characters });

    const newScore = this.state.Score + 1;
    this.setState({
      Score: newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore) {
      this.setState({ topScore: newScore });
    }
    else if (newScore === 12) {
      this.setState({ rightWrong:  "Winner" });
    }
    this.handleShuffle();
  };

// when one picks a duplicates a pick the score
// and top score reset and the characers shuffle
  handleReset = () => {
    this.setState({
      Score: 0,
      topScore: this.state.topScore,
      rightWrong: "Glaven",
      clicked: []
    });
    this.handleShuffle();
  };

  // this shuffles the characters
  handleShuffle = () => {
    let shuffledCharacters = shuffleCharacters(Characters);
    this.setState({ Characters: shuffledCharacters });
  };

  render() {
    return (
      <Wrapper>

        <Nav Title = "Harry Potter Clicky Game"
        score = {this.state.Score}
        topScore = {this.state.topScore}
        rightWrong = {this.state.rightWrong}
        />
        <Title>

          Click a character to increase your score,
          however click on an image twice and game over.
        </Title>

        <Container>
          <Row>
            {this.state.Characters.map(Character => (
              <Column size = "md-3 sm-6">
                <Friend
                  key = {Character.id}
                  handleClick = {this.handleClick}
                  handleIncrement = {this.handleIncrement}
                  handleReset = {this.handleReset}
                  handleShuffle = {this.handleShuffle}
                  id = {Character.id}
                  image = {Character.image}
                  clicked = {Character.clicked}
                />
              </Column>
            ))}
          </Row>
        </Container>

      </Wrapper>
    );
  }
}

  
export default App;
