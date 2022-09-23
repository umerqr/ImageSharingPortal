import React, { useEffect, useState } from 'react';
import AppButton from '../../components/AppButton';
// import PropTypes from 'prop-types';
import './styles.css';
import tripsJson from './trips.json';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Users() {
  const { tripSet } = tripsJson;
  const [ascendingSort, setAscendingSort] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const sortedData = tripSet.sort((a, b) => {
    if (ascendingSort) return new Date(b.checkInDate) - new Date(a.checkInDate);
    if (!ascendingSort)
      return new Date(a.checkInDate) - new Date(b.checkInDate);
  });
  const [tripsData, setTripsData] = useState([]);
  useEffect(() => {
    setTripsData(sortedData);
    setLoading(false);
  }, [ascendingSort]);

  return (
    <div className='d-flex justify-content-center flex-row-reverse'>
      <div className=''>
        <div className='d-flex mt-2'>

       <div>Search Input
        </div> 
        <input className='ml-1' value={searchInput} onChange={(e)=> setSearchInput(e.target.value.toLowerCase())}/>
      </div>
        <AppButton
          label={'Sort Switch'}
          className="mt-3"
          onClick={() => {
            setLoading(true);
            setTripsData([]);
            setAscendingSort((prevState) => !prevState);
          }}
        />
        </div>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      {!loading &&
          tripsData
            .filter((x) => {
              if (searchInput === '') return x;
              if (x.unitStyleName.toLowerCase().includes(searchInput)) return x;
            })
            .map((x, i) => {
              const imageUrl = `https://cms.inspirato.com${x.heroImage}`;
              return (
                <Grid key={i} item xs>
                <div className='d-flex m-2'>
                  <img className='image-styles' src={imageUrl} />
                  <div className='d-flex flex-column ml-2'>
                    <div>
                      <b>Unit Name: </b>
                      {x.unitName}
                    </div>
                    <div>
                      <b>Unit Style Name: </b>
                      {x.unitStyleName}
                    </div>
                    <div>
                      <b>Check In Date: </b>
                      {x.checkInDate}
                    </div>
                  </div>
                  </div>
                {/* </div> */}
                </Grid>
              );
            })}
      </Grid>
    </Box>
    </div>
  );
}

Users.propTypes = {};

export default Users;
