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
import ListCards from './ListCards/ListCards'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { mapOrder } from '~/utils/sorts'

function Column({ column }) {
  //drag and drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: column._id,
    data:{ ...column } // tra ve handelDragEnd o BoardContent
  })

  const dndKitColumStyles = {
    // touchAction:'none', // không có touchAction ở mobile sẽ bị lỗi, do dnd-Kit conflict với trình duyện mobile
    //                     // Dành cho sensor default dạng pointerSensor

    //Nếu sử dụng CSS.Transform như docs thì sẽ lỗi kiểu stretch(co dãn chiều rộng các col khi kéo)
    transform: CSS.Translate.toString(transform),
    transition,
    //Chiều cao phải luôn là max 100% vì nếu không lúc kéo column ngắn qua dài thì phải kéo khu vực
    //Giữa rất khó chịu, lúc này phải kết hợp {...listeners} ở Box chứ k phải ở dive để
    //tránh trường hợp kéo vào vũng không có content
    height:'100%',
    opacity: isDragging ? 0.5 : undefined
  }
  // sort column
  const orderedCards= mapOrder(column?.cards, column?.cardOrderIds, '_id')

  // dropdown menu more Options
  const [anchorEl, setAncorEl] = React.useState(null)
  const open =Boolean(anchorEl)

  const handleClick = ( event ) => {
    setAncorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAncorEl(null)
  }
  return (
    //bọc div và set chiều cao 100% làm kéo thả columns mượt hơn vì các col khi cùng chiều cao sẽ k bị bug flikering
    <div ref={setNodeRef} style={dndKitColumStyles} {...attributes}>
      <Box
        {...listeners} // listeners để lắng nghe các sự kiện khi chạm vào element, nên chỉ thao tác khi chạm vào box column
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
            height:(theme) => theme.trello.columnHeaderHeigh,
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
            {column?.title}
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
        <ListCards cards={orderedCards}/>

        {/* Box footer */}
        <Box
          sx={{
            height:(theme) => theme.trello.columnFooterHeigh,
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
    </div>

  )
}

export default Column