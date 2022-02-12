import React from 'react'
import { Grid } from '@mui/material'

export default function StickyFooter() {
  return (
    <div>
        <footer style={{padding: '1em', position : 'fixed', width : '100%', bottom : '0', textAlign: 'center', backgroundColor: '#151515', color: '#f4f5f7'}}>
            <Grid container direction="column" justify="space-around" alignItems="center" spacing={2}>
                
                <Grid item style={{width: '100%', color: '#f4f5f7', fontFamily: 'Raleway', textAlign: 'center', padding: '2em'}}>
                    {'© '}
                    {new Date().getFullYear()}
                    {' KPS'}
                </Grid>
            </Grid>
        </footer>
    </div>
  )
}
