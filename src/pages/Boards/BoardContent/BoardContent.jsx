import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
function BoardContent({ board }) {
  //ActivationConstraint Require the mouse to move by 10 pixels before activating
  // Fix click event
  //Nếu dùng pointerSensor thì phải kết hợp thuộc tính CSS touch-action: none ở những phẩn tử kéo thả nhưng còn bug nên ưu tiên  mouse và touch
  const pointerSensor = useSensor (PointerSensor, { activationConstraint :{ distance:10 } })

  // Hỗ trợ cho mobile khi không dùng point mà dùng chuột cảm ứng và chạm
  const mouseSensor = useSensor (MouseSensor, { activationConstraint :{ distance:10 } })
  // Nhấn giữ 250ms và độ chênh của cảm ứng ( dễ hiểu là di chuyển/ chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor (TouchSensor, { activationConstraint :{ delay:250, tolerance: 500 } })

  //Ưu tiên kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile là tốit nhất, k bị bug
  // khii kết hợp cả 2 thì k cần truyền pointerSensor cũng được
  const sensors = useSensors( pointerSensor, mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(( ) => {
    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handelDragEnd = (event) => {
    const { active, over } = event

    // Ktra nếu không tồn tại over ( kéo lnh tinh ra ngoài thì return luôn tránh over == null)
    if (!over) return

    // Nếu kéo -> thả vào đối tượng hợp lệ thì xử lý
    if (active.id != over.id) {
      // lay vi tri cu tu column keo
      const oldIndex =orderedColumns.findIndex(c => c._id ===active.id )

      // lay vi tri moi tu column chon de tha
      const newIndex =orderedColumns.findIndex(c => c._id ===over.id )

      // arrayMove 1 fuction dnd-Kit dung sap xep mang theo yeu cau
      //https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)

      // luu csdl
      // const dndOrderedColumnsIds=dndOrderedColumns.map( c => c._id)

      // cập nhật component
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handelDragEnd} sensors={sensors} >
      <Box sx={{
        bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width:'100%',
        height:( theme ) => theme.trello.boardContentHeight,
        p:'10px 0'
      }}>
        {/* Box cover box columns */}
        <ListColumns columns={orderedColumns}/>
      </Box>
    </DndContext>

  )
}

export default BoardContent
