import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CardMedia, Grid, Typography, Paper, IconButton, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Search = ({ classes }) => {
  return (
    <div className="Search">
      <Grid container justify="center" alignItems="center">
        <CardMedia 
          className={classes.CardMedia} 
          image="http://www.pngall.com/wp-content/uploads/2017/01/Weather-Report-Free-Download-PNG.png" 
        />
      </Grid>
      <Typography className={classes.Typography} letterSpacing={6}>
        WEATHER APP
      </Typography>
      <Grid container justify="center" className={classes.GridPaper}>
        <Paper className={classes.Paper}>
          <InputBase
            className={classes.input}
            placeholder="Search Country or City"
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Grid>
    </div>  
  )
}

export default Search