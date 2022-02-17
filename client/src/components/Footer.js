import React from 'react'
import { Grid } from '@mui/material'

import facebook from '../img/facebook.svg'
import twitter from '../img/twitter.svg'
import instagram from '../img/instagram.svg' 
import github from '../img/github.svg' 
import linkedin from '../img/linkedin.svg' 

const Footer = () => { 
  return (
    <div>
        <footer style={{padding: '1em', position : 'fixed', width : '100%', bottom : '0', textAlign: 'center', backgroundColor: '#151515', color: '#f4f5f7'}}>
          <Grid container alignItems='center' justifyContent='center' spacing={2} sx={{ paddingTop : '1em', display: { sm: 'block', xs: 'none' } }}>
              <Grid item component={'a'} href='https://www.facebook.com/khrishan94' rel='noopener noreferrer' target='_blank'>
                  <img alt='Facebook logo' src={facebook} style={{ height: '2em', width : '2em'}} />
              </Grid>
              <Grid item component={'a'} href='https://www.twitter.com/khrishan94' rel='noopener noreferrer' target='_blank'>
                  <img alt='Twitter logo' src={twitter} style={{ height: '2em', width : '2em'}} />
              </Grid>
              <Grid item component={'a'} href='https://www.instagram.com/khrishan94' rel='noopener noreferrer' target='_blank'>
                  <img alt='Instagram logo' src={instagram} style={{ height: '2em', width : '2em'}} />
              </Grid>
              <Grid item component={'a'} href='https://www.github.com/khrishan' rel='noopener noreferrer' target='_blank'>
                  <img alt='GitHub logo' src={github} style={{ height: '2em', width : '2em'}} />
              </Grid>
              <Grid item component={'a'} href='https://www.linkedin.com/in/khrishanpatel/' rel='noopener noreferrer' target='_blank'>
                  <img alt='LinkedIn logo' src={linkedin} style={{ height: '2em', width : '2em'}} />
              </Grid>
          </Grid>
          <Grid item style={{ padding:'1em', width: '100%', color: '#f4f5f7', fontFamily: 'Raleway', textAlign: 'center' }} >
              {'© '}
              {new Date().getFullYear()}
              {' KPS'}
          </Grid>
        </footer>
    </div>
  )
}

export default Footer
