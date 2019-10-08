import React, { useState, useEffect } from 'react'
import { 
  CardMedia, 
  Grid, 
  Typography, 
  Paper, 
  InputBase, 
  Divider, 
  CircularProgress, 
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
 } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { withStyles } from '@material-ui/core/styles'
import { debounce } from 'lodash'
import axios from 'axios'

const styles = theme => ({
  CardMedia: {
    width: '35%',
    height: '165px'
  },
  Typography: {
    textAlign: 'center',
    fontSize: '32px',
    letterSpacing: 4,
    color: '#585858'
  },
  Grid: {
    padding: '25px'
  },
  Paper: {
    padding: '4px 12px', 
    display: 'flex', 
    alignItems: 'center', 
    width: '45%', 
    borderBottom: '2px solid #eee'
  },
  Divider: {
    height: '28px', 
    margin: '4px'
  },
  GridParagraph: {
    textAlign: 'center', 
    fontSize: '28px', 
    margin: '0 0 0 0'
  },
  GridParagraphSummary: {
    textAlign: 'center', 
    fontSize: '18px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  ExpansionPanelSummary: {
    height: 75,
    background: '#F1F1F1',
    borderBottom: '3px solid #e4e4e4',

  },
  ExpansionPanelDetails: {
    display: 'flex',
    padding: '8px 24px 24px',
    height: '50px',
    background: '#e4e4e4',
  },
  divExpansion: {
    margin: 25
  }
})

const Search = ({ classes }) => {
    // State and setState handle
    const [country, setCountry] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [location, setLocation] = useState('')
    const [summary, setSummary] = useState('')
    const [loading, setLoading] = useState(false)
    const [data,setData] = useState([])

    // Input Handle
    const changeEvent = debounce(setCountry, 2000)
    const onChangeCountry = event => {
      changeEvent(event.target.value)
    }

    // Using useEffect
    useEffect(() => {
      const fetchGeocode = async () => {
        try {
          setLoading(true)
          const { data } = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/' + country + '.json?access_token=pk.eyJ1IjoiZG9keXNldGl5YXdhbiIsImEiOiJjazBhMHY4MjEwZTBqM2JtbmNydDJscHF2In0.B8RU60OZ4gWlozeMUYwOFQ&limit=1')
          const latitude = data.features[0].center[1]
          setLatitude(latitude)
          const longitude = data.features[0].center[0]
          setLongitude(longitude)
          const location = data.features[0].place_name
          setLocation(location)
          
          const response = await axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/68bd01685b3267ec09cb6cae192dcf5d/' + latitude +','+ longitude + '?lang=id')
          const dataDaily = await response.data.daily.data
          setData(dataDaily)
          const summaryResult = response.data.daily.summary + ' Saat ini ' + response.data.currently.temperature + ' derajat keluar. Ada sebuah ' + response.data.currently.precipProbability + '% kemungkinan hujan.'
          setSummary(summaryResult)
          
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
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
            className={classes.CardMedia}
            image="http://www.pngall.com/wp-content/uploads/2017/01/Weather-Report-Free-Download-PNG.png"
          />
        </Grid>
        <Typography className={classes.Typography}>
          WEATHER 
        </Typography>
        <Grid container justify="center" className={classes.Grid}>
          <Paper className={classes.Paper}>
            <InputBase
              placeholder="Input Country or City"
              onChange={onChangeCountry}
            />
            <Divider className={classes.Divider} orientation="vertical" />
            <InputBase
              placeholder="latitude"
              value={latitude}
              disabled
            />
            <Divider className={classes.Divider} orientation="vertical" />
            <InputBase
              placeholder="Longitude"
              value={longitude}
              disabled
            />
          </Paper>
        </Grid>
        {loading ? (
          <Grid container justify="center">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          <div>
            <Grid container justify="center">
              <p className={classes.GridParagraph}>{location}</p>
            </Grid>
            <Grid container justify="center">
              <p className={classes.GridParagraphSummary}>{summary}</p>
            </Grid>
          </div>
        )}
        {data.map((data, index) => (
          <div className={classes.divExpansion} key={index}>
            <Grid container justify="center">
              <ExpansionPanel>
                <ExpansionPanelSummary
                  className={classes.ExpansionPanelSummary}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={data.time}
                  id={data.time}
                >
                  <Typography className={classes.heading}>{data.icon}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </div>
        ))}

      </div>  
    ) 
  }

export default withStyles(styles)(Search)