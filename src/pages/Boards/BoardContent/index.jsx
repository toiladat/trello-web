import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import Cloud from '@mui/icons-material/Cloud'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'


const COLUMN_HEDER_HEIGH='50px'
const COLUMN_FOOTER_HEIGH='56px'

function BoardContent() {
  const [anchorEl, setAncorEl] = React.useState(null)
  const open =Boolean(anchorEl)

  const handleClick = ( event ) => {
    setAncorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAncorEl(null)
  }
  return (
    <Box sx={{
      bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      width:'100%',
      height:( theme ) => theme.trello.boardContentHeight,
      p:'10px 0'
    }}>
      {/* Box cover box columns */}
      <Box sx={{
        bgcolor:'inherit', //ke thua bg cha,
        width:'100%',
        height:'100%',
        display:'flex',
        overflowX:'auto',
        overflowY:'hidden',
        '&::-webkit-scrollbar-track':{ //bao boc thumb
          m:2
        }
      }}>
        {/* Box column 01*/}
        <Box
          sx={{
            minWidth:'300px',
            maxWidth:'300px',
            bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            ml:2, //marginleft co spacing =2 =>16px
            borderRadius:'6px',
            height:'fit-content', //fit theo content cua box,
            maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Box header */}
          <Box
            sx={{
              height:COLUMN_HEDER_HEIGH,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontSize:'1rem',
                fontWeight:'bold',
                cursor:'pointer'
              }}
            >
              Column title
            </Typography>
            <Box>
              <Tooltip title='More Options'>
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color:'text.primary',
                    cursor:'pointer'
                  }}
                />
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Coppy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Box list card */}
          <Box
            sx={{
              p:'0 5px', //trick scroll bar column
              m:'0 5px',
              display:'flex',
              flexDirection:'column',
              gap:1,
              overflowX:'hidden',
              overflowY:'auto',
              maxHeight:(theme) => `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEDER_HEIGH} - ${COLUMN_FOOTER_HEIGH})`,
              '&::-webkit-scrollbar-thumb':{
                backgroundColor:'#ced0da',
                borderRadius:'8px'
              },
              '&::-webkit-scrollbar-thumb:hover':{
                backgroundColor:'#bfc2cf'
              }
            }}
          >
            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="data:image/png;base64,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"
                title="green iguana"
              />
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px'}}>
                <Button startIcon={<GroupIcon/>} size="small">20</Button>
                <Button startIcon={<CommentIcon/>} size="small">10</Button>
                <Button startIcon={<AttachmentIcon/>} size="small">15</Button>

              </CardActions>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box footer */}
          <Box
            sx={{
              height:COLUMN_FOOTER_HEIGH,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <Button
              startIcon={<AddCardIcon/>}
            >
              Add new card
            </Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>

        </Box>

        {/* Box column 02*/}
        <Box
          sx={{
            minWidth:'300px',
            maxWidth:'300px',
            bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
            ml:2, //marginleft co spacing =2 =>16px
            borderRadius:'6px',
            height:'fit-content', //fit theo content cua box,
            maxHeight:(theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
          }}
        >
          {/* Box header */}
          <Box
            sx={{
              height:COLUMN_HEDER_HEIGH,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontSize:'1rem',
                fontWeight:'bold',
                cursor:'pointer'
              }}
            >
              Column title
            </Typography>
            <Box>
              <Tooltip title='More Options'>
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    color:'text.primary',
                    cursor:'pointer'
                  }}
                />
              </Tooltip>

              <Menu
                id="basic-menu-column-dropdown"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Coppy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {/* Box list card */}
          <Box
            sx={{
              p:'0 5px',
              m:'0 5px',
              display:'flex',
              flexDirection:'column',
              gap:1,
              overflowX:'hidden',
              overflowY:'auto',
              maxHeight:(theme) => `calc( ${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEDER_HEIGH} - ${COLUMN_FOOTER_HEIGH})`,
              '&::-webkit-scrollbar-thumb':{
                backgroundColor:'#ced0da',
                borderRadius:'8px'
              },
              '&::-webkit-scrollbar-thumb:hover':{
                backgroundColor:'#bfc2cf'
              }
            }}
          >
            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
              overflow:'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="data:image/png;base64,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"
                title="green iguana"
              />
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px'}}>
                <Button startIcon={<GroupIcon/>} size="small">20</Button>
                <Button startIcon={<CommentIcon/>} size="small">10</Button>
                <Button startIcon={<AttachmentIcon/>} size="small">15</Button>

              </CardActions>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

            <Card sx={{
              cursor:'pointer',
              boxShadow:'0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow:'unset'
            }}>
              <CardContent sx={{
                p: 1.5,
                '&:last-child':{
                  p:1.5
                }
              }}>
                <Typography>TienDatCode 2</Typography>
              </CardContent>
            </Card>

          </Box>

          {/* Box footer */}
          <Box
            sx={{
              height:COLUMN_FOOTER_HEIGH,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}
          >
            <Button
              startIcon={<AddCardIcon/>}
            >
              Add new card
            </Button>
            <Tooltip title='Drag to move'>
              <DragHandleIcon sx={{ cursor:'pointer' }}/>
            </Tooltip>
          </Box>

        </Box>

      </Box>


    </Box>
  )
}

export default BoardContent
