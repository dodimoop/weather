import React, { useState } from 'react';
import { CardMedia, Grid, Typography, Paper, IconButton, InputBase, Divider } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Search = () => {

    const [getCountry, setCountry] = useState(null)

    const buttonHandler = () => {
      alert(getCountry)
    }

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
          <Paper style={{padding: '4px 12px', display: 'flex', alignItems: 'center', width: '45%', borderBottom: '2px solid #eee' }}>
            <InputBase
              placeholder="Input Country or City"
              onChange={(e) => setCountry(e.target.value)}
            />
            <Divider style={{height: '28px', margin: '4px'}} orientation="vertical" />
            <InputBase
              placeholder="Input latitude"
            />
            <Divider style={{height: '28px', margin: '4px'}} orientation="vertical" />
            <InputBase
              placeholder="Input Longitude"
            />
            <IconButton 
              style={{padding: '10px'}} 
              aria-label="search"
              onClick={() => buttonHandler()}
              >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid container justify="center">
          <p style={{textAlign: 'center', fontSize: '32px'}}>
            Your Country {getCountry}
          </p>
        </Grid>
      </div>  
    ) 
  }

export default Search