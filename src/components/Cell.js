export default function Cell(props) {
  return (
    <div 
      className={`${props.cellItem.active ? 'active ' : ''}cell`} 
      onClick={props.onClick}
    > 
     <img src={require(`../img/${props.cellItem.img}`)} alt={props.cellItem.img}/> 
    </div>
  )
}
