import React, { Component } from 'react';
import { CardMedia, Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

class Search extends Component {

  state = {
    currentInput: ''
  }

  async componentDidMount() {
    await this.resetAllSearch()
  }

  onInputHandler = async (e) => {
    let inputText = e.target.value
    console.log(inputText);
    await this.setState({currentInput: inputText})

    if(this.state.currentInput.length < 1) {
      this.resetAllSearch()
    }
  }

  ButtonHandle = async () => {
    let { currentInput } = this.state
    
    alert(currentInput)

  }

  resetAllSearch = async () => {
    this.setState({currentInput: ''})
  }

  render() {

    return (
      <div className="Search">
        <Grid container justify="center" alignItems="center">
          <CardMedia
            style={{width: '35%', height: '165px'}} 
            image="http://www.pngall.com/wp-content/uploads/2017/01/Weather-Report-Free-Download-PNG.png"
          />
        </Grid>
        <Typography style={{textAlign: 'center', fontSize: '32px'}} letterSpacing={6}>
          WEATHER APP
        </Typography>
        <Grid container justify="center" style={{padding: '25px'}}>
          <Paper style={{padding: '4px 12px', display: 'flex', alignItems: 'center', width: '18%', borderBottom: '2px solid #eee' }}>
            <InputBase
              placeholder="Search Country or City"
              onInput={this.onInputHandler}
            />
            <IconButton 
              style={{padding: '10px'}} 
              aria-label="search"
              onClick={() => this.ButtonHandle()}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </div>  
    ) 
  }

}

export default Search