import React, { useState, useEffect } from 'react'
import { CardMedia, Grid, Typography, Paper, InputBase, Divider } from '@material-ui/core'
import { debounce } from 'lodash'
import axios from 'axios'

const Search = () => {
    // State and setState handle
    const [country, setCountry] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState('')
    // Input Handle
    const changeEvent = debounce(setCountry, 3000)
    const onChangeCountry = event => {
      changeEvent(event.target.value)
    }

    // Using useEffect
    useEffect(() => {
      const fetchGeocode = async () => {
        try {
          const { data } = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + country + '.json?access_token=pk.eyJ1IjoiZG9keXNldGl5YXdhbiIsImEiOiJjazBhMHY4MjEwZTBqM2JtbmNydDJscHF2In0.B8RU60OZ4gWlozeMUYwOFQ&limit=1')
          const latitude = data.features[0].center[1]
          setLatitude(latitude)
          const longitude = data.features[0].center[0]
          setLongitude(longitude)
          const location = data.features[0].place_name
          setLocation(location)
          
          const responseForecast = await axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/68bd01685b3267ec09cb6cae192dcf5d/' + latitude +','+ longitude + '?lang=en')
          console.log(responseForecast)
        } catch (error) {
          console.log(error);
        }
      }
      if (country !== '') {
        fetchGeocode()
      }
    }, [country])

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
              onChange={onChangeCountry}
            />
            <Divider style={{height: '28px', margin: '4px'}} orientation="vertical" />
            <InputBase
              placeholder="Input latitude"
              value={latitude}
              disabled
            />
            <Divider style={{height: '28px', margin: '4px'}} orientation="vertical" />
            <InputBase
              placeholder="Input Longitude"
              value={longitude}
              disabled
            />
          </Paper>
        </Grid>
        <Grid container justify="center">
          <p style={{textAlign: 'center', fontSize: '32px'}}>
            Your Location: {location}
          </p>
        </Grid>
      </div>  
    ) 
  }

export default Search