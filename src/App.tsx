import React, { useState } from 'react'
import {
  Box,
  Grid,
  Button,
  RadioGroup,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Checkbox,
  Radio,
  Select,
  InputLabel,
  Typography,
  AppBar,
  IconButton,
  Card
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import _includes from 'lodash/includes'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import _get from 'lodash/get'
import _join from 'lodash/join'

interface profileType {
  id: number
  firstName: string
  lastName: string
  email: string
  pdpa: boolean
  gender: string
  game: string
  music: string
  craft: string
  reading: string
  note: string
  status: string
}

const initValue = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  pdpa: false,
  gender: 'Male',
  game: '',
  music: '',
  craft: '',
  reading: '',
  note: '',
  status: '',
}

function App() {
  const [value, setValue] = useState<profileType>(initValue)
  const [profileList, setProfileList] = useState<profileType[]>([])
  const [countId, setCountId] = useState(0)

  const handleChange = (name: string, v: string | string[] | boolean) => {
    const typeBoolean = ['pdpa']
    if (_includes(typeBoolean, name)) {
      setValue((prev) => ({
        ...prev,
        [name]: !v,
      }))
    } else if (_get(value, `${name}`) === v) {
      setValue((prev) => ({
        ...prev,
        [name]: '',
      }))
    } else {
      setValue((prev) => ({
        ...prev,
        [name]: v,
      }))
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const newArr = [...profileList]
    newArr.push({
      ...value,
      id: countId
    })
    setProfileList(newArr)
    setCountId((prev) => prev += 1)
  }

  const handleDelete = (id: number) => {
    const newArr = _filter(profileList, (d) => d.id !== id)
    setProfileList(newArr)
  }

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: 'calc(100vh - 65px)',
        height: '100%',
        backgroundColor: '#F8F8F8',
      }}
    >
      <AppBar position="fixed">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '65px',
          }}
        >
          <Typography variant="h3" color="inherit" component="div">
            User profile management System
          </Typography>
        </Box>
      </AppBar>
      <Grid container spacing={3} width={1} height={1} mt="65px">
        <Grid item xs={12} md={5}>
          <Box
            p={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box mb={3}>
              <Typography variant="h4" color="inherit" component="div">
                Profile management
              </Typography>
            </Box>
            <form onSubmit={(e) => handleSubmit(e)} noValidate>
              <Card sx={{ padding: '16px' }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      type="text"
                      label="Name"
                      value={value.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      type="text"
                      label="Last name"
                      value={value.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      fullWidth
                      type="email"
                      label="Email"
                      value={value.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label="Confirm PDPA"
                      control={
                        <Checkbox name="pdpa" checked={value.pdpa} onChange={(e) => handleChange('pdpa', !e.target.checked)} />
                      }
                    />
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        row
                        value={value.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                      >
                        <FormControlLabel
                          label="Male"
                          value="Male"
                          control={
                            <Radio
                              name="gender"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Female"
                          value="Female"
                          control={
                            <Radio
                              name="gender"
                            />
                          }
                        />
                        <FormControlLabel
                          label="Etc"
                          value="Etc"
                          control={
                            <Radio
                              name="gender"
                            />
                          }
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Hobby</FormLabel>
                      <FormGroup row>
                        <FormControlLabel
                          label="Game"
                          control={
                            <Checkbox
                              name="game"
                              value="Game"
                              checked={!!value.game}
                              onChange={(e) => handleChange('game', e.target.value)}
                            />
                          }
                        />
                        <FormControlLabel
                          label="Music"
                          control={
                            <Checkbox
                              name="music"
                              value="Music"
                              checked={!!value.music}
                              onChange={(e) => handleChange('music', e.target.value)}
                            />
                          }
                        />
                        <FormControlLabel
                          label="Craft"
                          control={
                            <Checkbox
                              name="craft"
                              value="Craft"
                              checked={!!value.craft}
                              onChange={(e) => handleChange('craft', e.target.value)}
                            />
                          }
                        />
                        <FormControlLabel
                          label="Reading"
                          control={
                            <Checkbox
                              name="reading"
                              value="Reading"
                              checked={!!value.reading}
                              onChange={(e) => handleChange('reading', e.target.value)}
                            />
                          }
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        value={value.status}
                        label="Status"
                        onChange={(e) => handleChange('status', e.target.value as unknown as string)}
                      >
                        <MenuItem value="Single">Single</MenuItem>
                        <MenuItem value="Married">Married</MenuItem>
                        <MenuItem value="Divorce">Divorce</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="note"
                      multiline
                      label="Note"
                      value={value.note}
                      onChange={(e) => handleChange('note', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 16 }}>
                    <Box
                      gap={2}
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        width: '100%',
                      }}
                    >
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => setValue(initValue)}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            </form>
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          {_map(profileList, (d, i) => (
            <Box pt={3} pb={(profileList.length === i + 1) ? 3 : 0}>
              <Card sx={{ padding: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <Typography variant="h6" color="inherit" component="div" fontWeight={600}>
                    USER
                    {' '}
                    {i + 1}
                  </Typography>
                  <IconButton onClick={() => handleDelete(d.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Name:
                      {' '}
                      {!d.firstName && !d.lastName ? '-' : `${d.firstName}${d.lastName ? ` ${d.lastName}` : ''}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Email:
                      {' '}
                      {d.email || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Gender:
                      {' '}
                      {d.gender || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Hobby:
                      {' '}
                      {_join(_filter([d.game, d.music, d.craft, d.reading], (k) => k), ', ') || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Status:
                      {' '}
                      {d.status || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="inherit" component="div">
                      Note:
                      {' '}
                      {d.note || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      label="Confirm PDPA"
                      control={
                        <Checkbox
                          checked={d.pdpa}
                          inputProps={{ 'aria-label': 'controlled' }}
                          disabled
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Card>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default App
