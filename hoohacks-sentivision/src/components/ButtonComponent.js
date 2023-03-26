function Button (props) {
  return (
    <div>
      <button
        type='button'
        class={`btn btn-${props.buttonColor}`}
        onChange={props.changeEvent}
        style={{ width: props.width, height: props.height }}
      >
        {props.text}
      </button>
    </div>
  )
}

export default Button
