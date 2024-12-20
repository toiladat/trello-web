import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { useCallback, useEffect, useState, useRef } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Columns/Columns'
import Card from './ListColumns/Columns/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generagePlaceholderCard } from '~/utils/formatters'
const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN:'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
function BoardContent({ board }) {
  //ActivationConstraint Require the mouse to move by 10 pixels before activating
  // Fix click event
  //Nếu dùng pointerSensor thì phải kết hợp thuộc tính CSS touch-action: none ở những phẩn tử kéo thả nhưng còn bug nên ưu tiên  mouse và touch
  // const pointerSensor = useSensor (PointerSensor, { activationConstraint :{ distance:10 } })

  // Hỗ trợ cho mobile khi không dùng point mà dùng chuột cảm ứng và chạm
  const mouseSensor = useSensor (MouseSensor, { activationConstraint :{ distance:10 } })
  // Nhấn giữ 250ms và độ chênh của cảm ứng ( dễ hiểu là di chuyển/ chênh lệch 500px) thì mới kích hoạt event
  const touchSensor = useSensor (TouchSensor, { activationConstraint :{ delay:250, tolerance: 400 } })

  //Ưu tiên kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile là tốit nhất, k bị bug
  // khii kết hợp cả 2 thì k cần truyền pointerSensor cũng được
  const sensors = useSensors( mouseSensor, touchSensor) //pointerSensor cung duoc

  //Render lại BoardContent khi Drag-Drop
  const [orderedColumns, setOrderedColumns] = useState([])

  // 1 Thời điểm chỉ có 1 card / column drag
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  // Điểm va chạm cuối cùng xử lý thuật toán phát hiện va chạm
  const lastOverId = useRef(null)

  useEffect(( ) => {
    setOrderedColumns( mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // Tìm data column theo CardId
  const findColumnByCardId = (cardId) => {
    //lưu ý dùng column.cards thay vì column.cardOrderIds vì bước handleDragOver sẽ
    // làm dữ liệu cho cards hoàn chỉnh rồi mới tạo ra cardOrderIds mới
    return orderedColumns.find( column => column?.cards?.map(card => card._id)?.includes(cardId) )
  }

  // Cập nhật lại state trong khi di chuyển card qua các columns khác nhau
  const moveCardBetweenDifferentColumns= (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {

    setOrderedColumns( prevColumns => {
      // Tìm vị trí ( index ) của overCard trong col đích (overColumn) nơi mà card thả
      const overCardIndex = overColumn?.cards?.findIndex( card => card._id === overCardId)

      // Logic tính toán 'cardIndex mới' trên hoặc dưới overCard lấy chuẩn ra từ code của thư viện
      // nhiều khi muốn từ chối hiểu
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.lenght + 1
      // console.log(' isBelowOverItem:', isBelowOverItem)
      // console.log(' modifier:', modifier)
      // console.log(' newCardIndex:', newCardIndex)

      //Clone mảng OrderedColumnsState cũ ra 1 cái mới để xử lý data rồi return -
      // cập nhật lại OrderedColumnsState mới
      const nextColumns= cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find( column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id===overColumn._id)

      //Column cũ
      if (nextActiveColumn) {
        // Xóa card ở column active (column cũ)
        nextActiveColumn.cards= nextActiveColumn.cards.filter(card => card._id !==activeDraggingCardId)

        // Thêm placeholder-card nếu Column rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards =[generagePlaceholderCard(nextActiveColumn)]
        }

        //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds= nextActiveColumn.cards.map(card => card._id)
      }
      //Column mới
      if (nextOverColumn) {
        //Kiểm tra xem card đang kéo đã tồn tại ở overColumn chưa nếu có thì cần xóa nó trước 
        nextOverColumn.cards= nextOverColumn.cards.filter(card => (card._id !==activeDraggingCardId))

        //Tiếp theo là thêm card đang kéo vào overColumn theo index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex,
          0,
          { // Cập nhật lại columnId trong card kéo ( mô hình quan hệ 1 -n )
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          })

        // xóa card?.FE_PlaceholderCard
        nextOverColumn.cards= nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        //Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds= nextOverColumn.cards.map(card => card._id)

      }
      console.log(nextColumns);

      return nextColumns
    })
  }

  //Trigger drag
  const handleDragStart= (event) => {
    // console.log('handleDragStart: ', event);

    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thực hiện hành động set giá trị oldColumn
    if ( event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  //Trigger dragOver( chỉ xử lý cards trong quá trình kéo )
  const handleDragOver= (event) => {
    // Không làm gì nếu kéo column vì xử lý ở end rồi
    if ( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // XỬ LÝ KHI KÉO THẢ CARDS
    //active: Thông tin card kéo, over thông tin card chuẩn bị drop
    const { active, over } = event
    // Khi kéo ra khỏi phạm vi DndContext thì return
    if (!active || !over) return

    // activeDraggingCard: là card đang được kéo
    const { id: activeDraggingCardId, data: { current :activeDraggingCardData } } = active
    //overCardId là card đang tương tác trên hoặc dưới với card đang được kéo
    const { id: overCardId } = over

    //Tìm 2 toàn bộ thông tin columns của 2 card theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 col thì return
    if (!activeColumn || !overColumn) return

    // Xứ lý khi kéo card qua 2 column khác nhau, còn trong cùng 1 col thì không làm gì
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )

    }
  }

  // Trigger drop ( chỉ xử lý drag Columns)
  const handelDragEnd = (event) => {
    // console.log('handelDragEnd: ', event);
    const { active, over } = event

    // Ktra nếu không tồn tại over ( kéo lnh tinh ra ngoài thì return luôn tránh over == null)
    if (!active ||!over) return

    // Xử lý kéo thả Cards
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data:{ current:activeDraggingCardData } } = active
      const { id: overCardId }= over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return

      // Dùng oldColumnWhenDraggingCard ( set từ handleDragStart ) vì sau khi onDragOver tới đây
      // thì state setOrderedColumns đã bị cập nhật nên activeData không chuẩn nữa
      if (oldColumnWhenDraggingCard._id !== overColumn._id) { // kéo card qua col khác
        // thao tác giống dragOver
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
      else { // kéo card trong col

        const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex( c => c._id === activeDragItemId)
        const newCardIndex = oldColumnWhenDraggingCard.cards.findIndex( c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)


        setOrderedColumns( prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          // Tìm Column mà đang tương tác
          const targetColumns = nextColumns.find(c => c._id === oldColumnWhenDraggingCard._id)
          // Cập nhật 2 giá trị là cards và cardOrderIds trong targetColumns
          targetColumns.cards=dndOrderedCards
          targetColumns.cardOrderIds= dndOrderedCards.map(card => card._id)

          // trả về chuẩn vị trí
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả columns
    if (activeDragItemType===ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu kéo -> thả vào đối tượng hợp lệ thì xử lý
      if (active.id != over.id) {
        // lay vi tri cu tu column keo
        const oldColumnIndex =orderedColumns.findIndex(c => c._id ===active.id )

        // lay vi tri moi tu column chon de tha
        const newColumnIndex =orderedColumns.findIndex(c => c._id ===over.id )

        // arrayMove 1 fuction dnd-Kit dung sap xep mang theo yeu cau
        //https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // luu csdl
        // const dndOrderedColumnsIds=dndOrderedColumns.map( c => c._id)

        // cập nhật component
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemData(null)
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setOldColumnWhenDraggingCard(null)
  }
  //Drop animation
  const customDropAnimation ={
    sideEffects: defaultDropAnimationSideEffects({
      style: { active:{ opacity:'0.5' } }
    })
  }
  // custom thuật toán phát hiện va chạm mục đích trả về mảng để lấy ra id cụ thể
  // nếu không sẽ bug flickering do không tìm ra overId
  const collistionDetectionStrategy = useCallback( (args) => {
    // Kéo column ( k bug ) dùng closestCorners là mượt
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    // Tìm các điểm giao nhau - intersections với con trỏ
    //Thuật toán phát hiện va chạm sẽ trả về 1 array mà element chạm tới
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections?.length) return // nếu kéo ra invalid range

    // // Thuật toán phát hiện va chạm sẽ trả về 1 array mà element chạm tới
    // const intersections = !!pointerIntersections?.length
    //   ? pointerIntersections
    //   : rectIntersection(args)

    // tìm overId đầu tiên trong đám intersections
    // params id để lấy ra id cuối cùng va chạm
    let overId = getFirstCollision(pointerIntersections, 'id')
    // console.log(overId);

    if (overId) {
      //nếu kéo gần 1 col sẽ tìm cardId gần nhất trong khu vực đang va chạm
      // dựa vào thuật toán closestCenter or closestCorrners => overId phải là card nếu là col sẽ bug
      // dùng closestCorners mượt hơn
      const checkColumn = orderedColumns.find( column => column._id === overId)
      if (checkColumn) { // nếu va chạm với col thì tìm card gần nhất để thế vào
        overId=closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => // đoạn này chịu
            container.id !== overId &&
            checkColumn?.cardOrderIds?.includes(container.id)
          )
        })[0]?.id
      }
      lastOverId.current = overId //gán về cho lần sau dùng
      return [{ id:overId }]
    }
    // nếu overId là null trả về []
    return lastOverId.current ? [{ id : lastOverId.current }]: []
  }, [activeDragItemType, orderedColumns]) //useCallback dùng dũ liệu ngoài (orderedColumns) thì phải đưa setOr vào dpd
  return (
    <DndContext
      // Thuật toán phát hiện va chạm (nếu không có thì card với cover lớn sẽ k kéo qua col khác được,
      // vì lúc này nó đang bị conflict giữa card và column) chúng ta sẽ dùng closeetCornder thay vì closetCenter )
      // collisionDetection={closestCorners}
      //Update nếu dùng closestCorrners sẽ có bug flickering + sai dữ liệu ( hiện chưa được fix )
      // ta tự cấu hình
      collisionDetection={collistionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handelDragEnd}
      sensors={sensors} >
      <Box sx={{
        bgcolor:( theme ) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        width:'100%',
        height:( theme ) => theme.trello.boardContentHeight,
        p:'10px 0'
      }}>
        {/* Box cover box columns */}
        <ListColumns columns={orderedColumns}/>

        {/* Giữ chỗ khi drag */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN)
            && <Column column={activeDragItemData}/>
          }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD)
            && <Card card={activeDragItemData}/>
          }
        </DragOverlay>
      </Box>
    </DndContext>

  )
}

export default BoardContent
