import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {

  //drag and drop
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data:{ ...card } // tra ve handelDragEnd o BoardContent
  })

  const dndKitCardStyles = {
    // touchAction:'none', // không có touchAction ở mobile sẽ bị lỗi, do dnd-Kit conflict với trình duyện mobile
    //                     // Dành cho sensor default dạng pointerSensor

    //Nếu sử dụng CSS.Transform như docs thì sẽ lỗi kiểu stretch(co dãn chiều rộng các col khi kéo)
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardActions = () => {
    {/* !! lấy true nếu length >0 còn là false */}
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard
      ref={setNodeRef} style={dndKitCardStyles} {...attributes} {...listeners}
      sx={{
        cursor:'pointer',
        boxShadow:'0 1px 1px rgba(0,0,0,0.2)',
        overflow:'unset',
        display: card?.FE_PlaceholderCard ? 'none':'block',
        // overflow: card?.FE_PlaceholderCard ? 'hidden': 'unset', trick set card mất FE
        // height : card?.FE_PlaceholderCard ? '0px' :'unsert'
      }}
    >
      {card?.cover&&
      <CardMedia
        sx={{ height: 140 }}
        image={card?.cover}
      />}
      <CardContent sx={{
        p: 1.5,
        '&:last-child':{
          p:1.5
        }
      }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActions() &&
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && <Button startIcon={<GroupIcon/>} size="small">{card?.memberIds?.length}</Button>}
          {!!card?.comments?.length && <Button startIcon={<CommentIcon/>} size="small">{card?.comments?.length}</Button>}
          {!!card?.attachments?.length && <Button startIcon={<AttachmentIcon/>} size="small">{card?.attachments?.length}</Button>}
        </CardActions>
      }

    </MuiCard>
  )
}

export default Card