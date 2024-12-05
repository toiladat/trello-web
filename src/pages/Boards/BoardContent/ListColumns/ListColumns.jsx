import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Column from './Columns/Columns'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
function ListColumns({ columns }) {
  /* Thằng SortableContext nó yêu cầu items là 1 mảng dạng ['id-1', 'id-2'] chứ không phải
  [{id:'id-1'}, {id: 'id-2'}]
  Nếu không đúng thì vẫn kéo thả được nhưng không có animation
  */
  return (
    <SortableContext items={ columns?.map(c => c._id) } strategy={horizontalListSortingStrategy}>
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
        {/* Box column test 01*/}
        {columns?.map( column => <Column column={ column } key={ column._id } />)}

        {/* Button add */}
        <Box sx={{
          minWidth:'200px',
          maxWidth:'200px',
          mx:2,// left right,
          borderRadius:'6px',
          height:'fit-content',
          bgcolor:'#ffffff3d'
        }}>
          <Button
            sx={{
              color:'white',
              width:'100%',
              justifyContent:'flex-start',
              pl:2.5,
              py:1
            }}
            startIcon={<NoteAddIcon/>}
          > Add new colum</Button>
        </Box>
      </Box>
    </SortableContext>

  )
}

export default ListColumns