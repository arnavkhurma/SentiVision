// Button component using props for customization
function Button(props) {
  // Render a button with dynamic styles and class names based on props
  return (
    <div>
      <button
        type="button" // Define the button type
        className={`btn btn-${props.buttonColor}`} // Apply dynamic class for button color
        onChange={props.changeEvent} // Assign the change event handler
        style={{
          width: props.width, // Set width from props
          height: props.height // Set height from props
        }}
      >
        {props.text} // Display the text passed as a prop
      </button>
    </div>
  );
}

// Export the Button component for use in other parts of the application
export default Button;
